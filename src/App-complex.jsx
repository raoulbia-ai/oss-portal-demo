import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { 
  Menu, 
  X, 
  Send, 
  MoreHorizontal, 
  Play, 
  User,
  Grid3X3,
  Bot,
  Pause
} from 'lucide-react'
import ericssonLogo from './assets/ericsson-logo.jpg'
import robotIcon from './assets/robot-icon.jpg'
import RichMedia from './components/RichMedia.jsx'
import { storySequence, getStoryResponse } from './storyData.js'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('NM Assistant')
  const [currentStoryStep, setCurrentStoryStep] = useState(-1)
  const [storyInitialized, setStoryInitialized] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize the story with the first two messages
  useEffect(() => {
    if (!storyInitialized) {
      setStoryInitialized(true)
      
      // Add first message immediately
      const firstMessage = {
        ...storySequence[0],
        timestamp: 'Tuesday 08:34'
      }
      setMessages([firstMessage])
      setCurrentStoryStep(0)
      
      // Add second message after delay
      setTimeout(() => {
        const secondMessage = {
          ...storySequence[1],
          timestamp: 'Tuesday 08:34'
        }
        setMessages(prev => [...prev, secondMessage])
        setCurrentStoryStep(1)
      }, 1500)
    }
  }, [storyInitialized])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsTyping(true)

    // Get story-driven response
    setTimeout(() => {
      const storyResponse = getStoryResponse(message, currentStoryStep)
      
      if (storyResponse) {
        const botMessage = {
          ...storyResponse,
          id: Date.now() + 1,
          timestamp: storyResponse.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        
        setMessages(prev => [...prev, botMessage])
        setCurrentStoryStep(prev => prev + 1)
        
        // If this response has rich media or triggers auto-responses, handle them
        if (storyResponse.richMedia || storySequence[currentStoryStep + 2]?.trigger === "auto") {
          handleAutoResponses(currentStoryStep + 1)
        }
      }
      
      setIsTyping(false)
    }, 1500)
  }

  const handleAutoResponses = (stepIndex) => {
    let nextStep = stepIndex + 1
    const delays = [2000, 3000, 2500, 3500] // Varied delays for natural feel
    
    const addNextAutoResponse = (delayIndex = 0) => {
      const nextStoryItem = storySequence[nextStep]
      
      if (nextStoryItem && nextStoryItem.trigger === "auto") {
        setTimeout(() => {
          setIsTyping(true)
          
          setTimeout(() => {
            const botMessage = {
              ...nextStoryItem,
              id: Date.now() + nextStep,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            
            setMessages(prev => [...prev, botMessage])
            setCurrentStoryStep(nextStep)
            setIsTyping(false)
            
            // Check for more auto responses
            nextStep++
            if (storySequence[nextStep]?.trigger === "auto") {
              addNextAutoResponse(delayIndex + 1)
            }
          }, 1500)
        }, delays[delayIndex % delays.length])
      }
    }
    
    addNextAutoResponse()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleAudioPlayback = (messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, audioPlaying: !msg.audioPlaying }
        : { ...msg, audioPlaying: false }
    ))
  }

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName)
    // In a real app, this would navigate to different sections
    if (itemName !== 'NM Assistant') {
      const systemMessage = {
        id: Date.now(),
        type: 'bot',
        content: `Switching to ${itemName} module. This feature is available in the full OSS Portal system.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, systemMessage])
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-12 bg-black text-white flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <img src={ericssonLogo} alt="Ericsson" className="w-8 h-8" />
          <h1 className="text-sm font-normal tracking-wide">
            OSS Portal – Network Management Assistant :: Concept Demo ::
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 transition-colors">
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 transition-colors">
            <Settings className="w-5 h-5" />
          </Button>
          <div className="user-avatar">H</div>
          <span className="text-white text-sm">Hannah J</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-100 border-r border-gray-300 h-full transition-all duration-300`}>
          {/* Top section with Menu toggle and tabs */}
          <div className="border-b border-gray-300">
            <div className="flex items-center px-4 py-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-0 w-5 h-5 text-blue-600 hover:text-blue-800"
              >
                <X className="w-5 h-5" />
              </Button>
              {sidebarOpen && <span className="text-sm text-gray-600 ml-3">Menu</span>}
            </div>
            {sidebarOpen && (
              <div className="flex">
                <button className="flex-1 px-4 py-2 text-sm text-blue-600 border-b-2 border-blue-600 bg-white">
                  NM Assistant
                </button>
              </div>
            )}
          </div>
          
          {/* Menu items */}
          <div className="py-2">
            <nav className="space-y-0">
              {[
                'NM Assistant',
                'Topology & Inventory',
                'Network Automation',
                'Apps',
                'Tasks',
                'System Health'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavItemClick(item)}
                  className={`w-full text-left px-4 py-3 text-sm cursor-pointer transition-all duration-200 ${
                    activeNavItem === item
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sidebarOpen ? item : item.charAt(0)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Content Header */}
          <div className="border-b border-gray-200 px-6 py-3">
            <h2 className="text-gray-500 text-sm font-medium">NM Assistant</h2>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex space-x-3 ${msg.type === 'user' ? 'justify-end' : ''}`}>
                {msg.type === 'bot' && (
                  <div className="message-avatar">
                    <img src={robotIcon} alt="Bot" className="w-4 h-4 rounded-full" />
                  </div>
                )}
                
                <div className={`flex-1 max-w-md ${msg.type === 'user' ? 'user-message' : ''}`}>
                  {msg.type === 'bot' && (
                    <div className="text-xs text-gray-500 mb-1">
                      NM Assistant {msg.timestamp}
                    </div>
                  )}
                  {msg.type === 'user' && (
                    <div className="text-xs text-white mb-1 text-right">
                      {msg.timestamp}
                    </div>
                  )}
                  
                  <div className="message-bubble">
                    <p className="text-sm">{msg.content}</p>
                    
                    {msg.hasAudio && (
                      <div className="mt-3 flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAudioPlayback(msg.id)}
                          className="audio-button"
                        >
                          {msg.audioPlaying ? (
                            <>
                              <Pause className="w-3 h-3 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 mr-1" />
                              Play Again
                            </>
                          )}
                        </Button>
                        
                        <div className="flex items-center space-x-1">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className={`waveform-bar ${msg.audioPlaying ? 'animate-pulse' : ''}`}
                              style={{
                                height: `${Math.random() * 16 + 8}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Rich Media Content */}
                    {msg.richMedia && (
                      <div className="mt-4">
                        <RichMedia type={msg.richMedia.type} data={msg.richMedia.data} />
                      </div>
                    )}
                  </div>
                </div>

                {msg.type === 'user' && (
                  <div className="message-avatar user-avatar">
                    H
                  </div>
                )}
              </div>
            ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex space-x-3">
        <div className="message-avatar">
          <img src={robotIcon} alt="Bot" className="w-4 h-4 rounded-full" />
        </div>
                  <div className="flex-1">
                    <div className="message-bubble">
                      <div className="flex space-x-1">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="pr-12"
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isTyping}
                className="send-button"
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="more-button">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

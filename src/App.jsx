import { useState, useRef, useEffect } from 'react'
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
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi Hannah',
      timestamp: 'Tuesday 88:34'
    },
    {
      id: 2,
      type: 'bot',
      content: 'Did you listen to the Podcast report I sent this morning after the events of last night',
      timestamp: 'Tuesday 88:34',
      hasAudio: true,
      audioPlaying: false
    }
  ])
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('NM Assistant')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    // Simulate bot response delay
    setTimeout(() => {
      const botResponses = [
        "I can see the incident details from last night. Let me pull up the network topology and show you what happened during the train route disruption.",
        "Based on the podcast report, there were three main network segments affected. I'll display the fault analysis and recovery timeline for you.",
        "The incident involved a cascade failure in the northern corridor. I can show you the real-time monitoring data and the automated recovery actions that were triggered.",
        "I have the complete incident report ready. This includes network performance metrics, affected services, and the resolution steps taken by the automation system."
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasAudio: Math.random() > 0.5,
        audioPlaying: false
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
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
      <header className="oss-header text-white px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="ericsson-logo">
              <img src={ericssonLogo} alt="Ericsson" className="w-6 h-6" />
            </div>
            <span className="text-lg font-medium">OSS Portal - Network Management Assistant :: Concept Demo ::</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 p-2">
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700 p-2">
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <div className="user-avatar">
            H
          </div>
          <span className="text-sm font-medium">Hannah J</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2"
              >
                {sidebarOpen ? <X className="w-4 h-4 text-blue-600" /> : <Menu className="w-4 h-4 text-black" />}
              </Button>
            </div>

            <nav className="space-y-2">
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
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeNavItem === item
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  } ${!sidebarOpen && 'px-2'}`}
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

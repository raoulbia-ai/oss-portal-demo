import { useState, useEffect, useRef } from 'react'
import { 
  Menu, 
  X, 
  Send, 
  MoreHorizontal, 
  Play, 
  User,
  Grid3X3,
  Bot,
  Pause,
  Settings
} from 'lucide-react'
import ericssonLogo from './assets/ericsson-logo-new.png'
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

      // Add second message after a delay
      setTimeout(() => {
        const secondMessage = {
          ...storySequence[1],
          timestamp: 'Tuesday 08:34'
        }
        setMessages(prev => [...prev, secondMessage])
        setCurrentStoryStep(1)
      }, 2000)
    }
  }, [storyInitialized])

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages(prev => [...prev, userMessage])
      setMessage('')
      setIsTyping(true)

      // Get story response
      setTimeout(() => {
        const response = getStoryResponse(currentStoryStep + 1, message)
        if (response) {
          setMessages(prev => [...prev, response])
          setCurrentStoryStep(prev => prev + 1)
        }
        setIsTyping(false)
      }, 1500)
    }
  }

  const handleNavItemClick = (item) => {
    setActiveNavItem(item)
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
          <button className="text-white hover:text-gray-300 transition-colors">
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-gray-300 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
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
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-0 w-5 h-5 text-blue-600 hover:text-blue-800"
              >
                <X className="w-5 h-5" />
              </button>
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
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-800">NM Assistant</h2>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {msg.sender === 'user' ? (
                        <div className="user-avatar">H</div>
                      ) : (
                        <div className="bot-avatar">
                          <img src={robotIcon} alt="Bot" className="w-8 h-8 rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                      <div className="message-header">
                        <span className="sender-name">
                          {msg.sender === 'user' ? 'Hannah J' : 'NM Assistant'}
                        </span>
                        <span className="timestamp">{msg.timestamp}</span>
                      </div>
                      <div className="message-content">
                        <p>{msg.text}</p>
                        
                        {/* Audio controls for bot messages */}
                        {msg.sender === 'bot' && (
                          <div className="audio-controls">
                            <button className="play-button">
                              <Play className="w-4 h-4" />
                              <span>Play Again</span>
                            </button>
                            <div className="waveform">
                              {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="waveform-bar" />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Rich media content */}
                        {msg.richMedia && (
                          <div className="mt-4">
                            <RichMedia type={msg.richMedia.type} data={msg.richMedia.data} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="bot-avatar">
                    <img src={robotIcon} alt="Bot" className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="typing-indicator">
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
              <button className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

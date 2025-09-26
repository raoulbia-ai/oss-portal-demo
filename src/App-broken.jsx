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
      <header className="h-12 bg-black text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src={ericssonLogo} alt="OSS Portal Logo" className="h-6" />
          <span className="text-white text-sm">OSS Portal – Network Management Assistant :: Concept Demo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">H</span>
          </div>
          <span className="text-white text-sm">Hannah J</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-gray-200 border-r border-gray-300 h-full">
          {/* Menu items */}
          <nav>
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavItemClick(item)}
                className={`w-full text-left px-4 py-2 text-sm border-b border-gray-300 ${
                  activeNavItem === item
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      {msg.sender === 'user' ? (
                        <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          H
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={`${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200'} rounded-lg p-4 shadow-sm max-w-lg`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-sm font-medium ${msg.sender === 'user' ? 'text-white' : 'text-gray-600'}`}>
                          {msg.sender === 'user' ? 'Hannah J' : 'NM Assistant'}
                        </span>
                        <span className={`text-xs ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                      <div className={`${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        
                        {/* Audio controls for bot messages */}
                        {msg.sender === 'bot' && (
                          <div className="mt-3">
                            <button className="inline-flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 transition-colors">
                              <span>Play Again</span>
                              <div className="flex items-center space-x-0.5">
                                {Array.from({ length: 8 }).map((_, i) => (
                                  <div key={i} className="w-0.5 h-3 bg-gray-400 rounded-full" />
                                ))}
                              </div>
                            </button>
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
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex items-center space-x-3 max-w-4xl">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
              <button className="p-3 text-gray-500 hover:text-gray-700 transition-colors">
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

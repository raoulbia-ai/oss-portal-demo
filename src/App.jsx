import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { storySequence } from './storyData'
import RichMedia from './components/RichMedia'

function App() {
  const [messages, setMessages] = useState([])
  const [currentStoryStep, setCurrentStoryStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Initialize story
  useEffect(() => {
    // Add initial messages
    const initialMessages = storySequence.filter(step => step.trigger === 'initial')
    
    // Add first message immediately
    if (initialMessages.length > 0) {
      setMessages([initialMessages[0]])
      setCurrentStoryStep(1)
      
      // Add second message after delay
      if (initialMessages.length > 1) {
        setTimeout(() => {
          setMessages(prev => [...prev, initialMessages[1]])
          setCurrentStoryStep(2)
        }, 2000)
      }
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle user message submission
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Find next story step based on current progress
    const nextStep = storySequence.find(step => 
      step.id === currentStoryStep + 1 || 
      (step.trigger && inputValue.toLowerCase().includes(step.trigger.toLowerCase()))
    )

    if (nextStep) {
      setIsTyping(true)
      setTimeout(() => {
        setMessages(prev => [...prev, nextStep])
        setCurrentStoryStep(nextStep.id)
        setIsTyping(false)
      }, 1500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="h-12 bg-black text-white flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white rounded"></div>
          <span className="text-white text-sm">OSS Portal – Network Management Assistant :: Concept Demo</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">H</span>
          </div>
          <span className="text-white text-sm">Hannah J</span>
        </div>
      </header>

      {/* Full-width Grey Bar */}
      <div className="bg-gray-200 border-b border-gray-300 flex items-center px-4 py-2">
        <div className="flex items-center gap-2 w-52">
          <button className="text-blue-600 hover:text-blue-800">
            <span className="text-lg">✕</span>
          </button>
          <span className="text-sm text-black">Menu</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-400 font-medium">NM Assistant</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 bg-white border-r border-gray-300 h-full">
          <nav>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 bg-blue-600 text-white">
              NM Assistant
            </button>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 text-gray-700 hover:bg-gray-100">
              Topology & Inventory
            </button>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 text-gray-700 hover:bg-gray-100">
              Network Automation
            </button>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 text-gray-700 hover:bg-gray-100">
              Apps
            </button>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 text-gray-700 hover:bg-gray-100">
              Tasks
            </button>
            <button className="w-full text-left px-4 py-2 text-sm border-b border-gray-300 text-gray-700 hover:bg-gray-100">
              System Health
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div key={message.id || index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'bot' ? (
                  <div className="flex items-start space-x-3 max-w-4xl">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-600">NM Assistant</span>
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                        <p className="text-sm leading-relaxed text-gray-800 mb-3">{message.content}</p>
                        
                        {message.hasAudio && (
                          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors mb-3">
                            <span className="text-sm text-gray-700">Play Again</span>
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-3 bg-gray-400 rounded"></div>
                              <div className="w-1 h-4 bg-gray-400 rounded"></div>
                              <div className="w-1 h-2 bg-gray-400 rounded"></div>
                              <div className="w-1 h-5 bg-gray-400 rounded"></div>
                              <div className="w-1 h-3 bg-gray-400 rounded"></div>
                            </div>
                          </button>
                        )}

                        {message.richMedia && (
                          <div className="mt-4">
                            <RichMedia type={message.richMedia.type} data={message.richMedia.data} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-3 max-w-lg">
                    <div className="flex-1">
                      <div className="bg-blue-600 text-white rounded-lg p-4 shadow-sm">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <div className="flex items-center justify-end space-x-2 mt-1">
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                        <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          H
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="I did, it helped get my head around last night's incident on the train ride over, can you show me details ?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button 
                onClick={handleSendMessage}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

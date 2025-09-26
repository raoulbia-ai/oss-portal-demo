import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import { storySequence } from './storyData'
import RichMedia from './components/RichMedia'

function App() {
  const [messages, setMessages] = useState([])
  const [currentStoryStep, setCurrentStoryStep] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [autoPlayStep, setAutoPlayStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [autoPlaySpeed, setAutoPlaySpeed] = useState(1) // 1x, 1.5x, 2x speed
  const messagesEndRef = useRef(null)
  const autoPlayTimeoutRef = useRef(null)

  // Enhanced demo sequence with proper timing and user interactions
  const demoSequence = [
    { 
      type: 'bot', 
      storyId: 1, 
      delay: 1000,
      description: 'Initial greeting'
    },
    { 
      type: 'bot', 
      storyId: 2, 
      delay: 2500,
      description: 'Podcast question with audio'
    },
    { 
      type: 'user', 
      content: 'I did, it helped get my head around last night\'s incident on the train ride over, can you show me details ?', 
      delay: 4000,
      description: 'User responds about incident details'
    },
    { 
      type: 'bot', 
      storyId: 4, 
      delay: 2000,
      description: 'Bot explains incident with news article'
    },
    { 
      type: 'bot', 
      storyId: 5, 
      delay: 3000,
      description: 'Shows critical alarms'
    },
    { 
      type: 'bot', 
      storyId: 6, 
      delay: 3000,
      description: 'Performance impact chart'
    },
    { 
      type: 'bot', 
      storyId: 7, 
      delay: 3500,
      description: 'Compensation measures and topology'
    },
    { 
      type: 'bot', 
      storyId: 8, 
      delay: 3000,
      description: 'SLA breach report and resolution'
    },
    { 
      type: 'user', 
      content: 'Show recent configuration changes', 
      delay: 3000,
      description: 'User asks for config changes'
    },
    { 
      type: 'bot', 
      storyId: 10, 
      delay: 2000,
      description: 'Configuration logs display'
    },
    { 
      type: 'user', 
      content: 'Thanks, that\'s really helpful', 
      delay: 3000,
      description: 'User thanks the assistant'
    },
    { 
      type: 'bot', 
      storyId: 12, 
      delay: 2000,
      description: 'Final response and offer for more help'
    }
  ]

  // Initialize story (only when not auto-playing)
  useEffect(() => {
    if (!isAutoPlaying) {
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
    }
  }, [isAutoPlaying])

  // Enhanced auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused && autoPlayStep < demoSequence.length) {
      const currentDemo = demoSequence[autoPlayStep]
      const adjustedDelay = currentDemo.delay / autoPlaySpeed
      
      autoPlayTimeoutRef.current = setTimeout(() => {
        if (currentDemo.type === 'user') {
          // Add user message
          const userMessage = {
            id: Date.now(),
            type: 'user',
            content: currentDemo.content,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          setMessages(prev => [...prev, userMessage])
          setAutoPlayStep(prev => prev + 1)
        } else {
          // Add bot message from story sequence
          const botMessage = storySequence.find(step => step.id === currentDemo.storyId)
          if (botMessage) {
            setIsTyping(true)
            
            // Show typing indicator for a brief moment
            setTimeout(() => {
              setMessages(prev => [...prev, {
                ...botMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }])
              setCurrentStoryStep(botMessage.id)
              setIsTyping(false)
              setAutoPlayStep(prev => prev + 1)
            }, Math.min(1500 / autoPlaySpeed, 1500))
          } else {
            setAutoPlayStep(prev => prev + 1)
          }
        }
      }, adjustedDelay)
    }

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current)
      }
    }
  }, [isAutoPlaying, isPaused, autoPlayStep, autoPlaySpeed])

  // Auto-play control functions
  const startAutoPlay = () => {
    setMessages([])
    setCurrentStoryStep(0)
    setAutoPlayStep(0)
    setIsPaused(false)
    setIsAutoPlaying(true)
  }

  const stopAutoPlay = () => {
    setIsAutoPlaying(false)
    setIsPaused(false)
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
  }

  const pauseAutoPlay = () => {
    setIsPaused(true)
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current)
    }
  }

  const resumeAutoPlay = () => {
    setIsPaused(false)
  }

  const resetDemo = () => {
    stopAutoPlay()
    setMessages([])
    setCurrentStoryStep(0)
    setAutoPlayStep(0)
  }

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Handle user message submission (manual mode)
  const handleSendMessage = () => {
    if (!inputValue.trim() || isAutoPlaying) return

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
        setMessages(prev => [...prev, {
          ...nextStep,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }])
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

  // Get current demo step info for display
  const getCurrentStepInfo = () => {
    if (autoPlayStep < demoSequence.length) {
      return demoSequence[autoPlayStep]
    }
    return null
  }

  const currentStepInfo = getCurrentStepInfo()

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

      {/* Auto-play Controls Bar */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {!isAutoPlaying ? (
                <button
                  onClick={startAutoPlay}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Start Auto Demo
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  {isPaused ? (
                    <button
                      onClick={resumeAutoPlay}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Resume
                    </button>
                  ) : (
                    <button
                      onClick={pauseAutoPlay}
                      className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Pause
                    </button>
                  )}
                  <button
                    onClick={stopAutoPlay}
                    className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    Stop
                  </button>
                  <button
                    onClick={resetDemo}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Speed:</span>
              <select
                value={autoPlaySpeed}
                onChange={(e) => setAutoPlaySpeed(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
                disabled={!isAutoPlaying}
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>

          {/* Progress and Status */}
          <div className="flex items-center gap-4">
            {isAutoPlaying && (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  Step {autoPlayStep + 1} of {demoSequence.length}
                  {currentStepInfo && (
                    <span className="ml-2 text-blue-600 font-medium">
                      {currentStepInfo.description}
                    </span>
                  )}
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((autoPlayStep + 1) / demoSequence.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
            {isPaused && (
              <div className="flex items-center gap-2 text-yellow-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Paused</span>
              </div>
            )}
          </div>
        </div>
      </div>

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
                placeholder={isAutoPlaying ? "Auto-play mode active..." : "I did, it helped get my head around last night's incident on the train ride over, can you show me details ?"}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                disabled={isAutoPlaying}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isAutoPlaying}
                className={`p-3 rounded-lg transition-colors ${
                  isAutoPlaying 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                className={`p-3 transition-colors ${
                  isAutoPlaying 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                disabled={isAutoPlaying}
              >
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

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
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [message, setMessage] = useState("I did, it helped get my head around last night's incident on the train ride over, can you show me details ?")
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hi Hannah',
      timestamp: 'NM Assistant Tuesday 88:34',
      hasAudio: false
    },
    {
      id: 2,
      type: 'bot',
      content: 'Did you listen to the Podcast report I sent this morning after the events of last night',
      timestamp: '',
      hasAudio: true,
      audioPlaying: false
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState('NM Assistant')
  const messagesEndRef = useRef(null)

  const navigationItems = [
    { name: 'NM Assistant', active: true },
    { name: 'Topology & Inventory', active: false },
    { name: 'Network Automation', active: false },
    { name: 'Apps', active: false },
    { name: 'Tasks', active: false },
    { name: 'System Health', active: false }
  ]

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

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasAudio: Math.random() > 0.5
      }

      setIsTyping(false)
      setMessages(prev => [...prev, botMessage])
    }, 1500 + Math.random() * 1000)
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
              <Menu className="w-6 h-6" />
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
          <div className="flex items-center space-x-3">
            <div className="user-avatar">
              H
            </div>
            <span className="text-sm font-medium">Hannah J</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-60' : 'w-0'
        } overflow-hidden`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-500 text-sm font-medium">Menu</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className={`sidebar-nav-item ${activeNavItem === item.name ? 'active' : ''}`}
                  onClick={() => handleNavItemClick(item.name)}
                >
                  {item.name}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-4">
              {!sidebarOpen && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <Menu className="w-4 h-4" />
                </Button>
              )}
              <span className="text-gray-400 text-lg font-medium">{activeNavItem}</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="flex space-x-3">
                  <div className={`message-avatar ${msg.type === 'user' ? 'user-avatar' : ''}`}>
                    {msg.type === 'user' ? 'H' : <User className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    {msg.timestamp && (
                      <div className="text-xs text-gray-500 mb-2">{msg.timestamp}</div>
                    )}
                    <div className={`message-bubble ${msg.type === 'user' ? 'user-message' : ''}`}>
                      <p className="text-gray-800">{msg.content}</p>
                      {msg.hasAudio && (
                        <div className="audio-player">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:bg-blue-50 p-1 h-auto font-medium"
                            onClick={() => toggleAudioPlayback(msg.id)}
                          >
                            {msg.audioPlaying ? (
                              <Pause className="w-4 h-4 mr-1" />
                            ) : (
                              <Play className="w-4 h-4 mr-1" />
                            )}
                            <span className="text-sm">
                              {msg.audioPlaying ? 'Pause' : 'Play Again'}
                            </span>
                          </Button>
                          <div className="waveform">
                            {[4, 8, 6, 12, 10, 7, 9, 5].map((height, i) => (
                              <div 
                                key={i} 
                                className={`waveform-bar ${msg.audioPlaying ? 'animate-pulse' : ''}`}
                                style={{ 
                                  height: `${height}px`,
                                  backgroundColor: msg.audioPlaying ? '#2563EB' : '#9CA3AF'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex space-x-3">
        <div className="message-avatar">
          <Bot className="w-4 h-4" />
        </div>
                  <div className="flex-1">
                    <div className="message-bubble">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="max-w-4xl mx-auto">
              <div className="input-container">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-none outline-none bg-transparent text-gray-800 placeholder-gray-500"
                  disabled={isTyping}
                />
                <div className="flex items-center space-x-2">
                  <button 
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                  <button className="more-button">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

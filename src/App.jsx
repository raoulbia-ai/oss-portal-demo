import React from 'react'
import './App.css'

function App() {
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
      <div className="bg-gray-200 border-b border-gray-300 flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2 w-52">
          <button className="text-blue-600 hover:text-blue-800">
            <span className="text-lg">✕</span>
          </button>
          <span className="text-sm text-black">Menu</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-sm text-gray-700 font-medium">NM Assistant</span>
        </div>
        <div className="w-52"></div>
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
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-600">NM Assistant</span>
                    <span className="text-xs text-gray-400">Tuesday 08:34</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-800">Hi Hannah</p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex items-center space-x-3 max-w-4xl">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

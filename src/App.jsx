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
      <div className="bg-gray-200 border-b border-gray-300 flex items-center px-4 py-2">
        <div className="flex items-center gap-2 w-52">
          <button className="text-blue-600 hover:text-blue-800">
            <span className="text-lg">✕</span>
          </button>
          <span className="text-sm text-black">Menu</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-700 font-medium">NM Assistant</span>
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
            {/* Bot Message */}
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">NM Assistant</span>
                  <span className="text-xs text-gray-400">Tuesday 08:34</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm max-w-lg">
                  <p className="text-sm leading-relaxed text-gray-800 mb-3">Hi Hannah</p>
                  <p className="text-sm leading-relaxed text-gray-800 mb-4">Did you listen to the Podcast report I sent this morning after the events of last night</p>
                  
                  {/* Play Again Button */}
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <span className="text-sm text-gray-700">Play Again</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-3 bg-gray-400 rounded"></div>
                      <div className="w-1 h-4 bg-gray-400 rounded"></div>
                      <div className="w-1 h-2 bg-gray-400 rounded"></div>
                      <div className="w-1 h-5 bg-gray-400 rounded"></div>
                      <div className="w-1 h-3 bg-gray-400 rounded"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                placeholder="I did, it helped get my head around last night's incident on the train ride over, can you show me details ?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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

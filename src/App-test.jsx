import { useState, useEffect, useRef } from 'react'

function App() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="h-12 bg-black text-white flex items-center justify-between px-6">
        <h1 className="text-sm font-normal">OSS Portal Test</h1>
      </header>
      <div className="flex-1 p-4">
        <p>Test content - if you see this, React is working!</p>
      </div>
    </div>
  )
}

export default App

"use client"

import { useState } from "react"

const InteractiveForLoop = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = ["⚽", "🏀", "🎾", "🏈", "🎱"]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Click to step through the loop!</h4>
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded disabled:opacity-50 transition-all"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(items.length - 1, currentIndex + 1))}
            disabled={currentIndex === items.length - 1}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Next →
          </button>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Interactive Array */}
      <div className="flex justify-center space-x-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`array-element cursor-pointer ${
              index === currentIndex ? "active animate-pulse" : index < currentIndex ? "completed" : "default"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Current State */}
      <div className="text-center space-y-2">
        <div className="text-white text-lg">
          Current Index: <span className="text-yellow-400 font-bold">{currentIndex}</span>
        </div>
        <div className="text-blue-300">
          Current Item: <span className="text-2xl">{items[currentIndex]}</span>
        </div>
        <div className="text-green-300">
          Progress: {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  )
}

export default InteractiveForLoop

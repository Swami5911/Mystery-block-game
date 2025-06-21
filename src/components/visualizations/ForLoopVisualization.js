"use client"

import { useState } from "react"

const ForLoopVisualization = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const animals = ["🐵", "🐸", "🐨", "🦁", "🐯"]

  const startAnimation = () => {
    setIsPlaying(true)
    setCurrentIndex(0)

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= animals.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <button
          onClick={startAnimation}
          disabled={isPlaying}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition-all"
        >
          {isPlaying ? "Running..." : "▶️ Start For Loop"}
        </button>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">{"for (let i = 0; i < animals.length; i++) {"}</div>
        <div className={`ml-4 ${isPlaying ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log(animals[i]); // Currently: animals["}
          <span className="text-green-400">{currentIndex}</span>
          {"]"}
        </div>
        <div className="text-gray-400">{"}"}</div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center space-x-2">
        {animals.map((animal, index) => (
          <div key={index} className={`array-element ${index === currentIndex && isPlaying ? "active" : "default"}`}>
            {animal}
          </div>
        ))}
      </div>

      {/* Loop Counter */}
      <div className="text-center">
        <div className="text-white text-lg">
          Loop Counter: <span className="text-green-400 font-bold">i = {currentIndex}</span>
        </div>
        <div className="text-blue-300">
          Condition: i {"<"} {animals.length} = {currentIndex < animals.length ? "✅ True" : "❌ False"}
        </div>
      </div>

      {/* Output */}
      {isPlaying && (
        <div className="bg-black p-4 rounded-lg">
          <div className="text-green-400 font-mono">Output:</div>
          {animals.slice(0, currentIndex + 1).map((animal, index) => (
            <div key={index} className="text-white font-mono">
              {animal} (index: {index})
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ForLoopVisualization

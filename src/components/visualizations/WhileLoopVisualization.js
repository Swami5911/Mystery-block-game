"use client"

import { useState } from "react"

const WhileLoopVisualization = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [counter, setCounter] = useState(0)
  const [condition, setCondition] = useState(true)
  const maxCount = 5

  const startWhileLoop = () => {
    setIsRunning(true)
    setCounter(0)
    setCondition(true)

    const interval = setInterval(() => {
      setCounter((prev) => {
        const newCount = prev + 1
        if (newCount >= maxCount) {
          setCondition(false)
          setIsRunning(false)
          clearInterval(interval)
        }
        return newCount
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <button
          onClick={startWhileLoop}
          disabled={isRunning}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-all"
        >
          {isRunning ? "Running..." : "▶️ Start While Loop"}
        </button>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let count = 0;</div>
        <div className="text-gray-400">
          while (count {"<"} {maxCount}) {"{"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log('Count:', count);"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>{"  count++;"}</div>
        <div className="text-gray-400">{"}"}</div>
      </div>

      {/* Condition Check */}
      <div className="text-center p-4 border-2 border-dashed border-blue-400 rounded-lg">
        <div className="text-white text-lg mb-2">Condition Check:</div>
        <div className="text-xl">
          count {"<"} {maxCount} = {counter} {"<"} {maxCount} ={" "}
          <span className={condition ? "text-green-400" : "text-red-400"}>
            {condition ? "✅ True (Continue)" : "❌ False (Stop)"}
          </span>
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow-400 mb-2">{counter}</div>
        <div className="text-white">Current Count</div>
      </div>

      {/* Visual Progress */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: maxCount }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
              index < counter ? "bg-green-500 border-green-500 text-white" : "border-gray-400 bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhileLoopVisualization

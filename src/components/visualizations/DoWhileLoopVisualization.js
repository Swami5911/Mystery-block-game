"use client"

import { useState } from "react"

const DoWhileLoopVisualization = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [counter, setCounter] = useState(0)
  const [condition, setCondition] = useState(true)
  const [executionCount, setExecutionCount] = useState(0)
  const maxCount = 3

  const startDoWhileLoop = () => {
    setIsRunning(true)
    setCounter(0)
    setCondition(true)
    setExecutionCount(0)

    const interval = setInterval(() => {
      setExecutionCount((prev) => {
        const newCount = prev + 1
        setCounter(newCount)

        if (newCount >= maxCount) {
          setCondition(false)
          setIsRunning(false)
          clearInterval(interval)
        }
        return newCount
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <button
          onClick={startDoWhileLoop}
          disabled={isRunning}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-all"
        >
          {isRunning ? "Running..." : "▶️ Start Do-While Loop"}
        </button>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let count = 0;</div>
        <div className="text-blue-400">do {"{"}</div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log('Executed:', count);"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>{"  count++;"}</div>
        <div className="text-blue-400">{"} while (count < " + maxCount + ");"}</div>
      </div>

      {/* Execution Flow */}
      <div className="space-y-3">
        <div className="text-center p-4 border-2 border-dashed border-green-400 rounded-lg">
          <div className="text-white text-lg mb-2">Do Block (Executes First):</div>
          <div className="text-green-300">✅ Always runs at least once, regardless of condition</div>
        </div>

        <div className="text-center p-4 border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-white text-lg mb-2">While Condition Check:</div>
          <div className="text-xl">
            count {"<"} {maxCount} = {counter} {"<"} {maxCount} ={" "}
            <span className={condition ? "text-green-400" : "text-red-400"}>
              {condition ? "✅ True (Continue)" : "❌ False (Stop)"}
            </span>
          </div>
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow-400 mb-2">{counter}</div>
        <div className="text-white">Execution Count</div>
        <div className="text-blue-300 mt-2">
          {executionCount > 0 && `Executed ${executionCount} time${executionCount > 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Visual Progress */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: maxCount + 1 }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
              index < executionCount
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-400 bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Key Difference Highlight */}
      <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded p-4">
        <div className="text-yellow-200 font-semibold mb-2">Key Difference:</div>
        <div className="text-yellow-100 text-sm">
          • <strong>While Loop:</strong> Checks condition BEFORE executing
          <br />• <strong>Do-While Loop:</strong> Executes FIRST, then checks condition
          <br />• <strong>Result:</strong> Do-while always runs at least once!
        </div>
      </div>
    </div>
  )
}

export default DoWhileLoopVisualization

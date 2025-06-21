"use client"

import { useState } from "react"

const ArrayCreationVisualization = () => {
  const [step, setStep] = useState(0)
  const [currentArray, setCurrentArray] = useState([])
  const items = ["🍎", "🍌", "🍊", "🍇", "🥝"]

  const nextStep = () => {
    if (step < items.length) {
      setCurrentArray((prev) => [...prev, items[step]])
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setCurrentArray([])
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={nextStep}
            disabled={step >= items.length}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Add Item
          </button>
          <button onClick={reset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all">
            Reset
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let fruits = [];</div>
        {currentArray.map((item, index) => (
          <div key={index} className="text-green-400">
            fruits[{index}] = '{item}';
          </div>
        ))}
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-center space-x-2">
        <span className="text-white font-mono">[</span>
        {currentArray.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center text-2xl border-2 border-blue-400 rounded bg-blue-400 bg-opacity-20 animate-pulse">
              {item}
            </div>
            {index < currentArray.length - 1 && <span className="text-white mx-1">,</span>}
          </div>
        ))}
        {currentArray.length === 0 && <span className="text-gray-400 italic">empty</span>}
        <span className="text-white font-mono">]</span>
      </div>

      {/* Array Info */}
      <div className="text-center">
        <div className="text-white">
          Array Length: <span className="text-yellow-400 font-bold">{currentArray.length}</span>
        </div>
        <div className="text-blue-300">
          Next Item: {step < items.length ? <span className="text-2xl">{items[step]}</span> : "Array Complete! 🎉"}
        </div>
      </div>
    </div>
  )
}

export default ArrayCreationVisualization

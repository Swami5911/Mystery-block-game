"use client"

import { useState } from "react"

const ArrayAccessVisualization = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState("")
  const [accessResult, setAccessResult] = useState("")
  const fruits = ["🍎", "🍌", "🍊", "🍇", "🥝", "🍓"]

  const accessElement = () => {
    const index = Number.parseInt(inputIndex)
    if (isNaN(index)) {
      setAccessResult("Please enter a valid number")
      return
    }

    if (index >= 0 && index < fruits.length) {
      setSelectedIndex(index)
      setAccessResult(`fruits[${index}] = ${fruits[index]}`)
    } else {
      setSelectedIndex(-1)
      setAccessResult(`fruits[${index}] = undefined (index out of bounds)`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Array Index Access</h4>

        <div className="mb-4 space-x-2">
          <input
            type="number"
            placeholder="Enter index (0-5)"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-32"
          />
          <button
            onClick={accessElement}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
          >
            Access Element
          </button>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="space-y-4">
        {/* Index Numbers */}
        <div className="flex justify-center space-x-2">
          {fruits.map((_, index) => (
            <div
              key={index}
              className={`w-16 h-8 flex items-center justify-center text-sm font-bold rounded-t border-2 ${
                index === selectedIndex
                  ? "border-yellow-400 bg-yellow-400/20 text-yellow-300"
                  : "border-gray-400 bg-gray-700 text-gray-300"
              }`}
            >
              {index}
            </div>
          ))}
        </div>

        {/* Array Elements */}
        <div className="flex justify-center space-x-2">
          {fruits.map((fruit, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-b cursor-pointer transition-all duration-300 ${
                index === selectedIndex
                  ? "border-yellow-400 bg-yellow-400/20 scale-110 animate-pulse"
                  : "border-blue-400 bg-blue-400/20 hover:scale-105"
              }`}
              onClick={() => {
                setSelectedIndex(index)
                setInputIndex(index.toString())
                setAccessResult(`fruits[${index}] = ${fruit}`)
              }}
            >
              {fruit}
            </div>
          ))}
        </div>

        {/* Index Labels */}
        <div className="flex justify-center space-x-2">
          {fruits.map((_, index) => (
            <div key={index} className="w-16 text-center text-xs text-gray-400">
              Index {index}
            </div>
          ))}
        </div>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let fruits = [{fruits.map((f) => `'${f}'`).join(", ")}];</div>
        <div className="text-green-400">console.log(fruits.length); // {fruits.length}</div>
        {accessResult && (
          <div className="text-blue-300 mt-2">
            console.log({accessResult.split(" = ")[0]}); // {accessResult.split(" = ")[1]}
          </div>
        )}
      </div>

      {/* Result Display */}
      {accessResult && (
        <div className="text-center">
          <div
            className={`p-4 rounded border text-lg font-bold ${
              accessResult.includes("undefined")
                ? "border-red-500 bg-red-500/20 text-red-300"
                : "border-green-500 bg-green-500/20 text-green-300"
            }`}
          >
            {accessResult}
          </div>
        </div>
      )}

      {/* Array Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Array Length</div>
          <div className="text-blue-300 text-lg">{fruits.length}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">First Element</div>
          <div className="text-green-300 text-lg">fruits[0] = {fruits[0]}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Last Element</div>
          <div className="text-yellow-300 text-lg">
            fruits[{fruits.length - 1}] = {fruits[fruits.length - 1]}
          </div>
        </div>
      </div>

      {/* Zero-Based Indexing Explanation */}
      <div className="bg-blue-500/20 border border-blue-500 rounded p-4">
        <div className="text-blue-200 font-semibold mb-2">💡 Zero-Based Indexing:</div>
        <div className="text-blue-100 text-sm">
          • Arrays start counting from 0, not 1<br />• First element is at index 0<br />• Last element is at index
          (length - 1)
          <br />• Accessing invalid index returns undefined
        </div>
      </div>
    </div>
  )
}

export default ArrayAccessVisualization

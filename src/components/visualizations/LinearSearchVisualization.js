"use client"

import { useState } from "react"

const LinearSearchVisualization = () => {
  const [array] = useState(["🍎", "🍌", "🍊", "🍇", "🥝", "🍓", "🥭"])
  const [target, setTarget] = useState("🍇")
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const startSearch = async () => {
    setIsSearching(true)
    setFound(false)
    setCurrentIndex(-1)

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (array[i] === target) {
        setFound(true)
        setIsSearching(false)
        return
      }
    }

    setIsSearching(false)
  }

  const reset = () => {
    setCurrentIndex(-1)
    setFound(false)
    setIsSearching(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mb-4">
          <label className="text-white block mb-2">Search for:</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600"
            disabled={isSearching}
          >
            {array.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={startSearch}
            disabled={isSearching}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition-all"
          >
            {isSearching ? "Searching..." : "🔍 Start Search"}
          </button>
          <button
            onClick={reset}
            disabled={isSearching}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center space-x-2">
        {array.map((item, index) => (
          <div
            key={index}
            className={`array-element ${
              index === currentIndex && isSearching
                ? item === target
                  ? "bg-green-400 bg-opacity-20 border-green-400 scale-110"
                  : "active"
                : index < currentIndex
                  ? "bg-red-400 bg-opacity-20 border-red-400"
                  : "default"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Search Info */}
      <div className="text-center space-y-2">
        <div className="text-white">
          Looking for: <span className="text-2xl">{target}</span>
        </div>
        {currentIndex >= 0 && (
          <div className="text-blue-300">
            Checking index {currentIndex}: <span className="text-2xl">{array[currentIndex]}</span>
            {array[currentIndex] === target ? " ✅ Found!" : " ❌ Not a match"}
          </div>
        )}
        {found && (
          <div className="text-green-400 text-xl font-bold">
            🎉 Found {target} at index {currentIndex}!
          </div>
        )}
        {!isSearching && currentIndex === array.length - 1 && !found && (
          <div className="text-red-400 text-xl">❌ {target} not found in array</div>
        )}
      </div>
    </div>
  )
}

export default LinearSearchVisualization

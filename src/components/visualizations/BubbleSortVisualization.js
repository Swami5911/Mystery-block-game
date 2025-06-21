"use client"

import { useState } from "react"

const BubbleSortVisualization = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState([-1, -1])
  const [sorted, setSorted] = useState([])

  const bubbleSort = async () => {
    setIsRunning(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1])
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }
      setSorted((prev) => [...prev, n - 1 - i])
    }

    setComparing([-1, -1])
    setSorted(Array.from({ length: n }, (_, i) => i))
    setIsRunning(false)
  }

  const reset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90])
    setComparing([-1, -1])
    setSorted([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={bubbleSort}
            disabled={isRunning}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded disabled:opacity-50 transition-all"
          >
            {isRunning ? "Sorting..." : "🫧 Start Bubble Sort"}
          </button>
          <button
            onClick={reset}
            disabled={isRunning}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-end space-x-1">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 flex items-end justify-center text-xs font-bold text-white transition-all duration-500 ${
                comparing.includes(index) ? "bg-yellow-500" : sorted.includes(index) ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{index}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span className="text-white">Unsorted</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-white">Comparing</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-white">Sorted</span>
        </div>
      </div>

      {/* Status */}
      {isRunning && (
        <div className="text-center text-yellow-400">
          Comparing positions {comparing[0]} and {comparing[1]}
        </div>
      )}
    </div>
  )
}

export default BubbleSortVisualization

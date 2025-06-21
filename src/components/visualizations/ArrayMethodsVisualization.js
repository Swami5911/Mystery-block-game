"use client"

import { useState } from "react"

const ArrayMethodsVisualization = () => {
  const [currentArray, setCurrentArray] = useState([1, 2, 3])
  const [inputValue, setInputValue] = useState("")
  const [lastOperation, setLastOperation] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState(-1)

  const executeMethod = async (method) => {
    const value = inputValue ? Number.parseInt(inputValue) || inputValue : Math.floor(Math.random() * 10) + 1

    switch (method) {
      case "push":
        setAnimatingIndex(currentArray.length)
        setLastOperation(`push(${value}) - Added ${value} to end`)
        setTimeout(() => {
          setCurrentArray((prev) => [...prev, value])
          setAnimatingIndex(-1)
        }, 500)
        break

      case "pop":
        if (currentArray.length > 0) {
          const poppedValue = currentArray[currentArray.length - 1]
          setAnimatingIndex(currentArray.length - 1)
          setLastOperation(`pop() - Removed ${poppedValue} from end`)
          setTimeout(() => {
            setCurrentArray((prev) => prev.slice(0, -1))
            setAnimatingIndex(-1)
          }, 500)
        }
        break

      case "unshift":
        setAnimatingIndex(0)
        setLastOperation(`unshift(${value}) - Added ${value} to beginning`)
        setTimeout(() => {
          setCurrentArray((prev) => [value, ...prev])
          setAnimatingIndex(-1)
        }, 500)
        break

      case "shift":
        if (currentArray.length > 0) {
          const shiftedValue = currentArray[0]
          setAnimatingIndex(0)
          setLastOperation(`shift() - Removed ${shiftedValue} from beginning`)
          setTimeout(() => {
            setCurrentArray((prev) => prev.slice(1))
            setAnimatingIndex(-1)
          }, 500)
        }
        break

      case "splice":
        const index = Math.floor(currentArray.length / 2)
        setAnimatingIndex(index)
        setLastOperation(`splice(${index}, 1, ${value}) - Replaced element at index ${index}`)
        setTimeout(() => {
          setCurrentArray((prev) => {
            const newArray = [...prev]
            newArray.splice(index, 1, value)
            return newArray
          })
          setAnimatingIndex(-1)
        }, 500)
        break

      case "reset":
        setCurrentArray([1, 2, 3])
        setLastOperation("Array reset to [1, 2, 3]")
        break
    }

    setInputValue("")
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Array Methods Playground</h4>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter value (optional)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => executeMethod("push")}
            className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-all"
          >
            push() - Add End
          </button>
          <button
            onClick={() => executeMethod("pop")}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-all"
            disabled={currentArray.length === 0}
          >
            pop() - Remove End
          </button>
          <button
            onClick={() => executeMethod("unshift")}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-all"
          >
            unshift() - Add Start
          </button>
          <button
            onClick={() => executeMethod("shift")}
            className="px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded text-sm transition-all"
            disabled={currentArray.length === 0}
          >
            shift() - Remove Start
          </button>
          <button
            onClick={() => executeMethod("splice")}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition-all"
            disabled={currentArray.length === 0}
          >
            splice() - Replace
          </button>
          <button
            onClick={() => executeMethod("reset")}
            className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm transition-all"
          >
            Reset Array
          </button>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center items-center space-x-2 min-h-20">
        <span className="text-white font-mono text-lg">[</span>
        {currentArray.length === 0 ? (
          <span className="text-gray-400 italic px-4">empty array</span>
        ) : (
          currentArray.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center text-lg font-bold border-2 rounded transition-all duration-500 ${
                  index === animatingIndex
                    ? "border-yellow-400 bg-yellow-400/20 scale-125 animate-pulse"
                    : "border-blue-400 bg-blue-400/20"
                }`}
              >
                {item}
              </div>
              {index < currentArray.length - 1 && <span className="text-white mx-2 font-mono">,</span>}
            </div>
          ))
        )}
        <span className="text-white font-mono text-lg">]</span>
      </div>

      {/* Array Info */}
      <div className="text-center">
        <div className="text-white text-lg mb-2">
          Array Length: <span className="text-yellow-400 font-bold">{currentArray.length}</span>
        </div>
        {lastOperation && <div className="text-green-300 text-sm">Last Operation: {lastOperation}</div>}
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let arr = [{currentArray.join(", ")}];</div>
        {lastOperation && <div className="text-green-400">arr.{lastOperation.split(" - ")[0]};</div>}
        <div className="text-blue-300">console.log(arr); // [{currentArray.join(", ")}]</div>
        <div className="text-yellow-400">console.log(arr.length); // {currentArray.length}</div>
      </div>

      {/* Method Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Mutating Methods</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              <span className="text-green-400">push()</span> - Adds to end
            </div>
            <div>
              <span className="text-red-400">pop()</span> - Removes from end
            </div>
            <div>
              <span className="text-blue-400">unshift()</span> - Adds to start
            </div>
            <div>
              <span className="text-orange-400">shift()</span> - Removes from start
            </div>
            <div>
              <span className="text-purple-400">splice()</span> - Adds/removes at index
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Return Values</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              <span className="text-green-400">push()</span> - New length
            </div>
            <div>
              <span className="text-red-400">pop()</span> - Removed element
            </div>
            <div>
              <span className="text-blue-400">unshift()</span> - New length
            </div>
            <div>
              <span className="text-orange-400">shift()</span> - Removed element
            </div>
            <div>
              <span className="text-purple-400">splice()</span> - Removed elements array
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArrayMethodsVisualization

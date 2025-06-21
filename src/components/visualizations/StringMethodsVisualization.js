"use client"

import { useState } from "react"

const StringMethodsVisualization = () => {
  const [inputString, setInputString] = useState("Hello World")
  const [selectedMethod, setSelectedMethod] = useState("toUpperCase")
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const stringMethods = {
    toUpperCase: {
      name: "toUpperCase()",
      description: "Converts all characters to uppercase",
      execute: (str) => str.toUpperCase(),
    },
    toLowerCase: {
      name: "toLowerCase()",
      description: "Converts all characters to lowercase",
      execute: (str) => str.toLowerCase(),
    },
    charAt: {
      name: "charAt(5)",
      description: "Gets character at index 5",
      execute: (str) => str.charAt(5) || "undefined",
    },
    substring: {
      name: "substring(0, 5)",
      description: "Extracts characters from index 0 to 5",
      execute: (str) => str.substring(0, 5),
    },
    split: {
      name: "split(' ')",
      description: "Splits string into array by spaces",
      execute: (str) => str.split(" ").join(", "),
    },
  }

  const executeMethod = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const methodResult = stringMethods[selectedMethod].execute(inputString)
      setResult(methodResult)
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">String Methods Playground</h4>

        <div className="mb-4">
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
            placeholder="Enter a string"
          />
        </div>

        <div className="mb-4">
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          >
            {Object.entries(stringMethods).map(([key, method]) => (
              <option key={key} value={key}>
                {method.name}
              </option>
            ))}
          </select>

          <button
            onClick={executeMethod}
            disabled={isAnimating}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-all"
          >
            {isAnimating ? "Processing..." : "Execute"}
          </button>
        </div>
      </div>

      {/* Method Description */}
      <div className="text-center p-4 border-2 border-dashed border-purple-400 rounded-lg">
        <div className="text-white text-lg mb-2">Method: {stringMethods[selectedMethod].name}</div>
        <div className="text-purple-300">{stringMethods[selectedMethod].description}</div>
      </div>

      {/* Visual String Representation */}
      <div className="flex justify-center space-x-1 mb-4">
        {inputString.split("").map((char, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center text-sm border-2 rounded transition-all duration-500 ${
              isAnimating ? "border-yellow-400 bg-yellow-400/20 animate-pulse" : "border-blue-400 bg-blue-400/20"
            }`}
          >
            {char === " " ? "␣" : char}
          </div>
        ))}
      </div>

      {/* Result Display */}
      {result && (
        <div className="text-center">
          <div className="text-white text-lg mb-2">Result:</div>
          <div className="bg-green-500/20 border border-green-500 rounded p-4">
            <span className="text-green-300 text-xl font-mono">{result}</span>
          </div>
        </div>
      )}

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let str = "{inputString}";</div>
        <div className="text-green-400">let result = str.{stringMethods[selectedMethod].name};</div>
        <div className="text-blue-300">console.log(result); // {result || "..."}</div>
      </div>
    </div>
  )
}

export default StringMethodsVisualization

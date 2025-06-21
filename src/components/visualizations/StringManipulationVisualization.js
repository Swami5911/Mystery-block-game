"use client"

import { useState } from "react"

const StringManipulationVisualization = () => {
  const [inputString, setInputString] = useState("Hello World")
  const [selectedOperation, setSelectedOperation] = useState("replace")
  const [parameter1, setParameter1] = useState("World")
  const [parameter2, setParameter2] = useState("JavaScript")
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const stringOperations = {
    replace: {
      name: "replace(searchValue, replaceValue)",
      description: "Replaces first occurrence of searchValue with replaceValue",
      execute: (str, p1, p2) => str.replace(p1, p2),
      params: ["Search for", "Replace with"],
    },
    slice: {
      name: "slice(start, end)",
      description: "Extracts a section of string from start to end index",
      execute: (str, p1, p2) => str.slice(Number.parseInt(p1) || 0, Number.parseInt(p2) || str.length),
      params: ["Start index", "End index"],
    },
    concat: {
      name: "concat(string)",
      description: "Joins two or more strings together",
      execute: (str, p1) => str.concat(p1),
      params: ["String to add", ""],
    },
    repeat: {
      name: "repeat(count)",
      description: "Returns string repeated specified number of times",
      execute: (str, p1) => str.repeat(Number.parseInt(p1) || 1),
      params: ["Repeat count", ""],
    },
    padStart: {
      name: "padStart(length, padString)",
      description: "Pads string from start to reach target length",
      execute: (str, p1, p2) => str.padStart(Number.parseInt(p1) || str.length, p2 || " "),
      params: ["Target length", "Pad character"],
    },
    trim: {
      name: "trim()",
      description: "Removes whitespace from both ends of string",
      execute: (str) => str.trim(),
      params: ["", ""],
    },
  }

  const executeOperation = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const operation = stringOperations[selectedOperation]
      const operationResult = operation.execute(inputString, parameter1, parameter2)
      setResult(operationResult)
      setIsAnimating(false)
    }, 1000)
  }

  const currentOperation = stringOperations[selectedOperation]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">String Manipulation Playground</h4>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-full max-w-md"
            placeholder="Enter a string"
          />
        </div>

        <div className="mb-4">
          <select
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          >
            {Object.entries(stringOperations).map(([key, operation]) => (
              <option key={key} value={key}>
                {operation.name}
              </option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div className="mb-4 space-y-2">
          {currentOperation.params[0] && (
            <input
              type="text"
              value={parameter1}
              onChange={(e) => setParameter1(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
              placeholder={currentOperation.params[0]}
            />
          )}
          {currentOperation.params[1] && (
            <input
              type="text"
              value={parameter2}
              onChange={(e) => setParameter2(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600"
              placeholder={currentOperation.params[1]}
            />
          )}
        </div>

        <button
          onClick={executeOperation}
          disabled={isAnimating}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-all"
        >
          {isAnimating ? "Processing..." : "Execute Operation"}
        </button>
      </div>

      {/* Operation Description */}
      <div className="text-center p-4 border-2 border-dashed border-purple-400 rounded-lg">
        <div className="text-white text-lg mb-2">{currentOperation.name}</div>
        <div className="text-purple-300">{currentOperation.description}</div>
      </div>

      {/* Visual String Representation */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white mb-2">Original String:</div>
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
        </div>

        {/* Result Display */}
        {result && (
          <div className="text-center">
            <div className="text-white mb-2">Result:</div>
            <div className="flex justify-center space-x-1 mb-4">
              {result.split("").map((char, index) => (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center text-sm border-2 border-green-400 bg-green-400/20 rounded animate-pulse"
                >
                  {char === " " ? "␣" : char}
                </div>
              ))}
            </div>
            <div className="bg-green-500/20 border border-green-500 rounded p-4">
              <span className="text-green-300 text-xl font-mono">"{result}"</span>
            </div>
          </div>
        )}
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let str = "{inputString}";</div>
        <div className="text-green-400">
          let result = str.{selectedOperation}({currentOperation.params[0] && `"${parameter1}"`}
          {currentOperation.params[1] && `, "${parameter2}"`}
          );
        </div>
        <div className="text-blue-300">console.log(result); // "{result || "..."}"</div>
      </div>

      {/* String Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Original Length</div>
          <div className="text-blue-300 text-lg">{inputString.length}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Result Length</div>
          <div className="text-green-300 text-lg">{result.length || 0}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Length Change</div>
          <div
            className={`text-lg ${result.length > inputString.length ? "text-green-300" : result.length < inputString.length ? "text-red-300" : "text-yellow-300"}`}
          >
            {result ? (result.length - inputString.length > 0 ? "+" : "") + (result.length - inputString.length) : 0}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StringManipulationVisualization

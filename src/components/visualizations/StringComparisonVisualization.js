"use client"

import { useState } from "react"

const StringComparisonVisualization = () => {
  const [string1, setString1] = useState("apple")
  const [string2, setString2] = useState("banana")
  const [comparisonType, setComparisonType] = useState("equality")
  const [result, setResult] = useState(null)
  const [isComparing, setIsComparing] = useState(false)

  const comparisonTypes = {
    equality: {
      name: "Equality (===)",
      operation: (s1, s2) => s1 === s2,
      description: "Checks if strings are exactly the same",
    },
    inequality: {
      name: "Inequality (!==)",
      operation: (s1, s2) => s1 !== s2,
      description: "Checks if strings are different",
    },
    lexicographic: {
      name: "Lexicographic (<)",
      operation: (s1, s2) => s1 < s2,
      description: "Alphabetical comparison (dictionary order)",
    },
    greater: {
      name: "Greater Than (>)",
      operation: (s1, s2) => s1 > s2,
      description: "Checks if first string comes after second alphabetically",
    },
    includes: {
      name: "Includes",
      operation: (s1, s2) => s1.includes(s2),
      description: "Checks if first string contains second string",
    },
    startsWith: {
      name: "Starts With",
      operation: (s1, s2) => s1.startsWith(s2),
      description: "Checks if first string starts with second string",
    },
    endsWith: {
      name: "Ends With",
      operation: (s1, s2) => s1.endsWith(s2),
      description: "Checks if first string ends with second string",
    },
    caseInsensitive: {
      name: "Case Insensitive",
      operation: (s1, s2) => s1.toLowerCase() === s2.toLowerCase(),
      description: "Compares strings ignoring case differences",
    },
  }

  const performComparison = () => {
    setIsComparing(true)
    setTimeout(() => {
      const comparison = comparisonTypes[comparisonType]
      const comparisonResult = comparison.operation(string1, string2)
      setResult(comparisonResult)
      setIsComparing(false)
    }, 1000)
  }

  const currentComparison = comparisonTypes[comparisonType]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">String Comparison Playground</h4>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={string1}
            onChange={(e) => setString1(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
            placeholder="First string"
          />
          <input
            type="text"
            value={string2}
            onChange={(e) => setString2(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600"
            placeholder="Second string"
          />
        </div>

        <div className="mb-4">
          <select
            value={comparisonType}
            onChange={(e) => setComparisonType(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          >
            {Object.entries(comparisonTypes).map(([key, comparison]) => (
              <option key={key} value={key}>
                {comparison.name}
              </option>
            ))}
          </select>

          <button
            onClick={performComparison}
            disabled={isComparing}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition-all"
          >
            {isComparing ? "Comparing..." : "Compare"}
          </button>
        </div>
      </div>

      {/* Comparison Description */}
      <div className="text-center p-4 border-2 border-dashed border-blue-400 rounded-lg">
        <div className="text-white text-lg mb-2">{currentComparison.name}</div>
        <div className="text-blue-300">{currentComparison.description}</div>
      </div>

      {/* Visual String Comparison */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* String 1 */}
          <div className="text-center">
            <div className="text-white mb-2">String 1: "{string1}"</div>
            <div className="flex justify-center space-x-1">
              {string1.split("").map((char, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-sm border-2 rounded transition-all duration-500 ${
                    isComparing ? "border-yellow-400 bg-yellow-400/20 animate-pulse" : "border-blue-400 bg-blue-400/20"
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
            <div className="text-gray-400 text-sm mt-1">Length: {string1.length}</div>
          </div>

          {/* String 2 */}
          <div className="text-center">
            <div className="text-white mb-2">String 2: "{string2}"</div>
            <div className="flex justify-center space-x-1">
              {string2.split("").map((char, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center text-sm border-2 rounded transition-all duration-500 ${
                    isComparing
                      ? "border-yellow-400 bg-yellow-400/20 animate-pulse"
                      : "border-green-400 bg-green-400/20"
                  }`}
                >
                  {char}
                </div>
              ))}
            </div>
            <div className="text-gray-400 text-sm mt-1">Length: {string2.length}</div>
          </div>
        </div>

        {/* Result Display */}
        {result !== null && (
          <div className="text-center">
            <div
              className={`p-4 rounded border text-2xl font-bold ${
                result ? "border-green-500 bg-green-500/20 text-green-300" : "border-red-500 bg-red-500/20 text-red-300"
              }`}
            >
              {result ? "✅ TRUE" : "❌ FALSE"}
            </div>
          </div>
        )}
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let str1 = "{string1}";</div>
        <div className="text-gray-400">let str2 = "{string2}";</div>
        <div className="text-green-400">
          let result ={" "}
          {comparisonType === "equality"
            ? `str1 === str2`
            : comparisonType === "inequality"
              ? `str1 !== str2`
              : comparisonType === "lexicographic"
                ? `str1 < str2`
                : comparisonType === "greater"
                  ? `str1 > str2`
                  : comparisonType === "includes"
                    ? `str1.includes(str2)`
                    : comparisonType === "startsWith"
                      ? `str1.startsWith(str2)`
                      : comparisonType === "endsWith"
                        ? `str1.endsWith(str2)`
                        : comparisonType === "caseInsensitive"
                          ? `str1.toLowerCase() === str2.toLowerCase()`
                          : "comparison"}
          ;
        </div>
        <div className="text-blue-300">console.log(result); // {result !== null ? result.toString() : "..."}</div>
      </div>

      {/* Character-by-Character Comparison for Lexicographic */}
      {(comparisonType === "lexicographic" || comparisonType === "greater") && (
        <div className="bg-gray-800 rounded p-4">
          <div className="text-white font-semibold mb-3">Character-by-Character Comparison:</div>
          <div className="space-y-2">
            {Math.max(string1.length, string2.length) > 0 &&
              Array.from({ length: Math.max(string1.length, string2.length) }, (_, i) => {
                const char1 = string1[i] || "undefined"
                const char2 = string2[i] || "undefined"
                const code1 = string1.charCodeAt(i) || 0
                const code2 = string2.charCodeAt(i) || 0

                return (
                  <div key={i} className="grid grid-cols-5 gap-2 text-sm">
                    <div className="text-blue-300">Index {i}:</div>
                    <div className="text-white">
                      '{char1}' ({code1})
                    </div>
                    <div className="text-gray-400">vs</div>
                    <div className="text-white">
                      '{char2}' ({code2})
                    </div>
                    <div
                      className={code1 < code2 ? "text-green-300" : code1 > code2 ? "text-red-300" : "text-yellow-300"}
                    >
                      {code1 < code2 ? "str1 < str2" : code1 > code2 ? "str1 > str2" : "equal"}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Comparison Examples */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Case Sensitive</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              "Apple" === "apple" → <span className="text-red-300">false</span>
            </div>
            <div>
              "Hello" === "Hello" → <span className="text-green-300">true</span>
            </div>
            <div>
              "abc" &lt; "def" → <span className="text-green-300">true</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">String Methods</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              "hello".includes("ell") → <span className="text-green-300">true</span>
            </div>
            <div>
              "world".startsWith("wor") → <span className="text-green-300">true</span>
            </div>
            <div>
              "test".endsWith("st") → <span className="text-green-300">true</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StringComparisonVisualization

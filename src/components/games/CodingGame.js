"use client"

import { useState } from "react"

const CodingGame = ({ challenge, onComplete, onBack }) => {
  const [userCode, setUserCode] = useState(challenge.starterCode || "")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState([])
  const [showHint, setShowHint] = useState(false)

  const runCode = () => {
    setIsRunning(true)
    setOutput("")
    setTestResults([])

    try {
      // Create a safe execution environment
      const func = new Function(
        "console",
        userCode +
          "\n; return typeof " +
          challenge.functionName +
          ' !== "undefined" ? ' +
          challenge.functionName +
          " : null;",
      )

      const consoleOutput = []
      const mockConsole = {
        log: (...args) => {
          consoleOutput.push(args.join(" "))
        },
      }

      const userFunction = func(mockConsole)

      if (!userFunction) {
        setOutput("Error: Function not found. Make sure to define the function correctly.")
        setIsRunning(false)
        return
      }

      // Run test cases
      const results = challenge.testCases.map((testCase, index) => {
        try {
          const result = userFunction(...testCase.input)
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expected)
          return {
            index,
            input: testCase.input,
            expected: testCase.expected,
            actual: result,
            passed,
            description: testCase.description,
          }
        } catch (error) {
          return {
            index,
            input: testCase.input,
            expected: testCase.expected,
            actual: `Error: ${error.message}`,
            passed: false,
            description: testCase.description,
          }
        }
      })

      setTestResults(results)

      if (consoleOutput.length > 0) {
        setOutput(consoleOutput.join("\n"))
      }

      // Check if all tests passed
      const allPassed = results.every((result) => result.passed)
      if (allPassed) {
        setTimeout(() => {
          onComplete()
        }, 2000)
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }

    setIsRunning(false)
  }

  const resetCode = () => {
    setUserCode(challenge.starterCode || "")
    setOutput("")
    setTestResults([])
    setShowHint(false)
  }

  const allTestsPassed = testResults.length > 0 && testResults.every((result) => result.passed)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-20 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back to Learning
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Challenge Description */}
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">🎮 Coding Challenge</h2>
              <h3 className="text-xl text-blue-300 mb-3">{challenge.title}</h3>
              <p className="text-blue-100 mb-4">{challenge.description}</p>

              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-white">Requirements:</h4>
                <ul className="list-disc list-inside text-blue-200 space-y-1">
                  {challenge.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-white mb-2">Example:</h4>
                <div className="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div className="text-green-400">Input: {JSON.stringify(challenge.example.input)}</div>
                  <div className="text-blue-400">Output: {JSON.stringify(challenge.example.output)}</div>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm transition-all"
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
              </div>

              {showHint && (
                <div className="mt-3 p-3 bg-yellow-500 bg-opacity-20 border border-yellow-500 rounded">
                  <div className="text-yellow-200 text-sm">
                    💡 <strong>Hint:</strong> {challenge.hint}
                  </div>
                </div>
              )}
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.index}
                      className={`p-3 rounded border ${
                        result.passed
                          ? "border-green-500 bg-green-500 bg-opacity-20"
                          : "border-red-500 bg-red-500 bg-opacity-20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-semibold">
                          {result.passed ? "✅" : "❌"} {result.description}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <div>Input: {JSON.stringify(result.input)}</div>
                        <div>Expected: {JSON.stringify(result.expected)}</div>
                        <div>Got: {JSON.stringify(result.actual)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {allTestsPassed && (
                  <div className="mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded text-center">
                    <div className="text-green-300 text-xl font-bold">🎉 All tests passed! Great job!</div>
                    <div className="text-green-200 text-sm mt-1">Challenge completed successfully!</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <div className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Code Editor</h3>
                <div className="space-x-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition-all"
                  >
                    {isRunning ? "Running..." : "▶️ Run Code"}
                  </button>
                  <button
                    onClick={resetCode}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-64 bg-gray-900 text-white p-4 rounded border border-gray-600 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                placeholder="Write your code here..."
                spellCheck={false}
              />
            </div>

            {/* Output Console */}
            {output && (
              <div className="bg-black border border-gray-600 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Console Output:</h4>
                <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodingGame

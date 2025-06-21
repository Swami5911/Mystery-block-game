"use client"

import { useState } from "react"

const RecursionVisualization = () => {
  const [number, setNumber] = useState(5)
  const [isExecuting, setIsExecuting] = useState(false)
  const [callStack, setCallStack] = useState([])
  const [currentCall, setCurrentCall] = useState(-1)
  const [result, setResult] = useState(null)

  const factorial = async (n, depth = 0) => {
    // Add to call stack
    const callId = Date.now() + depth
    setCallStack((prev) => [...prev, { id: callId, n, depth, result: null }])
    setCurrentCall(callId)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (n <= 1) {
      // Base case
      setCallStack((prev) => prev.map((call) => (call.id === callId ? { ...call, result: 1, isBase: true } : call)))
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return 1
    } else {
      // Recursive case
      const recursiveResult = await factorial(n - 1, depth + 1)
      const finalResult = n * recursiveResult

      setCallStack((prev) => prev.map((call) => (call.id === callId ? { ...call, result: finalResult } : call)))
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return finalResult
    }
  }

  const executeFactorial = async () => {
    setIsExecuting(true)
    setCallStack([])
    setCurrentCall(-1)
    setResult(null)

    const finalResult = await factorial(number)
    setResult(finalResult)
    setIsExecuting(false)
  }

  const reset = () => {
    setCallStack([])
    setCurrentCall(-1)
    setResult(null)
    setIsExecuting(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Factorial Recursion Visualization</h4>

        <div className="mb-4 space-x-2">
          <input
            type="number"
            min="1"
            max="7"
            value={number}
            onChange={(e) => setNumber(Number.parseInt(e.target.value) || 1)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-20"
            disabled={isExecuting}
          />

          <button
            onClick={executeFactorial}
            disabled={isExecuting}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded disabled:opacity-50 transition-all"
          >
            {isExecuting ? "Computing..." : `Calculate ${number}!`}
          </button>

          <button
            onClick={reset}
            disabled={isExecuting}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Function Definition */}
      <div className="code-display">
        <div className="text-blue-400">function factorial(n) {"{"}</div>
        <div className="ml-4 text-gray-300">if (n &lt;= 1) {"{"}</div>
        <div className="ml-8 text-green-400">return 1; // Base case</div>
        <div className="ml-4 text-gray-300">{"} else {"}</div>
        <div className="ml-8 text-yellow-400">return n * factorial(n - 1); // Recursive case</div>
        <div className="ml-4 text-gray-300">{"}"}</div>
        <div className="text-blue-400">{"}"}</div>
      </div>

      {/* Call Stack Visualization */}
      {callStack.length > 0 && (
        <div className="space-y-2">
          <div className="text-white font-semibold text-center">Call Stack:</div>
          <div className="space-y-1">
            {callStack.map((call, index) => (
              <div
                key={call.id}
                className={`p-3 rounded border transition-all duration-500 ${
                  call.id === currentCall
                    ? "border-yellow-400 bg-yellow-400/20"
                    : call.result !== null
                      ? call.isBase
                        ? "border-green-400 bg-green-400/20"
                        : "border-blue-400 bg-blue-400/20"
                      : "border-gray-600 bg-gray-700/20"
                }`}
                style={{ marginLeft: `${call.depth * 20}px` }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white">
                    factorial({call.n}){call.isBase && <span className="text-green-400 ml-2">(Base Case)</span>}
                  </span>
                  {call.result !== null && <span className="text-green-300 font-bold">= {call.result}</span>}
                </div>
                {call.result !== null && !call.isBase && (
                  <div className="text-gray-300 text-sm mt-1">
                    {call.n} × factorial({call.n - 1}) = {call.n} × {call.result / call.n} = {call.result}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Result */}
      {result !== null && (
        <div className="text-center">
          <div className="bg-green-500/20 border border-green-500 rounded p-4">
            <div className="text-green-300 text-2xl font-bold">
              {number}! = {result}
            </div>
            <div className="text-green-200 text-sm mt-2">
              {Array.from({ length: number }, (_, i) => number - i).join(" × ")} = {result}
            </div>
          </div>
        </div>
      )}

      {/* Recursion Explanation */}
      <div className="bg-gray-800 rounded p-4">
        <div className="text-white font-semibold mb-2">How Recursion Works:</div>
        <div className="space-y-1 text-sm text-gray-300">
          <div>
            1. <span className="text-blue-300">Base Case</span>: When n ≤ 1, return 1 (stops recursion)
          </div>
          <div>
            2. <span className="text-yellow-300">Recursive Case</span>: Return n × factorial(n-1)
          </div>
          <div>
            3. <span className="text-green-300">Stack Unwinding</span>: Each call waits for the next to complete
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecursionVisualization

"use client"

import { useState } from "react"

const FunctionVisualization = () => {
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [parameters, setParameters] = useState({ a: 5, b: 3 })
  const [result, setResult] = useState(null)

  const functionSteps = [
    { step: "Function Called", description: "addNumbers(5, 3)" },
    { step: "Parameters Received", description: "a = 5, b = 3" },
    { step: "Calculation", description: "sum = a + b = 5 + 3" },
    { step: "Return Value", description: "return 8" },
  ]

  const executeFunction = async () => {
    setIsExecuting(true)
    setCurrentStep(0)
    setResult(null)

    for (let i = 0; i < functionSteps.length; i++) {
      setCurrentStep(i)
      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    setResult(parameters.a + parameters.b)
    setIsExecuting(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Function Execution Flow</h4>

        <div className="mb-4 space-x-2">
          <input
            type="number"
            value={parameters.a}
            onChange={(e) => setParameters({ ...parameters, a: Number.parseInt(e.target.value) || 0 })}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-16"
            disabled={isExecuting}
          />
          <span className="text-white">+</span>
          <input
            type="number"
            value={parameters.b}
            onChange={(e) => setParameters({ ...parameters, b: Number.parseInt(e.target.value) || 0 })}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-16"
            disabled={isExecuting}
          />

          <button
            onClick={executeFunction}
            disabled={isExecuting}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 transition-all ml-4"
          >
            {isExecuting ? "Executing..." : "Call Function"}
          </button>
        </div>
      </div>

      {/* Function Code */}
      <div className="code-display">
        <div className="text-blue-400">function addNumbers(a, b) {"{"}</div>
        <div className="ml-4 text-gray-300">let sum = a + b;</div>
        <div className="ml-4 text-gray-300">return sum;</div>
        <div className="text-blue-400">{"}"}</div>
        <div className="mt-2 text-yellow-400">
          addNumbers({parameters.a}, {parameters.b});
        </div>
      </div>

      {/* Execution Steps */}
      <div className="space-y-2">
        {functionSteps.map((step, index) => (
          <div
            key={index}
            className={`p-3 rounded border transition-all duration-500 ${
              index === currentStep && isExecuting
                ? "border-yellow-400 bg-yellow-400/20"
                : index < currentStep || (!isExecuting && result !== null)
                  ? "border-green-400 bg-green-400/20"
                  : "border-gray-600 bg-gray-700/20"
            }`}
          >
            <div className="text-white font-semibold">{step.step}</div>
            <div className="text-gray-300 text-sm">{step.description}</div>
          </div>
        ))}
      </div>

      {/* Result */}
      {result !== null && (
        <div className="text-center">
          <div className="bg-green-500/20 border border-green-500 rounded p-4">
            <div className="text-green-300 text-xl">
              Result: <span className="font-bold">{result}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FunctionVisualization

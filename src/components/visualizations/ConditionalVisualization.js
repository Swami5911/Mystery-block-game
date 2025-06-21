"use client"

import { useState } from "react"

const ConditionalVisualization = () => {
  const [age, setAge] = useState(18)
  const [hasLicense, setHasLicense] = useState(true)
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentCondition, setCurrentCondition] = useState("")
  const [result, setResult] = useState("")

  const executeConditional = async () => {
    setIsExecuting(true)
    setResult("")

    // Check age condition
    setCurrentCondition("age >= 18")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (age >= 18) {
      setCurrentCondition("hasLicense === true")
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (hasLicense) {
        setResult("✅ Can drive!")
      } else {
        setResult("❌ Need a license first")
      }
    } else {
      setResult("❌ Too young to drive")
    }

    setCurrentCondition("")
    setIsExecuting(false)
  }

  const getConditionColor = (condition) => {
    if (!isExecuting || currentCondition !== condition) return "border-gray-600 bg-gray-700/20"
    return "border-yellow-400 bg-yellow-400/20 animate-pulse"
  }

  const getConditionResult = (condition) => {
    if (condition === "age >= 18") {
      return age >= 18 ? "✅ True" : "❌ False"
    }
    if (condition === "hasLicense === true") {
      return hasLicense ? "✅ True" : "❌ False"
    }
    return ""
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">If-Else Conditional Logic</h4>

        <div className="mb-4 space-x-4">
          <div className="inline-block">
            <label className="text-white block mb-1">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value) || 0)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-20"
              disabled={isExecuting}
            />
          </div>

          <div className="inline-block">
            <label className="text-white block mb-1">Has License:</label>
            <select
              value={hasLicense}
              onChange={(e) => setHasLicense(e.target.value === "true")}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600"
              disabled={isExecuting}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="inline-block">
            <label className="text-white block mb-1">&nbsp;</label>
            <button
              onClick={executeConditional}
              disabled={isExecuting}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:opacity-50 transition-all"
            >
              {isExecuting ? "Checking..." : "Check Conditions"}
            </button>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-blue-400">if (age &gt;= 18) {"{"}</div>
        <div className="ml-4 text-blue-400">if (hasLicense === true) {"{"}</div>
        <div className="ml-8 text-green-400">console.log("Can drive!");</div>
        <div className="ml-4 text-blue-400">{"} else {"}</div>
        <div className="ml-8 text-red-400">console.log("Need a license first");</div>
        <div className="ml-4 text-blue-400">{"}"}</div>
        <div className="text-blue-400">{"} else {"}</div>
        <div className="ml-4 text-red-400">console.log("Too young to drive");</div>
        <div className="text-blue-400">{"}"}</div>
      </div>

      {/* Condition Flow */}
      <div className="space-y-3">
        <div className={`p-3 rounded border transition-all duration-500 ${getConditionColor("age >= 18")}`}>
          <div className="flex justify-between items-center">
            <span className="text-white">Check: age >= 18</span>
            <span className="text-white">
              ({age} >= 18) = {getConditionResult("age >= 18")}
            </span>
          </div>
        </div>

        {age >= 18 && (
          <div
            className={`p-3 rounded border transition-all duration-500 ml-4 ${getConditionColor("hasLicense === true")}`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white">Check: hasLicense === true</span>
              <span className="text-white">
                ({hasLicense.toString()}) = {getConditionResult("hasLicense === true")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="text-center">
          <div
            className={`p-4 rounded border text-xl font-bold ${
              result.includes("✅")
                ? "border-green-500 bg-green-500/20 text-green-300"
                : "border-red-500 bg-red-500/20 text-red-300"
            }`}
          >
            {result}
          </div>
        </div>
      )}

      {/* Truth Table */}
      <div className="bg-gray-800 rounded p-4">
        <div className="text-white font-semibold mb-3">Truth Table:</div>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-gray-400 font-semibold">Age >= 18</div>
          <div className="text-gray-400 font-semibold">Has License</div>
          <div className="text-gray-400 font-semibold">Result</div>

          <div className="text-green-300">True</div>
          <div className="text-green-300">True</div>
          <div className="text-green-300">✅ Can drive</div>

          <div className="text-green-300">True</div>
          <div className="text-red-300">False</div>
          <div className="text-red-300">❌ Need license</div>

          <div className="text-red-300">False</div>
          <div className="text-gray-400">Any</div>
          <div className="text-red-300">❌ Too young</div>
        </div>
      </div>
    </div>
  )
}

export default ConditionalVisualization

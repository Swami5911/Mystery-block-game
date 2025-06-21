"use client"

import { useState } from "react"

const ObjectVisualization = () => {
  const [currentObject, setCurrentObject] = useState({})
  const [newProperty, setNewProperty] = useState({ key: "", value: "" })
  const [isAnimating, setIsAnimating] = useState(false)

  const addProperty = () => {
    if (newProperty.key && newProperty.value) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentObject(prev => ({
          ...prev,
          [newProperty.key]: newProperty.value
        }))
        setNewProperty({ key: "", value: "" })
        setIsAnimating(false)
      }, 500)
    }
  }

  const removeProperty = (key) => {
    setCurrentObject(prev => {
      const newObj = { ...prev }
      delete newObj[key]
      return newObj
    })
  }

  const resetObject = () => {
    setCurrentObject({})
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Object Creation & Manipulation</h4>
        
        <div className="mb-4 space-x-2">
          <input
            type="text"
            placeholder="Property name"
            value={newProperty.key}
            onChange={(e) => setNewProperty({ ...newProperty, key: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600"
          />
          <input
            type="text"
            placeholder="Property value"
            value={newProperty.value}
            onChange={(e) => setNewProperty({ ...newProperty, value: e.target.value })}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600"
          />
          
          <button
            onClick={addProperty}
            disabled={isAnimating || !newProperty.key || !newProperty.value}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition-all"
          >
            Add Property
          </button>
          
          <button
            onClick={resetObject}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-all"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Visual Object Representation */}
      <div className="flex justify-center">
        <div className="bg-gray-800 border-2 border-blue-400 rounded-lg p-6 min-w-64">
          <div className="text-blue-400 text-center mb-4 font-bold">Object</div>
          
          {Object.keys(currentObject).length === 0 ? (
            <div className="text-gray-400 text-center italic">Empty Object {"{}"}</div>
          ) : (
            <div className="space-y-2">
              {Object.entries(currentObject).map(([key, value], index) => (
                <div
                  key={key}
                  className={`flex justify-between items-center p-2 rounded border transition-all duration-500 ${
                    isAnimating ? "border-yellow-400 bg-yellow-400/20" : "border-green-400 bg-green-400/20"
                  }`}
                >
                  <div className="text-white">
                    <span className="text-blue-300">{key}</span>: 
                    <span className="text-green-300 ml-1">"{value}"</span>
                  </div>
                  <button
                    onClick={() => removeProperty(key)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Code Display */}
      <div className="code-display">
        <div className="text-gray-400">let myObject = {"{"}
        {Object.entries(currentObject).map(([key, value], index) => (
          <div key={key} className="ml-4 text-green-400">
            {key}: "{value}"{index < Object.keys(currentObject).length - 1 ? "," : ""}
          </div>
        ))}
        <div className="text-gray-400">{"};"}</div>
      </div>

      {/* Object Methods Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Object.keys()</div>
          <div className="text-blue-300 text-sm">
            [{Object.keys(currentObject).map(key => `"${key}"`).join(", ")}]
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Object.values()</div>
          <div className="text-green-300 text-sm">
            [{Object.values(currentObject).map(value => `"${value}"`).join(", ")}]
          </div>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Object.entries()</div>
          <div className="text-yellow-300 text-sm">
            [{Object.entries(currentObject).map(([k, v]) => `["${k}", "${v}"]`).join(", ")}]
          </div>
        </div>
      </div>
    </div>
  )
}
\
export default ObjectVisualization

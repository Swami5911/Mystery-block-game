"use client"
import { CheckCircle, BookOpen } from "lucide-react"

const CategoryView = ({ category, onSubconceptSelect, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-20 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back to Grid
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-blue-200">Master all concepts to unlock this mystery block!</p>
        </div>

        <div className="grid gap-4">
          {category.subconcepts.map((subconcept) => (
            <div
              key={subconcept.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-102 rounded-lg border p-6 ${
                subconcept.completed
                  ? "bg-green-500 bg-opacity-20 border-green-500 border-opacity-50"
                  : "bg-white bg-opacity-10 border-white border-opacity-20 hover:bg-opacity-20"
              }`}
              onClick={() => onSubconceptSelect(subconcept)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      subconcept.completed ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {subconcept.completed ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <BookOpen className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{subconcept.name}</h3>
                    <p className="text-blue-200 text-sm">{subconcept.completed ? "Completed!" : "Click to learn"}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    subconcept.completed ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {subconcept.completed ? "Done" : "Learn"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryView

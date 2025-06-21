"use client"

import { useState } from "react"
import MysteryBlock from "./MysteryBlock"
import CategoryView from "./CategoryView"
import LearningModule from "./LearningModule"
import { gameCategories } from "../data/gameData"
import { Lock, CheckCircle, Play } from "lucide-react"

const MysteryBlocksGame = () => {
  const [gameData, setGameData] = useState(gameCategories)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentView, setCurrentView] = useState("grid")
  const [selectedSubconcept, setSelectedSubconcept] = useState(null)

  const getCategoryProgress = (category) => {
    const completed = category.subconcepts.filter((sub) => sub.completed).length
    return (completed / category.subconcepts.length) * 100
  }

  const isCategoryCompleted = (category) => {
    return category.subconcepts.every((sub) => sub.completed)
  }

  const getOverallProgress = () => {
    const totalSubconcepts = gameData.reduce((acc, cat) => acc + cat.subconcepts.length, 0)
    const completedSubconcepts = gameData.reduce(
      (acc, cat) => acc + cat.subconcepts.filter((sub) => sub.completed).length,
      0,
    )
    return (completedSubconcepts / totalSubconcepts) * 100
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setCurrentView("category")
  }

  const handleSubconceptSelect = (subconcept) => {
    setSelectedSubconcept(subconcept)
    setCurrentView("learning")
  }

  const completeSubconcept = (categoryId, subconceptId) => {
    setGameData((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              subconcepts: cat.subconcepts.map((sub) => (sub.id === subconceptId ? { ...sub, completed: true } : sub)),
            }
          : cat,
      ),
    )
    setCurrentView("category")
  }

  if (currentView === "learning" && selectedSubconcept) {
    return (
      <LearningModule
        category={selectedCategory}
        subconcept={selectedSubconcept}
        onComplete={() => completeSubconcept(selectedCategory.id, selectedSubconcept.id)}
        onBack={() => setCurrentView("category")}
      />
    )
  }

  if (currentView === "category" && selectedCategory) {
    return (
      <CategoryView
        category={selectedCategory}
        onSubconceptSelect={handleSubconceptSelect}
        onBack={() => setCurrentView("grid")}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎯 Mystery Blocks</h1>
          <p className="text-blue-200 mb-4">Learn programming concepts to reveal the hidden image!</p>
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getOverallProgress()}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-300 mt-2">Overall Progress: {Math.round(getOverallProgress())}%</p>
          </div>
        </div>

        {/* Mystery Grid */}
        <div className="mystery-grid">
          {gameData.map((category, index) => (
            <MysteryBlock
              key={category.id}
              category={category}
              position={index}
              isRevealed={isCategoryCompleted(category)}
              progress={getCategoryProgress(category)}
              onClick={() => handleCategorySelect(category)}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 text-center">
          <div className="flex justify-center gap-4 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Locked</span>
            </div>
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span>In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MysteryBlocksGame

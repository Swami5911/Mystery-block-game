"use client"

import { useState } from "react"
import VisualizationComponent from "./visualizations/VisualizationComponent"
import CodingGame from "./games/CodingGame"
import { learningContent } from "../data/learningContent"
import { codingChallenges } from "../data/codingChallenges"

const LearningModule = ({ category, subconcept, onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const content = learningContent[subconcept.name] || {
    steps: [
      {
        title: `Learning ${subconcept.name}`,
        content: `This is where you'll learn about ${subconcept.name}. Interactive lessons and examples will be provided here.`,
        hasVisualization: false,
      },
    ],
    quiz: {
      question: `What is the main purpose of ${subconcept.name}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: 0,
    },
  }

  const challenge = codingChallenges[subconcept.name]

  const handleNext = () => {
    if (currentStep < content.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowQuiz(true)
    }
  }

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex)
    if (answerIndex === content.quiz.correct) {
      setQuizCompleted(true)
      setTimeout(() => {
        if (challenge) {
          setShowGame(true)
        } else {
          onComplete()
        }
      }, 1500)
    }
  }

  const handleGameComplete = () => {
    onComplete()
  }

  if (showGame && challenge) {
    return <CodingGame challenge={challenge} onComplete={handleGameComplete} onBack={() => setShowGame(false)} />
  }

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-20 rounded hover:bg-opacity-20 transition-all"
          >
            ← Back
          </button>

          <div className="visualization-container">
            <h2 className="text-2xl font-bold text-white mb-6">Quiz Time! 🧠</h2>

            <div className="mb-6">
              <pre className="code-display text-green-400 mb-4">{content.quiz.question}</pre>
            </div>

            <div className="grid gap-3">
              {content.quiz.options.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 text-left h-auto rounded border transition-all ${
                    selectedAnswer === index
                      ? index === content.quiz.correct
                        ? "bg-green-500 bg-opacity-20 border-green-500 text-green-300"
                        : "bg-red-500 bg-opacity-20 border-red-500 text-red-300"
                      : "bg-white bg-opacity-10 text-white border-white border-opacity-20 hover:bg-opacity-20"
                  }`}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>

            {quizCompleted && (
              <div className="mt-6 text-center">
                <div className="text-green-400 text-xl mb-2">🎉 Correct!</div>
                <p className="text-green-300">
                  Great job! {challenge ? "Now try the coding challenge!" : `You've mastered ${subconcept.name}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-20 rounded hover:bg-opacity-20 transition-all"
        >
          ← Back
        </button>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / content.steps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-blue-200 text-sm mt-2">
            Step {currentStep + 1} of {content.steps.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Panel */}
          <div className="visualization-container">
            <h2 className="text-2xl font-bold text-white mb-4">{content.steps[currentStep].title}</h2>

            <div className="text-blue-100 mb-8 whitespace-pre-line leading-relaxed">
              {content.steps[currentStep].content}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-white bg-opacity-10 text-white border border-white border-opacity-20 rounded hover:bg-opacity-20 transition-all disabled:opacity-50"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
              >
                {currentStep === content.steps.length - 1 ? "Take Quiz" : "Next"}
              </button>
            </div>
          </div>

          {/* Visualization Panel */}
          {content.steps[currentStep].hasVisualization && (
            <div className="visualization-container">
              <h3 className="text-xl font-bold text-white mb-4">Visual Demo</h3>
              <VisualizationComponent type={content.steps[currentStep].visualizationType} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LearningModule

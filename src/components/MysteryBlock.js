"use client"
import { Lock, CheckCircle } from "lucide-react"

const MysteryBlock = ({ category, position, isRevealed, progress, onClick }) => {
  const getBlockClass = () => {
    if (isRevealed) return "mystery-block revealed"
    if (progress > 0) return "mystery-block in-progress"
    return "mystery-block locked"
  }

  return (
    <div className={getBlockClass()} onClick={onClick}>
      {isRevealed ? (
        <>
          <div className="text-4xl mb-2">{category.icon}</div>
          <h3 className="font-bold text-white text-sm">{category.name}</h3>
          <CheckCircle className="w-6 h-6 text-white mt-2" />
        </>
      ) : progress > 0 ? (
        <>
          <div className="text-3xl mb-2 opacity-75">{category.icon}</div>
          <h3 className="font-bold text-white text-sm">{category.name}</h3>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-white mt-1">{Math.round(progress)}%</span>
        </>
      ) : (
        <>
          <Lock className="w-8 h-8 text-gray-400 mb-2" />
          <h3 className="font-bold text-gray-300 text-sm">{category.name}</h3>
          <span className="text-xs text-gray-400 mt-1">Locked</span>
        </>
      )}
    </div>
  )
}

export default MysteryBlock

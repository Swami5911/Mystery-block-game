"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Lock, CheckCircle, Play, BookOpen } from "lucide-react"

// Game data structure
const categories = [
  {
    id: 1,
    name: "Loops",
    icon: "🔄",
    subconcepts: [
      { id: 1, name: "For Loop", completed: false },
      { id: 2, name: "While Loop", completed: false },
      { id: 3, name: "Do-While Loop", completed: false },
    ],
  },
  {
    id: 2,
    name: "Arrays",
    icon: "📊",
    subconcepts: [
      { id: 1, name: "Array Declaration", completed: false },
      { id: 2, name: "Array Access", completed: false },
      { id: 3, name: "Array Methods", completed: false },
    ],
  },
  {
    id: 3,
    name: "Strings",
    icon: "📝",
    subconcepts: [
      { id: 1, name: "String Methods", completed: false },
      { id: 2, name: "String Manipulation", completed: false },
      { id: 3, name: "String Comparison", completed: false },
    ],
  },
  {
    id: 4,
    name: "Sorting",
    icon: "🔢",
    subconcepts: [
      { id: 1, name: "Bubble Sort", completed: false },
      { id: 2, name: "Selection Sort", completed: false },
      { id: 3, name: "Quick Sort", completed: false },
    ],
  },
  {
    id: 5,
    name: "Searching",
    icon: "🔍",
    subconcepts: [
      { id: 1, name: "Linear Search", completed: false },
      { id: 2, name: "Binary Search", completed: false },
      { id: 3, name: "Hash Search", completed: false },
    ],
  },
  {
    id: 6,
    name: "Functions",
    icon: "⚡",
    subconcepts: [
      { id: 1, name: "Function Declaration", completed: false },
      { id: 2, name: "Parameters & Arguments", completed: false },
      { id: 3, name: "Return Values", completed: false },
    ],
  },
  {
    id: 7,
    name: "Objects",
    icon: "🏗️",
    subconcepts: [
      { id: 1, name: "Object Creation", completed: false },
      { id: 2, name: "Object Properties", completed: false },
      { id: 3, name: "Object Methods", completed: false },
    ],
  },
  {
    id: 8,
    name: "Conditionals",
    icon: "🤔",
    subconcepts: [
      { id: 1, name: "If Statements", completed: false },
      { id: 2, name: "Switch Cases", completed: false },
      { id: 3, name: "Ternary Operators", completed: false },
    ],
  },
  {
    id: 9,
    name: "Recursion",
    icon: "🌀",
    subconcepts: [
      { id: 1, name: "Base Case", completed: false },
      { id: 2, name: "Recursive Case", completed: false },
      { id: 3, name: "Stack Overflow", completed: false },
    ],
  },
]

export default function MysteryBlocksGame() {
  const [gameData, setGameData] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentView, setCurrentView] = useState("grid") // 'grid', 'category', 'learning'
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
            <Progress value={getOverallProgress()} className="h-3" />
            <p className="text-sm text-blue-300 mt-2">Overall Progress: {Math.round(getOverallProgress())}%</p>
          </div>
        </div>

        {/* Mystery Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
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

function MysteryBlock({ category, position, isRevealed, progress, onClick }) {
  return (
    <Card
      className={`aspect-square cursor-pointer transition-all duration-300 hover:scale-105 ${
        isRevealed
          ? "bg-gradient-to-br from-green-400 to-blue-500 shadow-lg shadow-green-500/25"
          : progress > 0
            ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/25"
            : "bg-gradient-to-br from-gray-600 to-gray-800 shadow-lg"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
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
            <Progress value={progress} className="w-full mt-2 h-2" />
            <span className="text-xs text-white mt-1">{Math.round(progress)}%</span>
          </>
        ) : (
          <>
            <Lock className="w-8 h-8 text-gray-400 mb-2" />
            <h3 className="font-bold text-gray-300 text-sm">{category.name}</h3>
            <span className="text-xs text-gray-400 mt-1">Locked</span>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function CategoryView({ category, onSubconceptSelect, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-6 bg-white/10 text-white border-white/20">
          ← Back to Grid
        </Button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-3xl font-bold text-white mb-2">{category.name}</h1>
          <p className="text-blue-200">Master all concepts to unlock this mystery block!</p>
        </div>

        <div className="grid gap-4">
          {category.subconcepts.map((subconcept) => (
            <Card
              key={subconcept.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-102 ${
                subconcept.completed
                  ? "bg-green-500/20 border-green-500/50"
                  : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
              onClick={() => onSubconceptSelect(subconcept)}
            >
              <CardContent className="p-6 flex items-center justify-between">
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
                <Badge variant={subconcept.completed ? "default" : "secondary"}>
                  {subconcept.completed ? "Done" : "Learn"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function LearningModule({ category, subconcept, onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showGame, setShowGame] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  // Enhanced learning content with visual demonstrations
  const learningContent = {
    "For Loop": {
      steps: [
        {
          title: "What is a For Loop?",
          content:
            "A for loop is used to repeat a block of code a specific number of times. Let's see how it travels through an array of items!",
          hasVisualization: true,
          visualizationType: "forLoop",
        },
        {
          title: "For Loop Syntax",
          content:
            "for (initialization; condition; increment) {\n  // code to be executed\n}\n\nExample:\nfor (let i = 0; i < 5; i++) {\n  console.log(animals[i]);\n}",
          hasVisualization: false,
        },
        {
          title: "Interactive For Loop",
          content: "Watch how the loop counter moves through each element in the array!",
          hasVisualization: true,
          visualizationType: "interactiveForLoop",
        },
      ],
      quiz: {
        question: "What will this code output?\n\nfor (let i = 1; i <= 3; i++) {\n  console.log(i * 2);\n}",
        options: ["1, 2, 3", "2, 4, 6", "0, 2, 4", "1, 4, 9"],
        correct: 1,
      },
    },
    "While Loop": {
      steps: [
        {
          title: "What is a While Loop?",
          content:
            "A while loop repeats code as long as a condition is true. Watch how it checks the condition each time!",
          hasVisualization: true,
          visualizationType: "whileLoop",
        },
        {
          title: "While Loop Syntax",
          content:
            "while (condition) {\n  // code to be executed\n}\n\nExample:\nlet count = 0;\nwhile (count < 3) {\n  console.log(monkeys[count]);\n  count++;\n}",
        },
      ],
      quiz: {
        question: "What's the main difference between for and while loops?",
        options: [
          "For loops are faster",
          "While loops can't use counters",
          "For loops are for known iterations, while loops for unknown",
          "There's no difference",
        ],
        correct: 2,
      },
    },
    "Do-While Loop": {
      steps: [
        {
          title: "Do-While Loop Basics",
          content:
            "A do-while loop executes code at least once, then repeats while a condition is true. The key difference is that it checks the condition AFTER executing the code block.",
          hasVisualization: true,
          visualizationType: "doWhileLoop",
        },
        {
          title: "Do-While Syntax",
          content:
            "do {\n  // code to be executed\n} while (condition);\n\nExample:\nlet count = 0;\ndo {\n  console.log('Count:', count);\n  count++;\n} while (count < 3);",
        },
      ],
      quiz: {
        question: "What's the key difference between while and do-while loops?",
        options: [
          "Do-while is faster",
          "Do-while executes at least once",
          "While loops are more efficient",
          "No difference",
        ],
        correct: 1,
      },
    },
    "Array Declaration": {
      steps: [
        {
          title: "Creating Arrays",
          content: "Arrays store multiple items in a single container. Let's see how to create and fill them!",
          hasVisualization: true,
          visualizationType: "arrayCreation",
        },
        {
          title: "Array Syntax",
          content:
            "let fruits = ['🍎', '🍌', '🍊', '🍇'];\n\n// Or create empty and add items\nlet animals = [];\nanimals[0] = '🐵';\nanimals[1] = '🐸';",
        },
      ],
      quiz: {
        question: "How do you create an array with 3 animals?",
        options: [
          "let animals = '🐵', '🐸', '🐨';",
          "let animals = ['🐵', '🐸', '🐨'];",
          "let animals = {🐵, 🐸, 🐨};",
          "let animals = (🐵, 🐸, 🐨);",
        ],
        correct: 1,
      },
    },
    "Array Access": {
      steps: [
        {
          title: "Accessing Array Elements",
          content: "Arrays use zero-based indexing. The first element is at index 0, second at index 1, and so on.",
          hasVisualization: true,
          visualizationType: "arrayAccess",
        },
        {
          title: "Array Access Syntax",
          content:
            "let fruits = ['🍎', '🍌', '🍊'];\nconsole.log(fruits[0]); // 🍎\nconsole.log(fruits[1]); // 🍌\nconsole.log(fruits[2]); // 🍊\nconsole.log(fruits.length); // 3",
        },
      ],
      quiz: {
        question: "What will fruits[1] return for array ['apple', 'banana', 'orange']?",
        options: ["apple", "banana", "orange", "undefined"],
        correct: 1,
      },
    },
    "Array Methods": {
      steps: [
        {
          title: "Common Array Methods",
          content: "Arrays have built-in methods like push(), pop(), shift(), unshift(), and more for manipulation.",
          hasVisualization: true,
          visualizationType: "arrayMethods",
        },
        {
          title: "Array Methods Examples",
          content:
            "let arr = [1, 2, 3];\narr.push(4); // [1, 2, 3, 4]\narr.pop(); // [1, 2, 3]\narr.unshift(0); // [0, 1, 2, 3]\narr.shift(); // [1, 2, 3]",
        },
      ],
      quiz: {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0,
      },
    },
    "String Methods": {
      steps: [
        {
          title: "String Methods Overview",
          content:
            "Strings have many built-in methods for manipulation like toUpperCase(), toLowerCase(), charAt(), substring(), and split().",
          hasVisualization: true,
          visualizationType: "stringMethods",
        },
        {
          title: "Common String Operations",
          content:
            "let text = 'Hello World';\ntext.toUpperCase(); // 'HELLO WORLD'\ntext.toLowerCase(); // 'hello world'\ntext.charAt(0); // 'H'\ntext.substring(0, 5); // 'Hello'",
        },
      ],
      quiz: {
        question: "What does 'Hello'.charAt(1) return?",
        options: ["H", "e", "l", "o"],
        correct: 1,
      },
    },
    "String Manipulation": {
      steps: [
        {
          title: "String Manipulation Techniques",
          content: "Learn how to modify, combine, and transform strings using various methods and operations.",
          hasVisualization: true,
          visualizationType: "stringManipulation",
        },
        {
          title: "String Manipulation Examples",
          content:
            "let str = 'JavaScript';\nstr.replace('Script', 'Code'); // 'JavaCode'\nstr.slice(0, 4); // 'Java'\nstr.concat(' is fun'); // 'JavaScript is fun'\nstr.repeat(2); // 'JavaScriptJavaScript'",
        },
      ],
      quiz: {
        question: "What does 'abc'.repeat(3) return?",
        options: ["abc", "abcabc", "abcabcabc", "aaa"],
        correct: 2,
      },
    },
    "String Comparison": {
      steps: [
        {
          title: "Comparing Strings",
          content: "Strings can be compared using comparison operators and methods like localeCompare().",
          hasVisualization: true,
          visualizationType: "stringComparison",
        },
        {
          title: "String Comparison Examples",
          content:
            "'apple' === 'apple'; // true\n'apple' < 'banana'; // true (alphabetical)\n'Apple'.toLowerCase() === 'apple'; // true\n'hello'.includes('ell'); // true",
        },
      ],
      quiz: {
        question: "What does 'apple' < 'banana' return?",
        options: ["true", "false", "undefined", "error"],
        correct: 0,
      },
    },
    "Bubble Sort": {
      steps: [
        {
          title: "How Bubble Sort Works",
          content:
            "Bubble sort compares adjacent elements and swaps them if they're in the wrong order. Watch the bubbles rise!",
          hasVisualization: true,
          visualizationType: "bubbleSort",
        },
        {
          title: "Bubble Sort Algorithm",
          content:
            "The algorithm repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        },
      ],
      quiz: {
        question: "In bubble sort, what happens when we compare two adjacent elements?",
        options: [
          "We always swap them",
          "We swap them only if the left one is larger",
          "We never swap them",
          "We delete the smaller one",
        ],
        correct: 1,
      },
    },
    "Selection Sort": {
      steps: [
        {
          title: "Selection Sort Algorithm",
          content:
            "Selection sort finds the minimum element and places it at the beginning, then repeats for the remaining elements.",
          hasVisualization: true,
          visualizationType: "selectionSort",
        },
        {
          title: "Selection Sort Process",
          content:
            "1. Find the minimum element in the unsorted portion\n2. Swap it with the first element of unsorted portion\n3. Move the boundary of sorted portion\n4. Repeat until array is sorted",
        },
      ],
      quiz: {
        question: "What is the time complexity of selection sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
        correct: 2,
      },
    },
    "Quick Sort": {
      steps: [
        {
          title: "Quick Sort Overview",
          content:
            "Quick sort uses divide-and-conquer approach by selecting a pivot and partitioning the array around it.",
          hasVisualization: true,
          visualizationType: "quickSort",
        },
        {
          title: "Quick Sort Steps",
          content:
            "1. Choose a pivot element\n2. Partition array so elements smaller than pivot are on left\n3. Elements larger than pivot are on right\n4. Recursively sort left and right subarrays",
        },
      ],
      quiz: {
        question: "What is the average time complexity of quick sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 1,
      },
    },
    "Linear Search": {
      steps: [
        {
          title: "Linear Search Process",
          content:
            "Linear search checks each element one by one until it finds the target. Watch the search in action!",
          hasVisualization: true,
          visualizationType: "linearSearch",
        },
        {
          title: "Linear Search Code",
          content:
            "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}",
        },
      ],
      quiz: {
        question: "What is the time complexity of linear search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
      },
    },
    "Binary Search": {
      steps: [
        {
          title: "Binary Search Algorithm",
          content: "Binary search works on sorted arrays by repeatedly dividing the search interval in half.",
          hasVisualization: true,
          visualizationType: "binarySearch",
        },
        {
          title: "Binary Search Process",
          content:
            "1. Compare target with middle element\n2. If equal, return index\n3. If target is smaller, search left half\n4. If target is larger, search right half\n5. Repeat until found or interval is empty",
        },
      ],
      quiz: {
        question: "What is the time complexity of binary search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 1,
      },
    },
    "Hash Search": {
      steps: [
        {
          title: "Hash Search Concept",
          content: "Hash search uses hash tables to achieve O(1) average search time by mapping keys to array indices.",
          hasVisualization: true,
          visualizationType: "hashSearch",
        },
        {
          title: "Hash Table Implementation",
          content:
            "Hash tables use hash functions to convert keys into array indices:\nlet hashTable = {};\nhashTable['key'] = 'value';\nconsole.log(hashTable['key']); // 'value'",
        },
      ],
      quiz: {
        question: "What is the average time complexity of hash search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 0,
      },
    },
    "Function Declaration": {
      steps: [
        {
          title: "Function Declaration Basics",
          content:
            "Functions are reusable blocks of code that perform specific tasks. They can accept parameters and return values.",
          hasVisualization: true,
          visualizationType: "functionExecution",
        },
        {
          title: "Function Syntax",
          content:
            "function functionName(parameters) {\n  // code to execute\n  return value; // optional\n}\n\n// Example:\nfunction greet(name) {\n  return 'Hello, ' + name + '!';\n}",
        },
      ],
      quiz: {
        question: "How do you declare a function named 'add' that takes two parameters?",
        options: ["function add(a, b) {}", "add function(a, b) {}", "function(a, b) add {}", "add(a, b) function {}"],
        correct: 0,
      },
    },
    "Parameters & Arguments": {
      steps: [
        {
          title: "Parameters vs Arguments",
          content:
            "Parameters are variables in function definition. Arguments are actual values passed when calling the function.",
          hasVisualization: true,
          visualizationType: "parametersArguments",
        },
        {
          title: "Parameters and Arguments Example",
          content:
            "function multiply(a, b) { // a and b are parameters\n  return a * b;\n}\n\nlet result = multiply(5, 3); // 5 and 3 are arguments\nconsole.log(result); // 15",
        },
      ],
      quiz: {
        question: "In function call multiply(4, 7), what are 4 and 7 called?",
        options: ["Parameters", "Arguments", "Variables", "Constants"],
        correct: 1,
      },
    },
    "Return Values": {
      steps: [
        {
          title: "Function Return Values",
          content:
            "Functions can return values using the return statement. If no return statement, function returns undefined.",
          hasVisualization: true,
          visualizationType: "returnValues",
        },
        {
          title: "Return Statement Examples",
          content:
            "function add(a, b) {\n  return a + b; // returns sum\n}\n\nfunction greet(name) {\n  console.log('Hello ' + name);\n  // returns undefined (no return statement)\n}",
        },
      ],
      quiz: {
        question: "What does a function return if it has no return statement?",
        options: ["null", "undefined", "0", "empty string"],
        correct: 1,
      },
    },
    "Object Creation": {
      steps: [
        {
          title: "Creating Objects",
          content: "Objects store data as key-value pairs. They can contain properties and methods.",
          hasVisualization: true,
          visualizationType: "objectCreation",
        },
        {
          title: "Object Creation Syntax",
          content:
            "// Object literal\nlet person = {\n  name: 'Alice',\n  age: 25,\n  city: 'New York'\n};\n\n// Constructor function\nfunction Person(name, age) {\n  this.name = name;\n  this.age = age;\n}",
        },
      ],
      quiz: {
        question: "How do you create an object with name and age properties?",
        options: [
          "let obj = {name: 'John', age: 30}",
          "let obj = [name: 'John', age: 30]",
          "let obj = (name: 'John', age: 30)",
          "let obj = name: 'John', age: 30",
        ],
        correct: 0,
      },
    },
    "Object Properties": {
      steps: [
        {
          title: "Accessing Object Properties",
          content: "Object properties can be accessed using dot notation or bracket notation.",
          hasVisualization: true,
          visualizationType: "objectProperties",
        },
        {
          title: "Property Access Examples",
          content:
            "let car = {brand: 'Toyota', model: 'Camry', year: 2020};\n\n// Dot notation\nconsole.log(car.brand); // 'Toyota'\n\n// Bracket notation\nconsole.log(car['model']); // 'Camry'\n\n// Adding new property\ncar.color = 'blue';",
        },
      ],
      quiz: {
        question: "Which are valid ways to access object properties?",
        options: [
          "obj.property only",
          "obj['property'] only",
          "Both obj.property and obj['property']",
          "obj->property",
        ],
        correct: 2,
      },
    },
    "Object Methods": {
      steps: [
        {
          title: "Object Methods",
          content:
            "Objects can contain functions as properties, called methods. Methods can access other properties using 'this'.",
          hasVisualization: true,
          visualizationType: "objectMethods",
        },
        {
          title: "Object Methods Example",
          content:
            "let calculator = {\n  value: 0,\n  add: function(num) {\n    this.value += num;\n    return this;\n  },\n  getValue: function() {\n    return this.value;\n  }\n};\n\ncalculator.add(5).add(3); // Method chaining",
        },
      ],
      quiz: {
        question: "What does 'this' refer to inside an object method?",
        options: ["The global object", "The function itself", "The object that owns the method", "undefined"],
        correct: 2,
      },
    },
    "If Statements": {
      steps: [
        {
          title: "Conditional Logic with If Statements",
          content: "If statements execute code based on whether a condition is true or false.",
          hasVisualization: true,
          visualizationType: "conditionalLogic",
        },
        {
          title: "If Statement Syntax",
          content:
            "if (condition) {\n  // code if condition is true\n} else if (anotherCondition) {\n  // code if another condition is true\n} else {\n  // code if all conditions are false\n}",
        },
      ],
      quiz: {
        question: "What happens if the condition in an if statement is false and there's no else?",
        options: [
          "Error occurs",
          "Code inside if block executes anyway",
          "Code inside if block is skipped",
          "Program stops",
        ],
        correct: 2,
      },
    },
    "Switch Cases": {
      steps: [
        {
          title: "Switch Statement",
          content: "Switch statements provide a way to execute different code blocks based on different values.",
          hasVisualization: true,
          visualizationType: "switchCases",
        },
        {
          title: "Switch Statement Syntax",
          content:
            "switch (expression) {\n  case value1:\n    // code for value1\n    break;\n  case value2:\n    // code for value2\n    break;\n  default:\n    // code if no cases match\n}",
        },
      ],
      quiz: {
        question: "What happens if you forget the 'break' statement in a switch case?",
        options: [
          "Error occurs",
          "Only that case executes",
          "Execution falls through to next case",
          "Switch statement stops",
        ],
        correct: 2,
      },
    },
    "Ternary Operators": {
      steps: [
        {
          title: "Ternary Operator",
          content: "The ternary operator is a shorthand way to write simple if-else statements in one line.",
          hasVisualization: true,
          visualizationType: "ternaryOperator",
        },
        {
          title: "Ternary Operator Syntax",
          content:
            "condition ? valueIfTrue : valueIfFalse\n\n// Example:\nlet age = 18;\nlet status = age >= 18 ? 'adult' : 'minor';\nconsole.log(status); // 'adult'\n\n// Equivalent if-else:\nlet status;\nif (age >= 18) {\n  status = 'adult';\n} else {\n  status = 'minor';\n}",
        },
      ],
      quiz: {
        question: "What does this expression return: 5 > 3 ? 'yes' : 'no'?",
        options: ["yes", "no", "true", "false"],
        correct: 0,
      },
    },
    "Base Case": {
      steps: [
        {
          title: "Recursion Base Case",
          content:
            "The base case is the condition that stops recursion. Without it, recursion would continue infinitely.",
          hasVisualization: true,
          visualizationType: "recursionStack",
        },
        {
          title: "Base Case Example",
          content:
            "function factorial(n) {\n  if (n <= 1) {\n    return 1; // Base case - stops recursion\n  }\n  return n * factorial(n - 1); // Recursive case\n}\n\nfactorial(5); // 5 * 4 * 3 * 2 * 1 = 120",
        },
      ],
      quiz: {
        question: "What happens if a recursive function has no base case?",
        options: ["It returns undefined", "It runs infinitely (stack overflow)", "It returns 0", "It works normally"],
        correct: 1,
      },
    },
    "Recursive Case": {
      steps: [
        {
          title: "Recursive Case",
          content:
            "The recursive case is where the function calls itself with modified parameters, moving toward the base case.",
          hasVisualization: true,
          visualizationType: "recursiveCase",
        },
        {
          title: "Recursive Case Example",
          content:
            "function countdown(n) {\n  if (n <= 0) {\n    console.log('Done!'); // Base case\n    return;\n  }\n  console.log(n);\n  countdown(n - 1); // Recursive case - calls itself with n-1\n}\n\ncountdown(3); // Prints: 3, 2, 1, Done!",
        },
      ],
      quiz: {
        question: "In recursion, what should the recursive case do?",
        options: [
          "Call itself with the same parameters",
          "Call itself with modified parameters closer to base case",
          "Never call itself",
          "Always return a value",
        ],
        correct: 1,
      },
    },
    "Stack Overflow": {
      steps: [
        {
          title: "Understanding Stack Overflow",
          content:
            "Stack overflow occurs when recursive calls exceed the call stack limit, usually due to missing or incorrect base cases.",
          hasVisualization: true,
          visualizationType: "stackOverflow",
        },
        {
          title: "Preventing Stack Overflow",
          content:
            "// This causes stack overflow - no base case:\nfunction badRecursion(n) {\n  return badRecursion(n + 1); // Never stops!\n}\n\n// This is safe - has proper base case:\nfunction goodRecursion(n) {\n  if (n <= 0) return 0; // Base case\n  return n + goodRecursion(n - 1); // Moves toward base case\n}",
        },
      ],
      quiz: {
        question: "How can you prevent stack overflow in recursion?",
        options: [
          "Use more parameters",
          "Ensure proper base case and progress toward it",
          "Use larger numbers",
          "Call the function faster",
        ],
        correct: 1,
      },
    },
  }

  // Coding challenges for each subconcept
  const codingChallenges = {
    "For Loop": {
      title: "Array Sum Calculator",
      description: "Write a function that uses a for loop to calculate the sum of all numbers in an array.",
      requirements: [
        "Create a function named 'calculateSum'",
        "Use a for loop to iterate through the array",
        "Return the total sum of all numbers",
      ],
      example: {
        input: [1, 2, 3, 4, 5],
        output: 15,
      },
      hint: "Initialize a sum variable to 0, then add each array element to it in the loop.",
      functionName: "calculateSum",
      starterCode: `function calculateSum(numbers) {
  // Your code here
  // Use a for loop to sum all numbers in the array
  
}`,
      testCases: [
        {
          description: "Sum of [1, 2, 3, 4, 5]",
          input: [[1, 2, 3, 4, 5]],
          expected: 15,
        },
        {
          description: "Sum of [10, 20, 30]",
          input: [[10, 20, 30]],
          expected: 60,
        },
        {
          description: "Sum of empty array",
          input: [[]],
          expected: 0,
        },
        {
          description: "Sum of single element [42]",
          input: [[42]],
          expected: 42,
        },
      ],
    },
    "While Loop": {
      title: "Number Guessing Counter",
      description:
        "Write a function that uses a while loop to count how many times you need to divide a number by 2 until it becomes 1 or less.",
      requirements: [
        "Create a function named 'countDivisions'",
        "Use a while loop to keep dividing by 2",
        "Count and return the number of divisions",
      ],
      example: {
        input: 8,
        output: 3,
      },
      hint: "Keep dividing the number by 2 while it's greater than 1, and count each division.",
      functionName: "countDivisions",
      starterCode: `function countDivisions(number) {
  // Your code here
  // Use a while loop to divide by 2 until number <= 1
  
}`,
      testCases: [
        {
          description: "Divisions for 8",
          input: [8],
          expected: 3,
        },
        {
          description: "Divisions for 16",
          input: [16],
          expected: 4,
        },
        {
          description: "Divisions for 1",
          input: [1],
          expected: 0,
        },
        {
          description: "Divisions for 7",
          input: [7],
          expected: 3,
        },
      ],
    },
    "Do-While Loop": {
      title: "Password Validator",
      description: "Write a function that uses a do-while loop to validate password attempts (simulated).",
      requirements: [
        "Create a function named 'validatePassword'",
        "Use a do-while loop to check attempts",
        "Return the number of attempts needed",
        "Stop when correct password is found",
      ],
      example: {
        input: ["wrong", "wrong", "correct"],
        output: 3,
      },
      hint: "Use do-while to ensure at least one attempt is made, then check if password is correct.",
      functionName: "validatePassword",
      starterCode: `function validatePassword(attempts) {
  // Your code here
  // Use a do-while loop to count attempts until 'correct' is found
  
}`,
      testCases: [
        {
          description: "Find 'correct' in 3 attempts",
          input: [["wrong", "wrong", "correct"]],
          expected: 3,
        },
        {
          description: "Find 'correct' in 1 attempt",
          input: [["correct"]],
          expected: 1,
        },
        {
          description: "Find 'correct' in 2 attempts",
          input: [["wrong", "correct"]],
          expected: 2,
        },
      ],
    },
    "Array Declaration": {
      title: "Array Builder",
      description: "Write a function that creates and returns an array with numbers from 1 to n.",
      requirements: [
        "Create a function named 'buildArray'",
        "Create an empty array",
        "Fill it with numbers from 1 to n",
        "Return the completed array",
      ],
      example: {
        input: 5,
        output: [1, 2, 3, 4, 5],
      },
      hint: "Start with an empty array and use a loop to push numbers from 1 to n.",
      functionName: "buildArray",
      starterCode: `function buildArray(n) {
  // Your code here
  // Create an array with numbers from 1 to n
  
}`,
      testCases: [
        {
          description: "Array from 1 to 5",
          input: [5],
          expected: [1, 2, 3, 4, 5],
        },
        {
          description: "Array from 1 to 3",
          input: [3],
          expected: [1, 2, 3],
        },
        {
          description: "Array from 1 to 1",
          input: [1],
          expected: [1],
        },
        {
          description: "Empty array for 0",
          input: [0],
          expected: [],
        },
      ],
    },
    "Array Access": {
      title: "Element Finder",
      description: "Write a function that safely accesses array elements and returns them or a default value.",
      requirements: [
        "Create a function named 'safeAccess'",
        "Take an array, index, and default value",
        "Return element at index or default if out of bounds",
      ],
      example: {
        input: [[1, 2, 3], 1, "not found"],
        output: 2,
      },
      hint: "Check if the index is valid before accessing the array element.",
      functionName: "safeAccess",
      starterCode: `function safeAccess(arr, index, defaultValue) {
  // Your code here
  // Return arr[index] if valid, otherwise return defaultValue
  
}`,
      testCases: [
        {
          description: "Valid index access",
          input: [[1, 2, 3], 1, "not found"],
          expected: 2,
        },
        {
          description: "Invalid index returns default",
          input: [[1, 2, 3], 5, "not found"],
          expected: "not found",
        },
        {
          description: "Negative index returns default",
          input: [[1, 2, 3], -1, "invalid"],
          expected: "invalid",
        },
      ],
    },
    "Array Methods": {
      title: "Array Manipulator",
      description: "Write a function that uses various array methods to transform an array.",
      requirements: [
        "Create a function named 'transformArray'",
        "Add element to end, remove from start",
        "Return the modified array",
      ],
      example: {
        input: [[1, 2, 3], 4],
        output: [2, 3, 4],
      },
      hint: "Use shift() to remove first element and push() to add to end.",
      functionName: "transformArray",
      starterCode: `function transformArray(arr, newElement) {
  // Your code here
  // Remove first element and add newElement to end
  
}`,
      testCases: [
        {
          description: "Transform [1,2,3] with 4",
          input: [[1, 2, 3], 4],
          expected: [2, 3, 4],
        },
        {
          description: "Transform [5] with 6",
          input: [[5], 6],
          expected: [6],
        },
      ],
    },
    "String Methods": {
      title: "Text Processor",
      description: "Write a function that processes text by making it uppercase and replacing spaces with underscores.",
      requirements: [
        "Create a function named 'processText'",
        "Convert the text to uppercase",
        "Replace all spaces with underscores",
        "Return the processed text",
      ],
      example: {
        input: "hello world",
        output: "HELLO_WORLD",
      },
      hint: "Use toUpperCase() method and replace() method with a space as the search parameter.",
      functionName: "processText",
      starterCode: `function processText(text) {
  // Your code here
  // Make uppercase and replace spaces with underscores
  
}`,
      testCases: [
        {
          description: "Process 'hello world'",
          input: ["hello world"],
          expected: "HELLO_WORLD",
        },
        {
          description: "Process 'JavaScript is fun'",
          input: ["JavaScript is fun"],
          expected: "JAVASCRIPT_IS_FUN",
        },
        {
          description: "Process single word 'coding'",
          input: ["coding"],
          expected: "CODING",
        },
        {
          description: "Process empty string",
          input: [""],
          expected: "",
        },
      ],
    },
    "String Manipulation": {
      title: "String Slicer",
      description: "Write a function that extracts and combines parts of strings.",
      requirements: [
        "Create a function named 'combineStrings'",
        "Take first 3 characters of first string",
        "Take last 3 characters of second string",
        "Combine them with a dash",
      ],
      example: {
        input: ["Hello", "World"],
        output: "Hel-rld",
      },
      hint: "Use slice() method to extract parts and concat or + to combine.",
      functionName: "combineStrings",
      starterCode: `function combineStrings(str1, str2) {
  // Your code here
  // Combine first 3 chars of str1 with last 3 chars of str2
  
}`,
      testCases: [
        {
          description: "Combine 'Hello' and 'World'",
          input: ["Hello", "World"],
          expected: "Hel-rld",
        },
        {
          description: "Combine 'JavaScript' and 'Programming'",
          input: ["JavaScript", "Programming"],
          expected: "Jav-ing",
        },
      ],
    },
    "String Comparison": {
      title: "String Sorter",
      description: "Write a function that sorts an array of strings alphabetically.",
      requirements: [
        "Create a function named 'sortStrings'",
        "Sort the array in alphabetical order",
        "Return the sorted array",
      ],
      example: {
        input: ["banana", "apple", "cherry"],
        output: ["apple", "banana", "cherry"],
      },
      hint: "Use the sort() method or implement comparison logic.",
      functionName: "sortStrings",
      starterCode: `function sortStrings(strings) {
  // Your code here
  // Sort the array of strings alphabetically
  
}`,
      testCases: [
        {
          description: "Sort fruits",
          input: [["banana", "apple", "cherry"]],
          expected: ["apple", "banana", "cherry"],
        },
        {
          description: "Sort names",
          input: [["John", "Alice", "Bob"]],
          expected: ["Alice", "Bob", "John"],
        },
      ],
    },
    "Bubble Sort": {
      title: "Simple Bubble Sort",
      description: "Implement the bubble sort algorithm to sort an array of numbers in ascending order.",
      requirements: [
        "Create a function named 'bubbleSort'",
        "Use nested loops to compare adjacent elements",
        "Swap elements if they're in wrong order",
        "Return the sorted array",
      ],
      example: {
        input: [64, 34, 25, 12, 22],
        output: [12, 22, 25, 34, 64],
      },
      hint: "Use two nested loops. The outer loop runs n-1 times, inner loop compares adjacent elements.",
      functionName: "bubbleSort",
      starterCode: `function bubbleSort(arr) {
  // Your code here
  // Implement bubble sort algorithm
  
}`,
      testCases: [
        {
          description: "Sort [64, 34, 25, 12, 22]",
          input: [[64, 34, 25, 12, 22]],
          expected: [12, 22, 25, 34, 64],
        },
        {
          description: "Sort [5, 2, 8, 1, 9]",
          input: [[5, 2, 8, 1, 9]],
          expected: [1, 2, 5, 8, 9],
        },
        {
          description: "Sort already sorted [1, 2, 3]",
          input: [[1, 2, 3]],
          expected: [1, 2, 3],
        },
        {
          description: "Sort single element [42]",
          input: [[42]],
          expected: [42],
        },
      ],
    },
    "Selection Sort": {
      title: "Selection Sort Implementation",
      description: "Implement selection sort to find minimum elements and place them in order.",
      requirements: [
        "Create a function named 'selectionSort'",
        "Find minimum element in unsorted portion",
        "Swap with first unsorted element",
        "Return sorted array",
      ],
      example: {
        input: [64, 25, 12, 22, 11],
        output: [11, 12, 22, 25, 64],
      },
      hint: "For each position, find the minimum element in remaining array and swap.",
      functionName: "selectionSort",
      starterCode: `function selectionSort(arr) {
  // Your code here
  // Implement selection sort algorithm
  
}`,
      testCases: [
        {
          description: "Sort [64, 25, 12, 22, 11]",
          input: [[64, 25, 12, 22, 11]],
          expected: [11, 12, 22, 25, 64],
        },
        {
          description: "Sort [3, 1, 4, 1, 5]",
          input: [[3, 1, 4, 1, 5]],
          expected: [1, 1, 3, 4, 5],
        },
      ],
    },
    "Quick Sort": {
      title: "Quick Sort Challenge",
      description: "Implement a simplified version of quick sort algorithm.",
      requirements: [
        "Create a function named 'quickSort'",
        "Choose last element as pivot",
        "Partition array around pivot",
        "Return sorted array",
      ],
      example: {
        input: [3, 6, 8, 10, 1, 2, 1],
        output: [1, 1, 2, 3, 6, 8, 10],
      },
      hint: "Use recursion and partition the array into elements less than and greater than pivot.",
      functionName: "quickSort",
      starterCode: `function quickSort(arr) {
  // Your code here
  // Implement quick sort algorithm
  
}`,
      testCases: [
        {
          description: "Sort [3, 6, 8, 10, 1, 2, 1]",
          input: [[3, 6, 8, 10, 1, 2, 1]],
          expected: [1, 1, 2, 3, 6, 8, 10],
        },
      ],
    },
    "Linear Search": {
      title: "Find the Index",
      description: "Write a function that searches for a target value in an array and returns its index.",
      requirements: [
        "Create a function named 'findIndex'",
        "Search through the array linearly",
        "Return the index if found, -1 if not found",
        "Use a loop to check each element",
      ],
      example: {
        input: [[1, 3, 5, 7, 9], 5],
        output: 2,
      },
      hint: "Loop through the array and compare each element with the target. Return the index when found.",
      functionName: "findIndex",
      starterCode: `function findIndex(arr, target) {
  // Your code here
  // Search for target and return its index
  
}`,
      testCases: [
        {
          description: "Find 5 in [1, 3, 5, 7, 9]",
          input: [[1, 3, 5, 7, 9], 5],
          expected: 2,
        },
        {
          description: "Find 1 in [1, 3, 5, 7, 9]",
          input: [[1, 3, 5, 7, 9], 1],
          expected: 0,
        },
        {
          description: "Find 10 in [1, 3, 5, 7, 9] (not found)",
          input: [[1, 3, 5, 7, 9], 10],
          expected: -1,
        },
        {
          description: "Find in empty array",
          input: [[], 5],
          expected: -1,
        },
      ],
    },
    "Binary Search": {
      title: "Binary Search Implementation",
      description: "Implement binary search on a sorted array.",
      requirements: [
        "Create a function named 'binarySearch'",
        "Use divide and conquer approach",
        "Compare with middle element",
        "Return index if found, -1 if not found",
      ],
      example: {
        input: [[1, 3, 5, 7, 9, 11], 7],
        output: 3,
      },
      hint: "Keep track of left and right boundaries, compare target with middle element.",
      functionName: "binarySearch",
      starterCode: `function binarySearch(arr, target) {
  // Your code here
  // Implement binary search algorithm
  
}`,
      testCases: [
        {
          description: "Find 7 in sorted array",
          input: [[1, 3, 5, 7, 9, 11], 7],
          expected: 3,
        },
        {
          description: "Find 1 in sorted array",
          input: [[1, 3, 5, 7, 9, 11], 1],
          expected: 0,
        },
        {
          description: "Target not found",
          input: [[1, 3, 5, 7, 9, 11], 4],
          expected: -1,
        },
      ],
    },
    "Hash Search": {
      title: "Hash Table Lookup",
      description: "Create a simple hash table and implement search functionality.",
      requirements: [
        "Create a function named 'hashSearch'",
        "Convert array to hash table (object)",
        "Search for target in O(1) time",
        "Return true if found, false otherwise",
      ],
      example: {
        input: [[1, 2, 3, 4, 5], 3],
        output: true,
      },
      hint: "Create an object where array values are keys, then check if target exists.",
      functionName: "hashSearch",
      starterCode: `function hashSearch(arr, target) {
  // Your code here
  // Create hash table and search for target
  
}`,
      testCases: [
        {
          description: "Find 3 in [1, 2, 3, 4, 5]",
          input: [[1, 2, 3, 4, 5], 3],
          expected: true,
        },
        {
          description: "Find 6 in [1, 2, 3, 4, 5]",
          input: [[1, 2, 3, 4, 5], 6],
          expected: false,
        },
      ],
    },
    "Function Declaration": {
      title: "Calculator Functions",
      description: "Write a function that takes two numbers and an operation, then returns the result.",
      requirements: [
        "Create a function named 'calculate'",
        "Accept three parameters: num1, num2, operation",
        "Support operations: 'add', 'subtract', 'multiply', 'divide'",
        "Return the calculated result",
      ],
      example: {
        input: [10, 5, "add"],
        output: 15,
      },
      hint: "Use if-else statements or switch case to handle different operations.",
      functionName: "calculate",
      starterCode: `function calculate(num1, num2, operation) {
  // Your code here
  // Perform the specified operation on the two numbers
  
}`,
      testCases: [
        {
          description: "Add 10 + 5",
          input: [10, 5, "add"],
          expected: 15,
        },
        {
          description: "Subtract 10 - 5",
          input: [10, 5, "subtract"],
          expected: 5,
        },
        {
          description: "Multiply 10 * 5",
          input: [10, 5, "multiply"],
          expected: 50,
        },
        {
          description: "Divide 10 / 5",
          input: [10, 5, "divide"],
          expected: 2,
        },
      ],
    },
    "Parameters & Arguments": {
      title: "Parameter Counter",
      description: "Write a function that counts and returns information about its parameters.",
      requirements: [
        "Create a function named 'analyzeParameters'",
        "Accept any number of parameters using rest syntax",
        "Return object with count and types of parameters",
      ],
      example: {
        input: [1, "hello", true],
        output: { count: 3, types: ["number", "string", "boolean"] },
      },
      hint: "Use rest parameters (...args) and typeof operator.",
      functionName: "analyzeParameters",
      starterCode: `function analyzeParameters(...args) {
  // Your code here
  // Return object with count and types of all parameters
  
}`,
      testCases: [
        {
          description: "Analyze [1, 'hello', true]",
          input: [1, "hello", true],
          expected: { count: 3, types: ["number", "string", "boolean"] },
        },
        {
          description: "Analyze [42]",
          input: [42],
          expected: { count: 1, types: ["number"] },
        },
      ],
    },
    "Return Values": {
      title: "Multi-Return Function",
      description: "Write a function that returns different types of values based on input.",
      requirements: [
        "Create a function named 'processInput'",
        "Return number if input is number",
        "Return uppercase string if input is string",
        "Return null for other types",
      ],
      example: {
        input: "hello",
        output: "HELLO",
      },
      hint: "Use typeof to check input type and return appropriate value.",
      functionName: "processInput",
      starterCode: `function processInput(input) {
  // Your code here
  // Return processed value based on input type
  
}`,
      testCases: [
        {
          description: "Process string 'hello'",
          input: ["hello"],
          expected: "HELLO",
        },
        {
          description: "Process number 42",
          input: [42],
          expected: 42,
        },
        {
          description: "Process boolean true",
          input: [true],
          expected: null,
        },
      ],
    },
    "Object Creation": {
      title: "Person Object Builder",
      description: "Write a function that creates and returns a person object with given properties.",
      requirements: [
        "Create a function named 'createPerson'",
        "Accept name, age, and city parameters",
        "Return an object with these properties",
        "Add a method 'introduce' that returns a greeting",
      ],
      example: {
        input: ["Alice", 25, "New York"],
        output: { name: "Alice", age: 25, city: "New York" },
      },
      hint: "Create an object literal with the given properties and a method.",
      functionName: "createPerson",
      starterCode: `function createPerson(name, age, city) {
  // Your code here
  // Create and return a person object
  
}`,
      testCases: [
        {
          description: "Create person Alice",
          input: ["Alice", 25, "New York"],
          expected: { name: "Alice", age: 25, city: "New York" },
        },
        {
          description: "Create person Bob",
          input: ["Bob", 30, "London"],
          expected: { name: "Bob", age: 30, city: "London" },
        },
        {
          description: "Create person with empty name",
          input: ["", 20, "Paris"],
          expected: { name: "", age: 20, city: "Paris" },
        },
      ],
    },
    "Object Properties": {
      title: "Property Manager",
      description: "Write a function that manages object properties dynamically.",
      requirements: [
        "Create a function named 'manageProperties'",
        "Take an object and property name",
        "Return object with property count and property exists check",
      ],
      example: {
        input: [{ name: "John", age: 30 }, "name"],
        output: { propertyCount: 2, hasProperty: true },
      },
      hint: "Use Object.keys() to count properties and 'in' operator to check existence.",
      functionName: "manageProperties",
      starterCode: `function manageProperties(obj, propertyName) {
  // Your code here
  // Return info about object properties
  
}`,
      testCases: [
        {
          description: "Check existing property",
          input: [{ name: "John", age: 30 }, "name"],
          expected: { propertyCount: 2, hasProperty: true },
        },
        {
          description: "Check non-existing property",
          input: [{ name: "John", age: 30 }, "city"],
          expected: { propertyCount: 2, hasProperty: false },
        },
      ],
    },
    "Object Methods": {
      title: "Calculator Object",
      description: "Create an object with methods for basic arithmetic operations.",
      requirements: [
        "Create a function named 'createCalculator'",
        "Return object with add, subtract, multiply, divide methods",
        "Each method should take two parameters",
      ],
      example: {
        input: [],
        output: "Object with arithmetic methods",
      },
      hint: "Return an object literal with method properties.",
      functionName: "createCalculator",
      starterCode: `function createCalculator() {
  // Your code here
  // Return calculator object with methods
  
}`,
      testCases: [
        {
          description: "Calculator has add method",
          input: [],
          expected: "function",
        },
      ],
    },
    "If Statements": {
      title: "Grade Calculator",
      description: "Write a function that converts a numeric score to a letter grade.",
      requirements: [
        "Create a function named 'getGrade'",
        "Use if-else statements for grade ranges",
        "A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60",
        "Return the appropriate letter grade",
      ],
      example: {
        input: 85,
        output: "B",
      },
      hint: "Use if-else if statements to check score ranges from highest to lowest.",
      functionName: "getGrade",
      starterCode: `function getGrade(score) {
  // Your code here
  // Convert numeric score to letter grade
  
}`,
      testCases: [
        {
          description: "Score 95 should be A",
          input: [95],
          expected: "A",
        },
        {
          description: "Score 85 should be B",
          input: [85],
          expected: "B",
        },
        {
          description: "Score 75 should be C",
          input: [75],
          expected: "C",
        },
        {
          description: "Score 65 should be D",
          input: [65],
          expected: "D",
        },
        {
          description: "Score 45 should be F",
          input: [45],
          expected: "F",
        },
      ],
    },
    "Switch Cases": {
      title: "Day of Week Converter",
      description: "Write a function that converts day numbers to day names using switch statement.",
      requirements: [
        "Create a function named 'getDayName'",
        "Use switch statement for day conversion",
        "1=Monday, 2=Tuesday, etc., 7=Sunday",
        "Return 'Invalid day' for other numbers",
      ],
      example: {
        input: 3,
        output: "Wednesday",
      },
      hint: "Use switch statement with cases 1-7 and a default case.",
      functionName: "getDayName",
      starterCode: `function getDayName(dayNumber) {
  // Your code here
  // Convert day number to day name using switch
  
}`,
      testCases: [
        {
          description: "Day 1 is Monday",
          input: [1],
          expected: "Monday",
        },
        {
          description: "Day 3 is Wednesday",
          input: [3],
          expected: "Wednesday",
        },
        {
          description: "Day 7 is Sunday",
          input: [7],
          expected: "Sunday",
        },
        {
          description: "Day 8 is invalid",
          input: [8],
          expected: "Invalid day",
        },
      ],
    },
    "Ternary Operators": {
      title: "Status Checker",
      description: "Write a function that uses ternary operators to determine status based on conditions.",
      requirements: [
        "Create a function named 'checkStatus'",
        "Use ternary operator for age check",
        "Return 'adult' if age >= 18, 'minor' otherwise",
        "Use nested ternary for additional logic",
      ],
      example: {
        input: 20,
        output: "adult",
      },
      hint: "Use condition ? valueIfTrue : valueIfFalse syntax.",
      functionName: "checkStatus",
      starterCode: `function checkStatus(age) {
  // Your code here
  // Use ternary operator to check age status
  
}`,
      testCases: [
        {
          description: "Age 20 is adult",
          input: [20],
          expected: "adult",
        },
        {
          description: "Age 16 is minor",
          input: [16],
          expected: "minor",
        },
        {
          description: "Age 18 is adult",
          input: [18],
          expected: "adult",
        },
      ],
    },
    "Base Case": {
      title: "Factorial with Base Case",
      description: "Write a recursive factorial function with proper base case.",
      requirements: [
        "Create a function named 'factorial'",
        "Use recursion with base case",
        "Base case: return 1 when n <= 1",
        "Recursive case: return n * factorial(n-1)",
      ],
      example: {
        input: 5,
        output: 120,
      },
      hint: "Always check for base case first to prevent infinite recursion.",
      functionName: "factorial",
      starterCode: `function factorial(n) {
  // Your code here
  // Implement factorial with proper base case
  
}`,
      testCases: [
        {
          description: "Factorial of 5",
          input: [5],
          expected: 120,
        },
        {
          description: "Factorial of 0",
          input: [0],
          expected: 1,
        },
        {
          description: "Factorial of 1",
          input: [1],
          expected: 1,
        },
        {
          description: "Factorial of 4",
          input: [4],
          expected: 24,
        },
      ],
    },
    "Recursive Case": {
      title: "Countdown Function",
      description: "Write a recursive countdown function that builds a string.",
      requirements: [
        "Create a function named 'countdown'",
        "Use recursion to count down from n to 1",
        "Return string with numbers separated by spaces",
        "Base case: return '1' when n <= 1",
      ],
      example: {
        input: 5,
        output: "5 4 3 2 1",
      },
      hint: "Combine current number with recursive call result.",
      functionName: "countdown",
      starterCode: `function countdown(n) {
  // Your code here
  // Create countdown string using recursion
  
}`,
      testCases: [
        {
          description: "Countdown from 5",
          input: [5],
          expected: "5 4 3 2 1",
        },
        {
          description: "Countdown from 3",
          input: [3],
          expected: "3 2 1",
        },
        {
          description: "Countdown from 1",
          input: [1],
          expected: "1",
        },
      ],
    },
    "Stack Overflow": {
      title: "Safe Recursion",
      description: "Write a recursive function with depth limit to prevent stack overflow.",
      requirements: [
        "Create a function named 'safeRecursion'",
        "Add depth parameter with default value",
        "Return 'max depth reached' if depth > 100",
        "Otherwise continue recursion",
      ],
      example: {
        input: [5, 0],
        output: "completed at depth 5",
      },
      hint: "Always include a depth check to prevent infinite recursion.",
      functionName: "safeRecursion",
      starterCode: `function safeRecursion(n, depth = 0) {
  // Your code here
  // Implement safe recursion with depth limit
  
}`,
      testCases: [
        {
          description: "Safe recursion with small depth",
          input: [5, 0],
          expected: "completed at depth 5",
        },
        {
          description: "Prevent stack overflow",
          input: [200, 0],
          expected: "max depth reached",
        },
      ],
    },
  }

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
          <Button variant="outline" onClick={onBack} className="mb-6 bg-white/10 text-white border-white/20">
            ← Back
          </Button>

          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Quiz Time! 🧠</h2>

              <div className="mb-6">
                <pre className="bg-gray-800 p-4 rounded-lg text-green-400 text-sm overflow-x-auto mb-4">
                  {content.quiz.question}
                </pre>
              </div>

              <div className="grid gap-3">
                {content.quiz.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`p-4 text-left justify-start h-auto ${
                      selectedAnswer === index
                        ? index === content.quiz.correct
                          ? "bg-green-500/20 border-green-500 text-green-300"
                          : "bg-red-500/20 border-red-500 text-red-300"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                    onClick={() => handleQuizAnswer(index)}
                    disabled={selectedAnswer !== null}
                  >
                    {option}
                  </Button>
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
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={onBack} className="mb-6 bg-white/10 text-white border-white/20">
          ← Back
        </Button>

        <div className="mb-6">
          <Progress value={((currentStep + 1) / content.steps.length) * 100} className="h-2" />
          <p className="text-blue-200 text-sm mt-2">
            Step {currentStep + 1} of {content.steps.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Panel */}
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">{content.steps[currentStep].title}</h2>

              <div className="text-blue-100 mb-8 whitespace-pre-line leading-relaxed">
                {content.steps[currentStep].content}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="bg-white/10 text-white border-white/20"
                >
                  Previous
                </Button>

                <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {currentStep === content.steps.length - 1 ? "Take Quiz" : "Next"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visualization Panel */}
          {content.steps[currentStep].hasVisualization && (
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">Visual Demo</h3>
                <VisualizationComponent type={content.steps[currentStep].visualizationType} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function VisualizationComponent({ type }: { type?: string }) {
  switch (type) {
    case "forLoop":
      return <ForLoopVisualization />
    case "interactiveForLoop":
      return <InteractiveForLoop />
    case "whileLoop":
      return <WhileLoopVisualization />
    case "doWhileLoop":
      return <DoWhileLoopVisualization />
    case "arrayCreation":
      return <ArrayCreationVisualization />
    case "arrayAccess":
      return <ArrayAccessVisualization />
    case "arrayMethods":
      return <ArrayMethodsVisualization />
    case "bubbleSort":
      return <BubbleSortVisualization />
    case "selectionSort":
      return <SelectionSortVisualization />
    case "quickSort":
      return <QuickSortVisualization />
    case "linearSearch":
      return <LinearSearchVisualization />
    case "binarySearch":
      return <BinarySearchVisualization />
    case "hashSearch":
      return <HashSearchVisualization />
    case "stringMethods":
      return <StringMethodsVisualization />
    case "stringManipulation":
      return <StringManipulationVisualization />
    case "stringComparison":
      return <StringComparisonVisualization />
    case "functionExecution":
      return <FunctionVisualization />
    case "parametersArguments":
      return <ParametersArgumentsVisualization />
    case "returnValues":
      return <ReturnValuesVisualization />
    case "objectCreation":
      return <ObjectVisualization />
    case "objectProperties":
      return <ObjectPropertiesVisualization />
    case "objectMethods":
      return <ObjectMethodsVisualization />
    case "conditionalLogic":
      return <ConditionalVisualization />
    case "switchCases":
      return <SwitchCasesVisualization />
    case "ternaryOperator":
      return <TernaryOperatorVisualization />
    case "recursionStack":
      return <RecursionVisualization />
    case "recursiveCase":
      return <RecursiveCaseVisualization />
    case "stackOverflow":
      return <StackOverflowVisualization />
    default:
      return <div className="text-white">Visualization coming soon!</div>
  }
}

/* ------------------------------------------------------------------ */
/* 🔧  Placeholder visual-demo components                            */
/* ------------------------------------------------------------------ */
function ConditionalVisualization() {
  return <div className="text-white">Conditional visualisation coming soon!</div>
}
function FunctionVisualization() {
  return <div className="text-white">Function execution demo coming soon!</div>
}
function ParametersArgumentsVisualization() {
  return <div className="text-white">Parameters &amp; arguments demo coming soon!</div>
}
function ReturnValuesVisualization() {
  return <div className="text-white">Return-values demo coming soon!</div>
}
function ObjectVisualization() {
  return <div className="text-white">Object creation/properties demo coming soon!</div>
}
function ObjectPropertiesVisualization() {
  return <div className="text-white">Object-properties demo coming soon!</div>
}
function ObjectMethodsVisualization() {
  return <div className="text-white">Object-methods demo coming soon!</div>
}
function SwitchCasesVisualization() {
  return <div className="text-white">Switch-cases visualisation coming soon!</div>
}
function TernaryOperatorVisualization() {
  return <div className="text-white">Ternary-operator demo coming soon!</div>
}
function RecursionVisualization() {
  return <div className="text-white">Recursion stack demo coming soon!</div>
}
function RecursiveCaseVisualization() {
  return <div className="text-white">Recursive-case demo coming soon!</div>
}
function StackOverflowVisualization() {
  return <div className="text-white">Stack-overflow demo coming soon!</div>
}
function HashSearchVisualization() {
  return <div className="text-white">Hash-search demo coming soon!</div>
}

function CodingGame({ challenge, onComplete, onBack }) {
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
        <Button variant="outline" onClick={onBack} className="mb-6 bg-white/10 text-white border-white/20">
          ← Back to Learning
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Challenge Description */}
          <div className="space-y-4">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
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
                  <Button
                    onClick={() => setShowHint(!showHint)}
                    variant="outline"
                    className="bg-yellow-600/20 text-yellow-300 border-yellow-600/50"
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>

                {showHint && (
                  <div className="mt-3 p-3 bg-yellow-500/20 border border-yellow-500 rounded">
                    <div className="text-yellow-200 text-sm">
                      💡 <strong>Hint:</strong> {challenge.hint}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Results */}
            {testResults.length > 0 && (
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Test Results</h3>
                  <div className="space-y-2">
                    {testResults.map((result) => (
                      <div
                        key={result.index}
                        className={`p-3 rounded border ${
                          result.passed ? "border-green-500 bg-green-500/20" : "border-red-500 bg-red-500/20"
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
                    <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded text-center">
                      <div className="text-green-300 text-xl font-bold">🎉 All tests passed! Great job!</div>
                      <div className="text-green-200 text-sm mt-1">Challenge completed successfully!</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Code Editor */}
          <div className="space-y-4">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">Code Editor</h3>
                  <div className="space-x-2">
                    <Button
                      onClick={runCode}
                      disabled={isRunning}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isRunning ? "Running..." : "▶️ Run Code"}
                    </Button>
                    <Button
                      onClick={resetCode}
                      variant="outline"
                      className="bg-gray-600/20 text-gray-300 border-gray-600"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-64 bg-gray-900 text-white p-4 rounded border border-gray-600 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                  placeholder="Write your code here..."
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Output Console */}
            {output && (
              <Card className="bg-black border-gray-600">
                <CardContent className="p-4">
                  <h4 className="text-white font-semibold mb-2">Console Output:</h4>
                  <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">{output}</pre>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// All visualization components
function ForLoopVisualization() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const animals = ["🐵", "🐸", "🐨", "🦁", "🐯"]

  const startAnimation = () => {
    setIsPlaying(true)
    setCurrentIndex(0)

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= animals.length - 1) {
          clearInterval(interval)
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button onClick={startAnimation} disabled={isPlaying} className="bg-green-600 hover:bg-green-700">
          {isPlaying ? "Running..." : "▶️ Start For Loop"}
        </Button>
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">{"for (let i = 0; i < animals.length; i++) {"}</div>
        <div className={`ml-4 ${isPlaying ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log(animals[i]); // Currently: animals["}
          <span className="text-green-400">{currentIndex}</span>
          {"]"}
        </div>
        <div className="text-gray-400">{"}"}</div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center space-x-2">
        {animals.map((animal, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-lg transition-all duration-500 ${
              index === currentIndex && isPlaying
                ? "border-yellow-400 bg-yellow-400/20 scale-110"
                : "border-gray-400 bg-gray-700"
            }`}
          >
            {animal}
          </div>
        ))}
      </div>

      {/* Loop Counter */}
      <div className="text-center">
        <div className="text-white text-lg">
          Loop Counter: <span className="text-green-400 font-bold">i = {currentIndex}</span>
        </div>
        <div className="text-blue-300">
          Condition: i {"<"} {animals.length} = {currentIndex < animals.length ? "✅ True" : "❌ False"}
        </div>
      </div>

      {/* Output */}
      {isPlaying && (
        <div className="bg-black p-4 rounded-lg">
          <div className="text-green-400 font-mono">Output:</div>
          {animals.slice(0, currentIndex + 1).map((animal, index) => (
            <div key={index} className="text-white font-mono">
              {animal} (index: {index})
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function InteractiveForLoop() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const items = ["⚽", "🏀", "🎾", "🏈", "🎱"]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Click to step through the loop!</h4>
        <div className="flex justify-center space-x-2 mb-4">
          <Button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="bg-red-600 hover:bg-red-700"
          >
            ← Previous
          </Button>
          <Button
            onClick={() => setCurrentIndex(Math.min(items.length - 1, currentIndex + 1))}
            disabled={currentIndex === items.length - 1}
            className="bg-green-600 hover:bg-green-700"
          >
            Next →
          </Button>
          <Button onClick={() => setCurrentIndex(0)} className="bg-blue-600 hover:bg-blue-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Interactive Array */}
      <div className="flex justify-center space-x-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-lg cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? "border-yellow-400 bg-yellow-400/20 scale-110 animate-pulse"
                : index < currentIndex
                  ? "border-green-400 bg-green-400/20"
                  : "border-gray-400 bg-gray-700"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Current State */}
      <div className="text-center space-y-2">
        <div className="text-white text-lg">
          Current Index: <span className="text-yellow-400 font-bold">{currentIndex}</span>
        </div>
        <div className="text-blue-300">
          Current Item: <span className="text-2xl">{items[currentIndex]}</span>
        </div>
        <div className="text-green-300">
          Progress: {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  )
}

function WhileLoopVisualization() {
  const [isRunning, setIsRunning] = useState(false)
  const [counter, setCounter] = useState(0)
  const [condition, setCondition] = useState(true)
  const maxCount = 5

  const startWhileLoop = () => {
    setIsRunning(true)
    setCounter(0)
    setCondition(true)

    const interval = setInterval(() => {
      setCounter((prev) => {
        const newCount = prev + 1
        if (newCount >= maxCount) {
          setCondition(false)
          setIsRunning(false)
          clearInterval(interval)
        }
        return newCount
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button onClick={startWhileLoop} disabled={isRunning} className="bg-purple-600 hover:bg-purple-700">
          {isRunning ? "Running..." : "▶️ Start While Loop"}
        </Button>
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let count = 0;</div>
        <div className="text-gray-400">
          while (count {"<"} {maxCount}) {"{"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log('Count:', count);"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>{"  count++;"}</div>
        <div className="text-gray-400">{"}"}</div>
      </div>

      {/* Condition Check */}
      <div className="text-center p-4 border-2 border-dashed border-blue-400 rounded-lg">
        <div className="text-white text-lg mb-2">Condition Check:</div>
        <div className="text-xl">
          count {"<"} {maxCount} = {counter} {"<"} {maxCount} ={" "}
          <span className={condition ? "text-green-400" : "text-red-400"}>
            {condition ? "✅ True (Continue)" : "❌ False (Stop)"}
          </span>
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow-400 mb-2">{counter}</div>
        <div className="text-white">Current Count</div>
      </div>

      {/* Visual Progress */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: maxCount }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
              index < counter ? "bg-green-500 border-green-500 text-white" : "border-gray-400 bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

function DoWhileLoopVisualization() {
  const [isRunning, setIsRunning] = useState(false)
  const [counter, setCounter] = useState(0)
  const [condition, setCondition] = useState(true)
  const [executionCount, setExecutionCount] = useState(0)
  const maxCount = 3

  const startDoWhileLoop = () => {
    setIsRunning(true)
    setCounter(0)
    setCondition(true)
    setExecutionCount(0)

    const interval = setInterval(() => {
      setExecutionCount((prev) => {
        const newCount = prev + 1
        setCounter(newCount)

        if (newCount >= maxCount) {
          setCondition(false)
          setIsRunning(false)
          clearInterval(interval)
        }
        return newCount
      })
    }, 1500)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <Button onClick={startDoWhileLoop} disabled={isRunning} className="bg-purple-600 hover:bg-purple-700">
          {isRunning ? "Running..." : "▶️ Start Do-While Loop"}
        </Button>
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let count = 0;</div>
        <div className="text-blue-400">do {"{"}</div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>
          {"  console.log('Executed:', count);"}
        </div>
        <div className={`ml-4 ${isRunning ? "text-yellow-400" : "text-gray-300"}`}>{"  count++;"}</div>
        <div className="text-blue-400">{"} while (count < " + maxCount + ");"}</div>
      </div>

      {/* Execution Flow */}
      <div className="space-y-3">
        <div className="text-center p-4 border-2 border-dashed border-green-400 rounded-lg">
          <div className="text-white text-lg mb-2">Do Block (Executes First):</div>
          <div className="text-green-300">✅ Always runs at least once, regardless of condition</div>
        </div>

        <div className="text-center p-4 border-2 border-dashed border-blue-400 rounded-lg">
          <div className="text-white text-lg mb-2">While Condition Check:</div>
          <div className="text-xl">
            count {"<"} {maxCount} = {counter} {"<"} {maxCount} ={" "}
            <span className={condition ? "text-green-400" : "text-red-400"}>
              {condition ? "✅ True (Continue)" : "❌ False (Stop)"}
            </span>
          </div>
        </div>
      </div>

      {/* Counter Display */}
      <div className="text-center">
        <div className="text-4xl font-bold text-yellow-400 mb-2">{counter}</div>
        <div className="text-white">Execution Count</div>
        <div className="text-blue-300 mt-2">
          {executionCount > 0 && `Executed ${executionCount} time${executionCount > 1 ? "s" : ""}`}
        </div>
      </div>

      {/* Visual Progress */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: maxCount + 1 }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
              index < executionCount
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-400 bg-gray-700 text-gray-400"
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Key Difference Highlight */}
      <div className="bg-yellow-500/20 border border-yellow-500 rounded p-4">
        <div className="text-yellow-200 font-semibold mb-2">Key Difference:</div>
        <div className="text-yellow-100 text-sm">
          • <strong>While Loop:</strong> Checks condition BEFORE executing
          <br />• <strong>Do-While Loop:</strong> Executes FIRST, then checks condition
          <br />• <strong>Result:</strong> Do-while always runs at least once!
        </div>
      </div>
    </div>
  )
}

function ArrayCreationVisualization() {
  const [step, setStep] = useState(0)
  const [currentArray, setCurrentArray] = useState([])
  const items = ["🍎", "🍌", "🍊", "🍇", "🥝"]

  const nextStep = () => {
    if (step < items.length) {
      setCurrentArray((prev) => [...prev, items[step]])
      setStep(step + 1)
    }
  }

  const reset = () => {
    setStep(0)
    setCurrentArray([])
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={nextStep} disabled={step >= items.length} className="bg-green-600 hover:bg-green-700">
            Add Item
          </Button>
          <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let fruits = [];</div>
        {currentArray.map((item, index) => (
          <div key={index} className="text-green-400">
            fruits[{index}] = '{item}';
          </div>
        ))}
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-center space-x-2">
        <span className="text-white font-mono">[</span>
        {currentArray.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center text-2xl border-2 border-blue-400 rounded bg-blue-400/20 animate-pulse">
              {item}
            </div>
            {index < currentArray.length - 1 && <span className="text-white mx-1">,</span>}
          </div>
        ))}
        {currentArray.length === 0 && <span className="text-gray-400 italic">empty</span>}
        <span className="text-white font-mono">]</span>
      </div>

      {/* Array Info */}
      <div className="text-center">
        <div className="text-white">
          Array Length: <span className="text-yellow-400 font-bold">{currentArray.length}</span>
        </div>
        <div className="text-blue-300">
          Next Item: {step < items.length ? <span className="text-2xl">{items[step]}</span> : "Array Complete! 🎉"}
        </div>
      </div>
    </div>
  )
}

function ArrayAccessVisualization() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [inputIndex, setInputIndex] = useState("")
  const [accessResult, setAccessResult] = useState("")
  const fruits = ["🍎", "🍌", "🍊", "🍇", "🥝", "🍓"]

  const accessElement = () => {
    const index = Number.parseInt(inputIndex)
    if (isNaN(index)) {
      setAccessResult("Please enter a valid number")
      return
    }

    if (index >= 0 && index < fruits.length) {
      setSelectedIndex(index)
      setAccessResult(`fruits[${index}] = ${fruits[index]}`)
    } else {
      setSelectedIndex(-1)
      setAccessResult(`fruits[${index}] = undefined (index out of bounds)`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Array Index Access</h4>

        <div className="mb-4 space-x-2">
          <input
            type="number"
            placeholder="Enter index (0-5)"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-32"
          />
          <Button onClick={accessElement} className="bg-blue-600 hover:bg-blue-700">
            Access Element
          </Button>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="space-y-4">
        {/* Index Numbers */}
        <div className="flex justify-center space-x-2">
          {fruits.map((_, index) => (
            <div
              key={index}
              className={`w-16 h-8 flex items-center justify-center text-sm font-bold rounded-t border-2 ${
                index === selectedIndex
                  ? "border-yellow-400 bg-yellow-400/20 text-yellow-300"
                  : "border-gray-400 bg-gray-700 text-gray-300"
              }`}
            >
              {index}
            </div>
          ))}
        </div>

        {/* Array Elements */}
        <div className="flex justify-center space-x-2">
          {fruits.map((fruit, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-b cursor-pointer transition-all duration-300 ${
                index === selectedIndex
                  ? "border-yellow-400 bg-yellow-400/20 scale-110 animate-pulse"
                  : "border-blue-400 bg-blue-400/20 hover:scale-105"
              }`}
              onClick={() => {
                setSelectedIndex(index)
                setInputIndex(index.toString())
                setAccessResult(`fruits[${index}] = ${fruit}`)
              }}
            >
              {fruit}
            </div>
          ))}
        </div>

        {/* Index Labels */}
        <div className="flex justify-center space-x-2">
          {fruits.map((_, index) => (
            <div key={index} className="w-16 text-center text-xs text-gray-400">
              Index {index}
            </div>
          ))}
        </div>
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let fruits = [{fruits.map((f) => `'${f}'`).join(", ")}];</div>
        <div className="text-green-400">console.log(fruits.length); // {fruits.length}</div>
        {accessResult && (
          <div className="text-blue-300 mt-2">
            console.log({accessResult.split(" = ")[0]}); // {accessResult.split(" = ")[1]}
          </div>
        )}
      </div>

      {/* Result Display */}
      {accessResult && (
        <div className="text-center">
          <div
            className={`p-4 rounded border text-lg font-bold ${
              accessResult.includes("undefined")
                ? "border-red-500 bg-red-500/20 text-red-300"
                : "border-green-500 bg-green-500/20 text-green-300"
            }`}
          >
            {accessResult}
          </div>
        </div>
      )}

      {/* Array Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Array Length</div>
          <div className="text-blue-300 text-lg">{fruits.length}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">First Element</div>
          <div className="text-green-300 text-lg">fruits[0] = {fruits[0]}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Last Element</div>
          <div className="text-yellow-300 text-lg">
            fruits[{fruits.length - 1}] = {fruits[fruits.length - 1]}
          </div>
        </div>
      </div>

      {/* Zero-Based Indexing Explanation */}
      <div className="bg-blue-500/20 border border-blue-500 rounded p-4">
        <div className="text-blue-200 font-semibold mb-2">💡 Zero-Based Indexing:</div>
        <div className="text-blue-100 text-sm">
          • Arrays start counting from 0, not 1<br />• First element is at index 0<br />• Last element is at index
          (length - 1)
          <br />• Accessing invalid index returns undefined
        </div>
      </div>
    </div>
  )
}

function ArrayMethodsVisualization() {
  const [currentArray, setCurrentArray] = useState([1, 2, 3])
  const [inputValue, setInputValue] = useState("")
  const [lastOperation, setLastOperation] = useState("")
  const [animatingIndex, setAnimatingIndex] = useState(-1)

  const executeMethod = async (method) => {
    const value = inputValue ? Number.parseInt(inputValue) || inputValue : Math.floor(Math.random() * 10) + 1

    switch (method) {
      case "push":
        setAnimatingIndex(currentArray.length)
        setLastOperation(`push(${value}) - Added ${value} to end`)
        setTimeout(() => {
          setCurrentArray((prev) => [...prev, value])
          setAnimatingIndex(-1)
        }, 500)
        break

      case "pop":
        if (currentArray.length > 0) {
          const poppedValue = currentArray[currentArray.length - 1]
          setAnimatingIndex(currentArray.length - 1)
          setLastOperation(`pop() - Removed ${poppedValue} from end`)
          setTimeout(() => {
            setCurrentArray((prev) => prev.slice(0, -1))
            setAnimatingIndex(-1)
          }, 500)
        }
        break

      case "unshift":
        setAnimatingIndex(0)
        setLastOperation(`unshift(${value}) - Added ${value} to beginning`)
        setTimeout(() => {
          setCurrentArray((prev) => [value, ...prev])
          setAnimatingIndex(-1)
        }, 500)
        break

      case "shift":
        if (currentArray.length > 0) {
          const shiftedValue = currentArray[0]
          setAnimatingIndex(0)
          setLastOperation(`shift() - Removed ${shiftedValue} from beginning`)
          setTimeout(() => {
            setCurrentArray((prev) => prev.slice(1))
            setAnimatingIndex(-1)
          }, 500)
        }
        break

      case "splice":
        const index = Math.floor(currentArray.length / 2)
        setAnimatingIndex(index)
        setLastOperation(`splice(${index}, 1, ${value}) - Replaced element at index ${index}`)
        setTimeout(() => {
          setCurrentArray((prev) => {
            const newArray = [...prev]
            newArray.splice(index, 1, value)
            return newArray
          })
          setAnimatingIndex(-1)
        }, 500)
        break

      case "reset":
        setCurrentArray([1, 2, 3])
        setLastOperation("Array reset to [1, 2, 3]")
        break
    }

    setInputValue("")
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">Array Methods Playground</h4>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter value (optional)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          <Button onClick={() => executeMethod("push")} className="bg-green-600 hover:bg-green-700 text-sm">
            push() - Add End
          </Button>
          <Button
            onClick={() => executeMethod("pop")}
            className="bg-red-600 hover:bg-red-700 text-sm"
            disabled={currentArray.length === 0}
          >
            pop() - Remove End
          </Button>
          <Button onClick={() => executeMethod("unshift")} className="bg-blue-600 hover:bg-blue-700 text-sm">
            unshift() - Add Start
          </Button>
          <Button
            onClick={() => executeMethod("shift")}
            className="bg-orange-600 hover:bg-orange-700 text-sm"
            disabled={currentArray.length === 0}
          >
            shift() - Remove Start
          </Button>
          <Button
            onClick={() => executeMethod("splice")}
            className="bg-purple-600 hover:bg-purple-700 text-sm"
            disabled={currentArray.length === 0}
          >
            splice() - Replace
          </Button>
          <Button onClick={() => executeMethod("reset")} className="bg-gray-600 hover:bg-gray-700 text-sm">
            Reset Array
          </Button>
        </div>
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center items-center space-x-2 min-h-20">
        <span className="text-white font-mono text-lg">[</span>
        {currentArray.length === 0 ? (
          <span className="text-gray-400 italic px-4">empty array</span>
        ) : (
          currentArray.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center">
              <div
                className={`w-12 h-12 flex items-center justify-center text-lg font-bold border-2 rounded transition-all duration-500 ${
                  index === animatingIndex
                    ? "border-yellow-400 bg-yellow-400/20 scale-125 animate-pulse"
                    : "border-blue-400 bg-blue-400/20"
                }`}
              >
                {item}
              </div>
              {index < currentArray.length - 1 && <span className="text-white mx-2 font-mono">,</span>}
            </div>
          ))
        )}
        <span className="text-white font-mono text-lg">]</span>
      </div>

      {/* Array Info */}
      <div className="text-center">
        <div className="text-white text-lg mb-2">
          Array Length: <span className="text-yellow-400 font-bold">{currentArray.length}</span>
        </div>
        {lastOperation && <div className="text-green-300 text-sm">Last Operation: {lastOperation}</div>}
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let arr = [{currentArray.join(", ")}];</div>
        {lastOperation && <div className="text-green-400">arr.{lastOperation.split(" - ")[0]};</div>}
        <div className="text-blue-300">console.log(arr); // [{currentArray.join(", ")}]</div>
        <div className="text-yellow-400">console.log(arr.length); // {currentArray.length}</div>
      </div>

      {/* Method Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Mutating Methods</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              <span className="text-green-400">push()</span> - Adds to end
            </div>
            <div>
              <span className="text-red-400">pop()</span> - Removes from end
            </div>
            <div>
              <span className="text-blue-400">unshift()</span> - Adds to start
            </div>
            <div>
              <span className="text-orange-400">shift()</span> - Removes from start
            </div>
            <div>
              <span className="text-purple-400">splice()</span> - Adds/removes at index
            </div>
          </div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Return Values</div>
          <div className="text-gray-300 text-sm space-y-1">
            <div>
              <span className="text-green-400">push()</span> - New length
            </div>
            <div>
              <span className="text-red-400">pop()</span> - Removed element
            </div>
            <div>
              <span className="text-blue-400">unshift()</span> - New length
            </div>
            <div>
              <span className="text-orange-400">shift()</span> - Removed element
            </div>
            <div>
              <span className="text-purple-400">splice()</span> - Removed elements array
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BubbleSortVisualization() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [isRunning, setIsRunning] = useState(false)
  const [comparing, setComparing] = useState([-1, -1])
  const [sorted, setSorted] = useState([])

  const bubbleSort = async () => {
    setIsRunning(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1])
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (arr[j] > arr[j + 1]) {
          // Swap
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
          await new Promise((resolve) => setTimeout(resolve, 500))
        }
      }
      setSorted((prev) => [...prev, n - 1 - i])
    }

    setComparing([-1, -1])
    setSorted(Array.from({ length: n }, (_, i) => i))
    setIsRunning(false)
  }

  const reset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90])
    setComparing([-1, -1])
    setSorted([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={bubbleSort} disabled={isRunning} className="bg-orange-600 hover:bg-orange-700">
            {isRunning ? "Sorting..." : "🫧 Start Bubble Sort"}
          </Button>
          <Button onClick={reset} disabled={isRunning} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-end space-x-1">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 flex items-end justify-center text-xs font-bold text-white transition-all duration-500 ${
                comparing.includes(index) ? "bg-yellow-500" : sorted.includes(index) ? "bg-green-500" : "bg-blue-500"
              }`}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{index}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span className="text-white">Unsorted</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-white">Comparing</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-white">Sorted</span>
        </div>
      </div>

      {/* Status */}
      {isRunning && (
        <div className="text-center text-yellow-400">
          Comparing positions {comparing[0]} and {comparing[1]}
        </div>
      )}
    </div>
  )
}

function SelectionSortVisualization() {
  const [array, setArray] = useState([64, 25, 12, 22, 11])
  const [isRunning, setIsRunning] = useState(false)
  const [currentMin, setCurrentMin] = useState(-1)
  const [comparing, setComparing] = useState(-1)
  const [sorted, setSorted] = useState([])

  const selectionSort = async () => {
    setIsRunning(true)
    const arr = [...array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i
      setCurrentMin(minIdx)

      for (let j = i + 1; j < n; j++) {
        setComparing(j)
        await new Promise((resolve) => setTimeout(resolve, 800))

        if (arr[j] < arr[minIdx]) {
          minIdx = j
          setCurrentMin(minIdx)
        }
      }

      if (minIdx !== i) {
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
        setArray([...arr])
        await new Promise((resolve) => setTimeout(resolve, 500))
      }

      setSorted((prev) => [...prev, i])
      setCurrentMin(-1)
      setComparing(-1)
    }

    setSorted(Array.from({ length: n }, (_, i) => i))
    setIsRunning(false)
  }

  const reset = () => {
    setArray([64, 25, 12, 22, 11])
    setCurrentMin(-1)
    setComparing(-1)
    setSorted([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={selectionSort} disabled={isRunning} className="bg-purple-600 hover:bg-purple-700">
            {isRunning ? "Sorting..." : "🎯 Start Selection Sort"}
          </Button>
          <Button onClick={reset} disabled={isRunning} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-end space-x-1">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 flex items-end justify-center text-xs font-bold text-white transition-all duration-500 ${
                index === currentMin
                  ? "bg-red-500"
                  : index === comparing
                    ? "bg-yellow-500"
                    : sorted.includes(index)
                      ? "bg-green-500"
                      : "bg-blue-500"
              }`}
              style={{ height: `${value}px` }}
            >
              {value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{index}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span className="text-white">Unsorted</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-white">Current Min</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-white">Comparing</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-white">Sorted</span>
        </div>
      </div>

      {/* Status */}
      {isRunning && (
        <div className="text-center text-yellow-400">
          {comparing >= 0 ? `Comparing index ${comparing} with current minimum` : "Finding minimum element"}
        </div>
      )}
    </div>
  )
}

function QuickSortVisualization() {
  const [array, setArray] = useState([3, 6, 8, 10, 1, 2, 1])
  const [isRunning, setIsRunning] = useState(false)
  const [pivot, setPivot] = useState(-1)
  const [comparing, setComparing] = useState([-1, -1])
  const [sorted, setSorted] = useState([])

  const quickSort = async () => {
    setIsRunning(true)
    const arr = [...array]
    await quickSortHelper(arr, 0, arr.length - 1)
    setSorted(Array.from({ length: arr.length }, (_, i) => i))
    setIsRunning(false)
  }

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high)
      await quickSortHelper(arr, low, pi - 1)
      await quickSortHelper(arr, pi + 1, high)
    }
  }

  const partition = async (arr, low, high) => {
    const pivotValue = arr[high]
    setPivot(high)
    let i = low - 1

    for (let j = low; j < high; j++) {
      setComparing([j, high])
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (arr[j] < pivotValue) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        setArray([...arr])
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    setArray([...arr])
    await new Promise((resolve) => setTimeout(resolve, 500))

    setPivot(-1)
    setComparing([-1, -1])
    return i + 1
  }

  const reset = () => {
    setArray([3, 6, 8, 10, 1, 2, 1])
    setPivot(-1)
    setComparing([-1, -1])
    setSorted([])
    setIsRunning(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={quickSort} disabled={isRunning} className="bg-indigo-600 hover:bg-indigo-700">
            {isRunning ? "Sorting..." : "⚡ Start Quick Sort"}
          </Button>
          <Button onClick={reset} disabled={isRunning} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center items-end space-x-1">
        {array.map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 flex items-end justify-center text-xs font-bold text-white transition-all duration-500 ${
                index === pivot
                  ? "bg-red-500"
                  : comparing.includes(index)
                    ? "bg-yellow-500"
                    : sorted.includes(index)
                      ? "bg-green-500"
                      : "bg-blue-500"
              }`}
              style={{ height: `${value * 10}px` }}
            >
              {value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{index}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span className="text-white">Unsorted</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="text-white">Pivot</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-yellow-500"></div>
          <span className="text-white">Comparing</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="text-white">Sorted</span>
        </div>
      </div>

      {/* Status */}
      {isRunning && pivot >= 0 && (
        <div className="text-center text-yellow-400">
          Partitioning around pivot {array[pivot]} at index {pivot}
        </div>
      )}
    </div>
  )
}

function LinearSearchVisualization() {
  const [array] = useState(["🍎", "🍌", "🍊", "🍇", "🥝", "🍓", "🥭"])
  const [target, setTarget] = useState("🍇")
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const startSearch = async () => {
    setIsSearching(true)
    setFound(false)
    setCurrentIndex(-1)

    for (let i = 0; i < array.length; i++) {
      setCurrentIndex(i)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (array[i] === target) {
        setFound(true)
        setIsSearching(false)
        return
      }
    }

    setIsSearching(false)
  }

  const reset = () => {
    setCurrentIndex(-1)
    setFound(false)
    setIsSearching(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mb-4">
          <label className="text-white block mb-2">Search for:</label>
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600"
            disabled={isSearching}
          >
            {array.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={startSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
            {isSearching ? "Searching..." : "🔍 Start Search"}
          </Button>
          <Button onClick={reset} disabled={isSearching} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center space-x-2">
        {array.map((item, index) => (
          <div
            key={index}
            className={`w-16 h-16 flex items-center justify-center text-2xl border-2 rounded-lg transition-all duration-500 ${
              index === currentIndex && isSearching
                ? item === target
                  ? "border-green-400 bg-green-400/20 scale-110"
                  : "border-yellow-400 bg-yellow-400/20 scale-110"
                : index < currentIndex
                  ? "border-red-400 bg-red-400/20"
                  : "border-gray-400 bg-gray-700"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Search Info */}
      <div className="text-center space-y-2">
        <div className="text-white">
          Looking for: <span className="text-2xl">{target}</span>
        </div>
        {currentIndex >= 0 && (
          <div className="text-blue-300">
            Checking index {currentIndex}: <span className="text-2xl">{array[currentIndex]}</span>
            {array[currentIndex] === target ? " ✅ Found!" : " ❌ Not a match"}
          </div>
        )}
        {found && (
          <div className="text-green-400 text-xl font-bold">
            🎉 Found {target} at index {currentIndex}!
          </div>
        )}
        {!isSearching && currentIndex === array.length - 1 && !found && (
          <div className="text-red-400 text-xl">❌ {target} not found in array</div>
        )}
      </div>
    </div>
  )
}

function BinarySearchVisualization() {
  const [array] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19])
  const [target, setTarget] = useState(7)
  const [left, setLeft] = useState(-1)
  const [right, setRight] = useState(-1)
  const [mid, setMid] = useState(-1)
  const [found, setFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const startSearch = async () => {
    setIsSearching(true)
    setFound(false)
    let l = 0
    let r = array.length - 1

    while (l <= r) {
      setLeft(l)
      setRight(r)
      const m = Math.floor((l + r) / 2)
      setMid(m)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (array[m] === target) {
        setFound(true)
        setIsSearching(false)
        return
      }

      if (array[m] < target) {
        l = m + 1
      } else {
        r = m - 1
      }
    }

    setIsSearching(false)
  }

  const reset = () => {
    setLeft(-1)
    setRight(-1)
    setMid(-1)
    setFound(false)
    setIsSearching(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mb-4">
          <label className="text-white block mb-2">Search for:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number.parseInt(e.target.value) || 1)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-20"
            disabled={isSearching}
          />
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={startSearch} disabled={isSearching} className="bg-green-600 hover:bg-green-700">
            {isSearching ? "Searching..." : "🎯 Start Binary Search"}
          </Button>
          <Button onClick={reset} disabled={isSearching} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Visual Array */}
      <div className="flex justify-center space-x-1">
        {array.map((item, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center text-sm font-bold border-2 rounded transition-all duration-500 ${
              index === mid
                ? found
                  ? "border-green-400 bg-green-400/20 text-green-300 scale-110"
                  : "border-yellow-400 bg-yellow-400/20 text-yellow-300 scale-110"
                : index >= left && index <= right && left >= 0 && right >= 0
                  ? "border-blue-400 bg-blue-400/20 text-white"
                  : "border-gray-400 bg-gray-700 text-gray-400"
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Index Labels */}
      <div className="flex justify-center space-x-1">
        {array.map((_, index) => (
          <div key={index} className="w-12 text-center text-xs text-gray-400">
            {index}
          </div>
        ))}
      </div>

      {/* Search Info */}
      <div className="text-center space-y-2">
        <div className="text-white">
          Target: <span className="text-yellow-400 font-bold">{target}</span>
        </div>
        {left >= 0 && right >= 0 && (
          <div className="text-blue-300">
            Search Range: [{left}, {right}] | Middle: {mid} (value: {array[mid]})
          </div>
        )}
        {mid >= 0 && !found && isSearching && (
          <div className="text-white">
            {array[mid] < target ? "Target is larger, search right half" : "Target is smaller, search left half"}
          </div>
        )}
        {found && (
          <div className="text-green-400 text-xl font-bold">
            🎉 Found {target} at index {mid}!
          </div>
        )}
        {!isSearching && !found && left >= 0 && (
          <div className="text-red-400 text-xl">❌ {target} not found in array</div>
        )}
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-gray-800 rounded p-4">
        <div className="text-white font-semibold mb-2">Binary Search Steps:</div>
        <div className="text-gray-300 text-sm space-y-1">
          <div>1. Compare target with middle element</div>
          <div>2. If equal, we found it!</div>
          <div>3. If target is smaller, search left half</div>
          <div>4. If target is larger, search right half</div>
          <div>5. Repeat until found or no elements left</div>
        </div>
      </div>
    </div>
  )
}

function HashSearchVisualization() {
  const [array] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [target, setTarget] = useState(5)
  const [hashTable, setHashTable] = useState({})
  const [isBuilding, setIsBuilding] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [found, setFound] = useState(false)
  const [searchResult, setSearchResult] = useState("")

  const buildHashTable = async () => {
    setIsBuilding(true)
    const table = {}

    for (let i = 0; i < array.length; i++) {
      table[array[i]] = i
      setHashTable({ ...table })
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsBuilding(false)
  }

  const searchInHash = async () => {
    setIsSearching(true)
    setFound(false)
    setSearchResult("")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (target in hashTable) {
      setFound(true)
      setSearchResult(`Found ${target} at index ${hashTable[target]} in O(1) time!`)
    } else {
      setSearchResult(`${target} not found in hash table`)
    }

    setIsSearching(false)
  }

  const reset = () => {
    setHashTable({})
    setFound(false)
    setSearchResult("")
    setIsBuilding(false)
    setIsSearching(false)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mb-4">
          <label className="text-white block mb-2">Search for:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number.parseInt(e.target.value) || 1)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-20"
            disabled={isBuilding || isSearching}
          />
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          <Button onClick={buildHashTable} disabled={isBuilding} className="bg-purple-600 hover:bg-purple-700">
            {isBuilding ? "Building..." : "🏗️ Build Hash Table"}
          </Button>
          <Button
            onClick={searchInHash}
            disabled={isSearching || Object.keys(hashTable).length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSearching ? "Searching..." : "🔍 Hash Search"}
          </Button>
          <Button onClick={reset} className="bg-gray-600 hover:bg-gray-700">
            Reset
          </Button>
        </div>
      </div>

      {/* Original Array */}
      <div className="text-center">
        <div className="text-white mb-2">Original Array:</div>
        <div className="flex justify-center space-x-2">
          {array.map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 flex items-center justify-center text-lg font-bold border-2 border-blue-400 bg-blue-400/20 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Hash Table Visualization */}
      {Object.keys(hashTable).length > 0 && (
        <div className="text-center">
          <div className="text-white mb-2">Hash Table (Key → Index):</div>
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {Object.entries(hashTable).map(([key, value]) => (
              <div
                key={key}
                className={`p-2 rounded border text-sm ${
                  Number.parseInt(key) === target && found
                    ? "border-green-400 bg-green-400/20 text-green-300"
                    : "border-gray-400 bg-gray-700 text-white"
                }`}
              >
                {key} → {value}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Result */}
      {searchResult && (
        <div className="text-center">
          <div
            className={`p-4 rounded border text-lg font-bold ${
              found ? "border-green-500 bg-green-500/20 text-green-300" : "border-red-500 bg-red-500/20 text-red-300"
            }`}
          >
            {searchResult}
          </div>
        </div>
      )}

      {/* Hash Table Explanation */}
      <div className="bg-gray-800 rounded p-4">
        <div className="text-white font-semibold mb-2">Hash Table Benefits:</div>
        <div className="text-gray-300 text-sm space-y-1">
          <div>• O(1) average search time</div>
          <div>• Direct key-to-value mapping</div>
          <div>• No need to iterate through elements</div>
          <div>• Perfect for frequent lookups</div>
        </div>
      </div>
    </div>
  )
}

function StringMethodsVisualization() {
  const [inputString, setInputString] = useState("Hello World")
  const [selectedMethod, setSelectedMethod] = useState("toUpperCase")
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const stringMethods = {
    toUpperCase: {
      name: "toUpperCase()",
      description: "Converts all characters to uppercase",
      execute: (str) => str.toUpperCase(),
    },
    toLowerCase: {
      name: "toLowerCase()",
      description: "Converts all characters to lowercase",
      execute: (str) => str.toLowerCase(),
    },
    charAt: {
      name: "charAt(5)",
      description: "Gets character at index 5",
      execute: (str) => str.charAt(5) || "undefined",
    },
    substring: {
      name: "substring(0, 5)",
      description: "Extracts characters from index 0 to 5",
      execute: (str) => str.substring(0, 5),
    },
    split: {
      name: "split(' ')",
      description: "Splits string into array by spaces",
      execute: (str) => str.split(" ").join(", "),
    },
  }

  const executeMethod = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const methodResult = stringMethods[selectedMethod].execute(inputString)
      setResult(methodResult)
      setIsAnimating(false)
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">String Methods Playground</h4>

        <div className="mb-4">
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
            placeholder="Enter a string"
          />
        </div>

        <div className="mb-4">
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          >
            {Object.entries(stringMethods).map(([key, method]) => (
              <option key={key} value={key}>
                {method.name}
              </option>
            ))}
          </select>

          <Button onClick={executeMethod} disabled={isAnimating} className="bg-purple-600 hover:bg-purple-700">
            {isAnimating ? "Processing..." : "Execute"}
          </Button>
        </div>
      </div>

      {/* Method Description */}
      <div className="text-center p-4 border-2 border-dashed border-purple-400 rounded-lg">
        <div className="text-white text-lg mb-2">Method: {stringMethods[selectedMethod].name}</div>
        <div className="text-purple-300">{stringMethods[selectedMethod].description}</div>
      </div>

      {/* Visual String Representation */}
      <div className="flex justify-center space-x-1 mb-4">
        {inputString.split("").map((char, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center text-sm border-2 rounded transition-all duration-500 ${
              isAnimating ? "border-yellow-400 bg-yellow-400/20 animate-pulse" : "border-blue-400 bg-blue-400/20"
            }`}
          >
            {char === " " ? "␣" : char}
          </div>
        ))}
      </div>

      {/* Result Display */}
      {result && (
        <div className="text-center">
          <div className="text-white text-lg mb-2">Result:</div>
          <div className="bg-green-500/20 border border-green-500 rounded p-4">
            <span className="text-green-300 text-xl font-mono">{result}</span>
          </div>
        </div>
      )}

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let str = "{inputString}";</div>
        <div className="text-green-400">let result = str.{stringMethods[selectedMethod].name};</div>
        <div className="text-blue-300">console.log(result); // {result || "..."}</div>
      </div>
    </div>
  )
}

function StringManipulationVisualization() {
  const [inputString, setInputString] = useState("Hello World")
  const [selectedOperation, setSelectedOperation] = useState("replace")
  const [parameter1, setParameter1] = useState("World")
  const [parameter2, setParameter2] = useState("JavaScript")
  const [result, setResult] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const stringOperations = {
    replace: {
      name: "replace(searchValue, replaceValue)",
      description: "Replaces first occurrence of searchValue with replaceValue",
      execute: (str, p1, p2) => str.replace(p1, p2),
      params: ["Search for", "Replace with"],
    },
    slice: {
      name: "slice(start, end)",
      description: "Extracts a section of string from start to end index",
      execute: (str, p1, p2) => str.slice(Number.parseInt(p1) || 0, Number.parseInt(p2) || str.length),
      params: ["Start index", "End index"],
    },
    concat: {
      name: "concat(string)",
      description: "Joins two or more strings together",
      execute: (str, p1) => str.concat(p1),
      params: ["String to add", ""],
    },
    repeat: {
      name: "repeat(count)",
      description: "Returns string repeated specified number of times",
      execute: (str, p1) => str.repeat(Number.parseInt(p1) || 1),
      params: ["Repeat count", ""],
    },
    padStart: {
      name: "padStart(length, padString)",
      description: "Pads string from start to reach target length",
      execute: (str, p1, p2) => str.padStart(Number.parseInt(p1) || str.length, p2 || " "),
      params: ["Target length", "Pad character"],
    },
    trim: {
      name: "trim()",
      description: "Removes whitespace from both ends of string",
      execute: (str) => str.trim(),
      params: ["", ""],
    },
  }

  const executeOperation = () => {
    setIsAnimating(true)
    setTimeout(() => {
      const operation = stringOperations[selectedOperation]
      const operationResult = operation.execute(inputString, parameter1, parameter2)
      setResult(operationResult)
      setIsAnimating(false)
    }, 1000)
  }

  const currentOperation = stringOperations[selectedOperation]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-white mb-4">String Manipulation Playground</h4>

        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 w-full max-w-md"
            placeholder="Enter a string"
          />
        </div>

        <div className="mb-4">
          <select
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
          >
            {Object.entries(stringOperations).map(([key, operation]) => (
              <option key={key} value={key}>
                {operation.name}
              </option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div className="mb-4 space-y-2">
          {currentOperation.params[0] && (
            <input
              type="text"
              value={parameter1}
              onChange={(e) => setParameter1(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600 mr-2"
              placeholder={currentOperation.params[0]}
            />
          )}
          {currentOperation.params[1] && (
            <input
              type="text"
              value={parameter2}
              onChange={(e) => setParameter2(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded border border-gray-600"
              placeholder={currentOperation.params[1]}
            />
          )}
        </div>

        <Button onClick={executeOperation} disabled={isAnimating} className="bg-purple-600 hover:bg-purple-700">
          {isAnimating ? "Processing..." : "Execute Operation"}
        </Button>
      </div>

      {/* Operation Description */}
      <div className="text-center p-4 border-2 border-dashed border-purple-400 rounded-lg">
        <div className="text-white text-lg mb-2">{currentOperation.name}</div>
        <div className="text-purple-300">{currentOperation.description}</div>
      </div>

      {/* Visual String Representation */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-white mb-2">Original String:</div>
          <div className="flex justify-center space-x-1 mb-4">
            {inputString.split("").map((char, index) => (
              <div
                key={index}
                className={`w-8 h-8 flex items-center justify-center text-sm border-2 rounded transition-all duration-500 ${
                  isAnimating ? "border-yellow-400 bg-yellow-400/20 animate-pulse" : "border-blue-400 bg-blue-400/20"
                }`}
              >
                {char === " " ? "␣" : char}
              </div>
            ))}
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="text-center">
            <div className="text-white mb-2">Result:</div>
            <div className="flex justify-center space-x-1 mb-4">
              {result.split("").map((char, index) => (
                <div
                  key={index}
                  className="w-8 h-8 flex items-center justify-center text-sm border-2 border-green-400 bg-green-400/20 rounded animate-pulse"
                >
                  {char === " " ? "␣" : char}
                </div>
              ))}
            </div>
            <div className="bg-green-500/20 border border-green-500 rounded p-4">
              <span className="text-green-300 text-xl font-mono">"{result}"</span>
            </div>
          </div>
        )}
      </div>

      {/* Code Display */}
      <div className="bg-gray-800 p-4 rounded-lg text-sm">
        <div className="text-gray-400">let str = "{inputString}";</div>
        <div className="text-green-400">
          let result = str.{selectedOperation}({currentOperation.params[0] && `"${parameter1}"`}
          {currentOperation.params[1] && `, "${parameter2}"`}
          );
        </div>
        <div className="text-blue-300">console.log(result); // "{result || "..."}"</div>
      </div>

      {/* String Properties */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Original Length</div>
          <div className="text-blue-300 text-lg">{inputString.length}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Result Length</div>
          <div className="text-green-300 text-lg">{result.length || 0}</div>
        </div>

        <div className="bg-gray-700/50 p-4 rounded">
          <div className="text-white font-semibold mb-2">Length Change</div>
          <div
            className={`text-lg ${result.length > inputString.length ? "text-green-300" : result.length < inputString.length ? "text-red-300" : "text-yellow-300"}`}
          >
            {result ? (result.length - inputString.length > 0 ? "+" : "") + (result.length - inputString.length) : 0}
          </div>
        </div>
      </div>
    </div>
  )
}

function StringComparisonVisualization() {
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
      description: "Checks if first string starts with\

export const codingChallenges = {
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

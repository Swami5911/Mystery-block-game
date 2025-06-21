export const learningContent = {
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        content: "Linear search checks each element one by one until it finds the target. Watch the search in action!",
        hasVisualization: true,
        visualizationType: "linearSearch",
      },
      {
        title: "Linear Search Code",
        content:
          "function linearSearch(arr, target) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}",
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
      },
    ],
    quiz: {
      question: "Which are valid ways to access object properties?",
      options: ["obj.property only", "obj['property'] only", "Both obj.property and obj['property']", "obj->property"],
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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
        hasVisualization: false,
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

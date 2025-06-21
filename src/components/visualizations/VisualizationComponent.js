import ForLoopVisualization from "./ForLoopVisualization"
import InteractiveForLoop from "./InteractiveForLoop"
import WhileLoopVisualization from "./WhileLoopVisualization"
import DoWhileLoopVisualization from "./DoWhileLoopVisualization"
import ArrayCreationVisualization from "./ArrayCreationVisualization"
import ArrayAccessVisualization from "./ArrayAccessVisualization"
import ArrayMethodsVisualization from "./ArrayMethodsVisualization"
import BubbleSortVisualization from "./BubbleSortVisualization"
import LinearSearchVisualization from "./LinearSearchVisualization"
import StringMethodsVisualization from "./StringMethodsVisualization"
import StringManipulationVisualization from "./StringManipulationVisualization"
import StringComparisonVisualization from "./StringComparisonVisualization"
import FunctionVisualization from "./FunctionVisualization"
import ObjectVisualization from "./ObjectVisualization"
import ConditionalVisualization from "./ConditionalVisualization"
import RecursionVisualization from "./RecursionVisualization"

const VisualizationComponent = ({ type }) => {
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
      return <BubbleSortVisualization />
    case "quickSort":
      return <BubbleSortVisualization />
    case "linearSearch":
      return <LinearSearchVisualization />
    case "binarySearch":
      return <LinearSearchVisualization />
    case "hashSearch":
      return <ObjectVisualization />
    case "stringMethods":
      return <StringMethodsVisualization />
    case "stringManipulation":
      return <StringManipulationVisualization />
    case "stringComparison":
      return <StringComparisonVisualization />
    case "functionExecution":
      return <FunctionVisualization />
    case "parametersArguments":
      return <FunctionVisualization />
    case "returnValues":
      return <FunctionVisualization />
    case "objectCreation":
      return <ObjectVisualization />
    case "objectProperties":
      return <ObjectVisualization />
    case "objectMethods":
      return <ObjectVisualization />
    case "conditionalLogic":
      return <ConditionalVisualization />
    case "switchCases":
      return <ConditionalVisualization />
    case "ternaryOperator":
      return <ConditionalVisualization />
    case "recursionStack":
      return <RecursionVisualization />
    case "recursiveCase":
      return <RecursionVisualization />
    case "stackOverflow":
      return <RecursionVisualization />
    default:
      return <div className="text-white">Visualization coming soon!</div>
  }
}

export default VisualizationComponent

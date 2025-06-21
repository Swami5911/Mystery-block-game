# Mystery Blocks Game

An interactive educational game that teaches programming concepts through visual demonstrations and gamification.

## Features

- **9 Programming Categories**: Loops, Arrays, Strings, Sorting, Searching, Functions, Objects, Conditionals, and Recursion
- **Interactive Visualizations**: Step-by-step animations showing how code executes
- **Progressive Learning**: Complete subconcepts to unlock mystery blocks
- **Gamified Experience**: Track progress and reveal hidden images
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd mystery-blocks-game
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

\`\`\`
src/
├── components/
│   ├── visualizations/
│   │   ├── VisualizationComponent.js
│   │   ├── ForLoopVisualization.js
│   │   ├── InteractiveForLoop.js
│   │   ├── WhileLoopVisualization.js
│   │   ├── ArrayCreationVisualization.js
│   │   ├── BubbleSortVisualization.js
│   │   └── LinearSearchVisualization.js
│   ├── MysteryBlocksGame.js
│   ├── MysteryBlock.js
│   ├── CategoryView.js
│   └── LearningModule.js
├── data/
│   ├── gameData.js
│   └── learningContent.js
├── App.js
├── App.css
├── index.js
└── index.css
\`\`\`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and animations
- **Lucide React** - Icons
- **Create React App** - Build tooling

## Learning Concepts

### Loops
- For Loop with visual array traversal
- While Loop with condition checking
- Interactive stepping through iterations

### Arrays
- Dynamic array creation
- Index-based access visualization
- Array method demonstrations

### Sorting Algorithms
- Bubble Sort with animated comparisons
- Visual element swapping
- Progress tracking

### Search Algorithms
- Linear Search step-by-step
- Target highlighting
- Success/failure feedback

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by visual learning methodologies
- Built with educational gamification principles
- Designed for interactive programming education

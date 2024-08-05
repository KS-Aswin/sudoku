import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import "../App.css";
import sudoku from "sudoku";

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("black");
  const [incorrectCells, setIncorrectCells] = useState({});
  const [correctCells, setCorrectCells] = useState({}); 
  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = () => {
    const rawPuzzle = sudoku.makepuzzle();
    const solvedPuzzle = sudoku.solvepuzzle(rawPuzzle);
    setStatusMessage("");
    setSelectedCell(null);
    setUserInput({});
    setPuzzle(rawPuzzle);
    setSolution(solvedPuzzle);
    setIncorrectCells({});
    setCorrectCells({});
  };

  const handleCellClick = (row, col) => {
    setSelectedCell(`${row}-${col}`);
  };

  const handleInputChange = (row, col, value) => {
    setUserInput({ ...userInput, [`${row}-${col}`]: value });
  };

  const checkSolution = () => {
    const newIncorrectCells = {};
    const newCorrectCells = {}; 
    let correctCount = 0;
    let remainings = 0;
    let incorrect=0;

    puzzle.forEach((cell, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      const key = `${row}-${col}`;
      const userValue = parseInt(userInput[key], 10);
      const solutionValue = solution[index] + 1;

      if (userValue === solutionValue) {
        newCorrectCells[key] = true; 
        correctCount++;
      } else if (userValue !== solutionValue && !isNaN(userValue)) {
        newIncorrectCells[key] = true;
        incorrect++;
      }

      if (
        (cell !== null && cell + 1 === solutionValue) ||
        userValue === solutionValue
      ) {
        remainings++;
      }
    });

    setIncorrectCells(newIncorrectCells);
    setCorrectCells(newCorrectCells);

    const remainingCells = 81 - remainings;

    if (remainingCells === 0) {
      setStatusMessage("Congratulations! You have completed the puzzle.");
      setStatusColor("green");
    } else {
      setStatusMessage(
        `${remainings} Cell are OK and ${incorrect} Cell are Incorrect, still ${remainingCells} Cell to go!`
      );
      setStatusColor("#1c85fd");
      setSelectedCell(null);
    }
  };

  return (
    <>
      <div className="">
        <div className="App">
          <h1>SUDOKU</h1>
          <SudokuGrid
            onCellClick={handleCellClick}
            selectedCell={selectedCell}
            puzzle={puzzle}
            userInput={userInput}
            onInputChange={handleInputChange}
            incorrectCells={incorrectCells} 
            correctCells={correctCells} 
          />
          <div className="controls">
            <button onClick={checkSolution}>Check</button>
            <button onClick={generateNewPuzzle}>Reset</button>
          </div>
          <div className="status" style={{ color: statusColor }}>
            {statusMessage}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

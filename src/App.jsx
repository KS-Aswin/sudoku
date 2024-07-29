import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import "./App.css";
import sudoku from "sudoku";

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("black");

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = () => {
    const rawPuzzle = sudoku.makepuzzle();
    const solvedPuzzle = sudoku.solvepuzzle(rawPuzzle);

    setPuzzle(rawPuzzle);
    setSolution(solvedPuzzle);
  };

  const handleInputChange = (row, col, value) => {
    setUserInput({ ...userInput, [`${row}-${col}`]: value });
  };

  const handleCellClick = (row, col) => {
    setSelectedCell(`${row}-${col}`);
  };

  const checkSolution = () => {
    let correctCount = 0;

    puzzle.forEach((cell, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      const key = `${row}-${col}`;
      const userValue = parseInt(userInput[key], 10);
      const solutionValue = solution[index] + 1;

      if (cell !== null || userValue === solutionValue) {
        correctCount++;
      }
    });

    const remainingCells = 81 - correctCount;

    if (remainingCells === 0) {
      setStatusMessage("Congratulations! You have completed the puzzle.");
      setStatusColor("green");
    } else {
      setStatusMessage(`${correctCount} is correctly placed from 81.`);
      setStatusColor("blue");
    }
  };

  return (
    <>
      <div className="">
        <div className="App">
          <h1>Sudoku</h1>
          <SudokuGrid
            puzzle={puzzle}
            userInput={userInput}
            selectedCell={selectedCell}
            onInputChange={handleInputChange}
            onCellClick={handleCellClick}
          />
          <div className="controls">
            <button onClick={checkSolution}>Check</button>
            <button onClick={generateNewPuzzle}>Reset</button>
          </div>
          <div className="status" style={{ color: statusColor }}>{statusMessage}</div>
        </div>
      </div>
    </>
  );
}

export default App;

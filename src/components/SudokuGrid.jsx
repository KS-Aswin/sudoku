import "../SudokuGrid.css";

function SudokuGrid({
  puzzle,
  userInput,
  selectedCell,
  onInputChange,
  onCellClick,
}) {
  const handleInputChange = (row, col, value) => {
    if (/^[1-9]?$/.test(value)) {
      onInputChange(row, col, value);
    }
  };

  return (
    <div className="sudoku-grid">
      {Array.from({ length: 9 }, (_, row) => (
        <div key={row} className="row">
          {Array.from({ length: 9 }, (_, col) => {
            const index = row * 9 + col;
            const key = `${row}-${col}`;
            console.log(key);
            const value =
              puzzle[index] !== null ? puzzle[index] + 1 : userInput[key] || "";
            const isDefault = puzzle[index] !== null;
            const isSelected = selectedCell === key;
            const className = `cell ${isDefault ? "default-cell" : ""} ${
              isSelected && !isDefault ? "empty-selected" : ""
            } ${isSelected && isDefault ? "selected-cell" : ""} ${
              userInput[key] && !isDefault ? "user-input" : ""
            }`;

            return (
              <input
                key={key}
                type="text"
                value={value}
                className={className}
                maxLength="1"
                onChange={(e) => handleInputChange(row, col, e.target.value)}
                onClick={() => onCellClick(row, col)}
                readOnly={isDefault}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SudokuGrid;

import "../SudokuGrid.css";

function SudokuGrid({
  onCellClick,
  puzzle,
  userInput,
  selectedCell,
  onInputChange,
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
            
            const isDefault = puzzle[index] !== null;
            const value = isDefault ? puzzle[index] + 1 : userInput[key] || "";
            const isSelected = selectedCell === key;
            let className = "cell";

            if (isDefault) {
              className += " default-cell";
              if (isSelected) {
                className += " selected-cell";
              }
            } else {
              if (isSelected) {
                className += " empty-selected";
              }
              if (userInput[key]) {
                className += " user-input";
              }
            }

            return (
              <input
                key={key}
                type="text"
                value={value}
                className={className}
                maxLength="1"
                onClick={() => onCellClick(row, col)}
                onChange={(e) => handleInputChange(row, col, e.target.value)}
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

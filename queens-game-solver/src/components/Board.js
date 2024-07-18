import React from 'react';
import { getColorForChar } from '../util/Colors';
import './Board.css';

// Functional component to render the game board
const Board = ({ board, originalBoard, onCellClick }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="cell"
              style={{ backgroundColor: getColorForChar(originalBoard[rowIndex][colIndex]) }}  
              onClick={() => onCellClick && onCellClick(rowIndex, colIndex)}   
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
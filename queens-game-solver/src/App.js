import React, { useState } from 'react';
import Board from './components/Board';
import FileInput from './components/FileInput';
import {
  bfsSolver, dfsSolver, constraintProgrammingSolver,
  isSafeQueen, isSafeChessQueen, isSafeRook, isSafeBishop, isSafeKnight
} from './util/Algorithms';
import './App.css';
import logo from './images/Logo.png';

const App = () => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [algorithm, setAlgorithm] = useState('BFS');
  const [piece, setPiece] = useState('Queen');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());
  const [noSolution, setNoSolution] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        const parsedBoard = parseBoard(text);
        setBoard(parsedBoard);
        setError('');
        setNoSolution(false);
      };
      reader.readAsText(file);
    } else {
      setError('Please upload a valid .txt file.');
      setBoard([]);
      setSolution([]);
      setNoSolution(false);
    }
  };

  const parseBoard = (text) => {
    const lines = text.trim().split('\n');
    const board = lines.slice(2).map(line => line.split(' ').map(cell => cell.replace(/\s/g, '')));
    return board;
  };

  const handleSolve = () => {
    if (board.length === 0) {
      setError('No file selected. Please upload a file first.');
      return;
    }
    const isSafe = getIsSafeFunction(piece);
    const pieceSymbol = getPieceSymbol(piece);
    const solution = findSolution(board, algorithm, isSafe, pieceSymbol);
    if (solution.every(row => row.every(cell => cell === '✖'))) {
      setError('No solution found for this board.');
      setNoSolution(true);
    } else {
      setError('');
      setNoSolution(false);
    }
    setSolution(solution);
  };

  const findSolution = (board, algorithm, isSafe, pieceSymbol) => {
    if (algorithm === 'BFS') {
      return bfsSolver(board, isSafe, pieceSymbol);
    } else if (algorithm === 'DFS') {
      return dfsSolver(board, isSafe, pieceSymbol);
    } else if (algorithm === 'CP') {
      return constraintProgrammingSolver(board, isSafe, pieceSymbol);
    }
  };

  const getIsSafeFunction = (piece) => {
    switch (piece) {
      case 'Queen':
        return isSafeQueen;
      case 'Queen (Chess)':
        return isSafeChessQueen;
      case 'Rook':
        return isSafeRook;
      case 'Bishop':
        return isSafeBishop;
      case 'Knight':
        return isSafeKnight;
      default:
        return isSafeQueen;
    }
  };

  const getPieceSymbol = (piece) => {
    switch (piece) {
      case 'Queen':
        return '♕';
      case 'Queen (Chess)':
        return '♕';
      case 'Rook':
        return '♖';
      case 'Bishop':
        return '♗';
      case 'Knight':
        return '♘';
      default:
        return '♕';
    }
  };

  const handleAlgorithmChange = (e) => {
    setAlgorithm(e.target.value);
  };

  const handlePieceChange = (e) => {
    setPiece(e.target.value);
  };

  const addRow = () => {
    if (board.length === 0) {
      setBoard([['A']]); 
      setSolution([]);
      return;
    }

    const bottomRow = board[board.length - 1];
    const randomColor = bottomRow[Math.floor(Math.random() * bottomRow.length)];
    const newRow = Array(bottomRow.length).fill(randomColor);
    setBoard([...board, newRow]);
    setSolution([]);
  };

  const addColumn = () => {
    if (board.length === 0) {
      setBoard([['A']]); 
      setSolution([]);
      return;
    }

    const rightmostColumn = board.map(row => row[row.length - 1]);
    const randomColor = rightmostColumn[Math.floor(Math.random() * rightmostColumn.length)];
    const newBoard = board.map(row => [...row, randomColor]);
    setBoard(newBoard);
    setSolution([]);
  };

  const removeRow = () => {
    if (board.length > 0) {
      setBoard(board.slice(0, -1));
      setSolution([]);
    }
  };

  const removeColumn = () => {
    if (board[0] && board[0].length > 0) {
      const newBoard = board.map(row => row.slice(0, -1));
      setBoard(newBoard);
      setSolution([]);
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const newBoard = board.map(row => row.slice());
    const newValue = prompt('Enter new value:', board[rowIndex][colIndex]);
    if (newValue !== null) {
      newBoard[rowIndex][colIndex] = newValue;
      setBoard(newBoard);
    }
  };

  const handleRefresh = () => {
    setBoard([]);
    setSolution([]);
    setAlgorithm('BFS');
    setPiece('Queen');
    setFileName('');
    setError('');
    setNoSolution(false);
    setFileKey(Date.now());
  };

  return (
    <div className="App">
      <div className="container">
        <h1>
          <img src={logo} alt="Logo" className="logo" />
        </h1>
        <FileInput onFileUpload={handleFileUpload} fileKey={fileKey} />
        {fileName && <p className="file-name">{fileName}</p>}
        <div className="controls">
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="BFS">BFS</option>
            <option value="DFS">DFS</option>
            <option value="CP">Constraint Programming</option>
          </select>
          <select value={piece} onChange={handlePieceChange}>
            <option value="Queen">Queen</option>
            <option value="Queen (Chess)">Queen (Chess)</option>
            <option value="Rook">Rook</option>
            <option value="Bishop">Bishop</option>
            <option value="Knight">Knight</option>
          </select>
          <button onClick={handleSolve}>Solve</button>
          <button onClick={addRow}>Add Row</button>
          <button onClick={addColumn}>Add Column</button>
          <button onClick={removeRow}>Remove Row</button>
          <button onClick={removeColumn}>Remove Column</button>
          <button onClick={handleRefresh}>⟳ Refresh</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="board-container">
          {board.length > 0 && (
            <div className="board-wrapper">
              <h2>Initial Board</h2>
              <Board board={board} originalBoard={board} onCellClick={handleCellClick} />
            </div>
          )}
          {solution.length > 0 && (
            <>
              <div className="arrow">→</div>
              <div className="board-wrapper">
                <h2>Solution Board</h2>
                <Board board={solution} originalBoard={board} />
              </div>
            </>
          )}
          {noSolution && <p className="no-solution">No Solution Found</p>}
        </div>
      </div>
    </div>
  );
};

export default App;
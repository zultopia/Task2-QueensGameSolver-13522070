const getRegions = (board) => {
    let regions = {};
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        let cell = board[row][col];
        if (!regions[cell]) regions[cell] = [];
        regions[cell].push([row, col]);
      }
    }
    return Object.values(regions);
  };
  
  const isSafeQueen = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
  const isSafeChessQueen = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
  const isSafeRook = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
  const isSafeBishop = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
  const isSafeKnight = (solution, row, col, pieceSymbol) => {
    const knightMoves = [
      [-2, -1], [-1, -2], [1, -2], [2, -1],
      [2, 1], [1, 2], [-1, 2], [-2, 1]
    ];
    for (let [dx, dy] of knightMoves) {
      let x = row + dx;
      let y = col + dy;
      if (x >= 0 && y >= 0 && x < solution.length && y < solution[0].length && solution[x][y] === pieceSymbol) {
        return false;
      }
    }
    return true;
  };
  
  const isSafeGeneric = (solution, row, col, directions, pieceSymbol) => {
    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      while (x >= 0 && y >= 0 && x < solution.length && y < solution[0].length) {
        if (solution[x][y] === pieceSymbol) return false;
        x += dx;
        y += dy;
      }
    }
    return true;
  };
  
  const placePiece = (sol, regions, regionIndex, isSafe, pieceSymbol) => {
        if (regionIndex === regions.length) return true;
      
        const region = regions[regionIndex];
        
        // Jika region hanya terdiri dari satu cell, isi otomatis
        if (region.length === 1) {
          const [row, col] = region[0];
          sol[row][col] = pieceSymbol;
          return placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol);
        }
      
        for (let [row, col] of region) {
          if (isSafe(sol, row, col)) {
            sol[row][col] = pieceSymbol;
            if (placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol)) {
              return true;
            }
            sol[row][col] = '✖';
          }
        }
        return false;
      };
  
  export const bfsSolver = (board, isSafe = isSafeQueen, pieceSymbol) => {
    let solution = board.map(row => row.slice());
    let regions = getRegions(board);
  
    for (let region of regions) {
      let found = false;
      for (let [row, col] of region) {
        if (!found && isSafe(solution, row, col, pieceSymbol)) {
          solution[row][col] = pieceSymbol;
          found = true;
        }
      }
    }
  
    solution = solution.map(row => row.map(cell => (cell === pieceSymbol ? pieceSymbol : '✖')));
    return solution;
  };
  
  export const dfsSolver = (board, isSafe = isSafeQueen, pieceSymbol) => {
    let solution = board.map(row => row.slice());
    let regions = getRegions(board);
  
    for (let region of regions) {
      let found = false;
      for (let [row, col] of region) {
        if (!found && isSafe(solution, row, col, pieceSymbol)) {
          solution[row][col] = pieceSymbol;
          found = true;
        }
      }
    }
  
    solution = solution.map(row => row.map(cell => (cell === pieceSymbol ? pieceSymbol : '✖')));
    return solution;
  };
  
  export const constraintProgrammingSolver = (board, isSafe = isSafeQueen, pieceSymbol) => {
    const n = board.length;
    const m = board[0].length;
    let solution = Array.from({ length: n }, () => Array(m).fill('✖'));
    let regions = getRegions(board);
  
    if (placePiece(solution, regions, 0, isSafe, pieceSymbol)) {
      return solution;
    } else {
      return board.map(row => row.map(cell => '✖'));
    }
  };
  
  // Export all isSafe functions
  export {
    isSafeQueen,
    isSafeChessQueen,
    isSafeRook,
    isSafeBishop,
    isSafeKnight,
  };
  
// const getRegions = (board) => {
//     let regions = {};
//     for (let row = 0; row < board.length; row++) {
//       for (let col = 0; col < board[row].length; col++) {
//         let cell = board[row][col];
//         if (!regions[cell]) regions[cell] = [];
//         regions[cell].push([row, col]);
//       }
//     }
//     return Object.values(regions);
//   };
  
//   const isSafeQueen = (solution, row, col) => {
//     const directions = [
//       [-1, 0], [1, 0], [0, -1], [0, 1],
//       [-1, -1], [-1, 1], [1, -1], [1, 1]
//     ];
//     return isSafeGeneric(solution, row, col, directions);
//   };
  
//   const isSafeChessQueen = (solution, row, col) => {
//     const directions = [
//       [-1, 0], [1, 0], [0, -1], [0, 1],
//       [-1, -1], [-1, 1], [1, -1], [1, 1]
//     ];
//     return isSafeGeneric(solution, row, col, directions);
//   };
  
//   const isSafeRook = (solution, row, col) => {
//     const directions = [
//       [-1, 0], [1, 0], [0, -1], [0, 1]
//     ];
//     return isSafeGeneric(solution, row, col, directions);
//   };
  
//   const isSafeBishop = (solution, row, col) => {
//     const directions = [
//       [-1, -1], [-1, 1], [1, -1], [1, 1]
//     ];
//     return isSafeGeneric(solution, row, col, directions);
//   };
  
//   const isSafeKnight = (solution, row, col) => {
//     const knightMoves = [
//       [-2, -1], [-1, -2], [1, -2], [2, -1],
//       [2, 1], [1, 2], [-1, 2], [-2, 1]
//     ];
//     for (let [dx, dy] of knightMoves) {
//       let x = row + dx;
//       let y = col + dy;
//       if (x >= 0 && y >= 0 && x < solution.length && y < solution[0].length && solution[x][y] === 'Q') {
//         return false;
//       }
//     }
//     return true;
//   };
  
//   const isSafeGeneric = (solution, row, col, directions) => {
//     for (let [dx, dy] of directions) {
//       let x = row + dx;
//       let y = col + dy;
//       while (x >= 0 && y >= 0 && x < solution.length && y < solution[0].length) {
//         if (solution[x][y] === 'Q') return false;
//         x += dx;
//         y += dy;
//       }
//     }
//     return true;
//   };
  
//   const placePiece = (sol, regions, regionIndex, isSafe, pieceSymbol) => {
//     if (regionIndex === regions.length) return true;
  
//     const region = regions[regionIndex];
    
//     // Jika region hanya terdiri dari satu cell, isi otomatis
//     if (region.length === 1) {
//       const [row, col] = region[0];
//       sol[row][col] = pieceSymbol;
//       return placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol);
//     }
  
//     for (let [row, col] of region) {
//       if (isSafe(sol, row, col)) {
//         sol[row][col] = pieceSymbol;
//         if (placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol)) {
//           return true;
//         }
//         sol[row][col] = '✖';
//       }
//     }
//     return false;
//   };
  
//   export const bfsSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
//     let solution = board.map(row => row.slice());
//     let regions = getRegions(board);

//     for (let region of regions) {
//         let queue = [...region];
//         while (queue.length) {
//             let [row, col] = queue.shift();
//             if (isSafe(solution, row, col)) {
//                 solution[row][col] = pieceSymbol;
//                 break;
//             }
//         }
//     }

//     // Replace remaining alphanumeric with ✖
//     for (let row = 0; row < solution.length; row++) {
//         for (let col = 0; col < solution[row].length; col++) {
//             if (solution[row][col].match(/[A-Za-z0-9!@#$%^&*()]/)) {
//                 solution[row][col] = '✖';
//             }
//         }
//     }

//     return solution;
// };

//   export const dfsSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
//     let solution = board.map(row => row.slice());
//     let regions = getRegions(board);

//     for (let region of regions) {
//         let stack = [...region];
//         while (stack.length) {
//             let [row, col] = stack.pop();
//             if (isSafe(solution, row, col)) {
//                 solution[row][col] = pieceSymbol;
//                 break;
//             }
//         }
//     }

//     // Replace remaining alphanumeric with ✖
//     for (let row = 0; row < solution.length; row++) {
//         for (let col = 0; col < solution[row].length; col++) {
//             if (solution[row][col].match(/[A-Za-z0-9!@#$%^&*()]/)) {
//                 solution[row][col] = '✖';
//             }
//         }
//     }

//     return solution;
// };

//   export const constraintProgrammingSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
//     const n = board.length;
//     const m = board[0].length;
//     let solution = Array.from({ length: n }, () => Array(m).fill('✖'));
//     let regions = getRegions(board);
  
//     if (placePiece(solution, regions, 0, isSafe, pieceSymbol)) {
//       return solution;
//     } else {
//       return board.map(row => row.map(cell => '✖'));
//     }
//   };
  
//   export {
//     isSafeQueen,
//     isSafeChessQueen,
//     isSafeRook,
//     isSafeBishop,
//     isSafeKnight,
//   };  
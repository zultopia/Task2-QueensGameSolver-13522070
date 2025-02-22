// Function to get regions in the board
const getRegions = (board) => {
    let regions = {};
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        let cell = board[row][col].toUpperCase();
        if (!regions[cell]) regions[cell] = [];
        regions[cell].push([row, col]);
      }
    }
    return Object.values(regions);
  };
  
  // Function to check if placing object is safe based on custom rules
  const isSafeQueen = (solution, row, col, pieceSymbol) => {
    // Rule 1   : Can't in the same region
    const regions = getRegions(solution);
    const currentRegion = regions.find(region => region.some(([r, c]) => r === row && c === col));
  
    for (let [r, c] of currentRegion) {
      if (solution[r][c] === pieceSymbol) {
        return false;
      }
    }
  
    // Rule 2   : Can't in the block around 
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
  
    for (let [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      if (x >= 0 && y >= 0 && x < solution.length && y < solution[0].length) {
        if (solution[x][y] === pieceSymbol) {
          return false;
        }
      }
    }
  
    // Rule 3   : Can't in the same row/column
    for (let i = 0; i < solution.length; i++) {
      if (solution[i][col] === pieceSymbol || solution[row][i] === pieceSymbol) {
        return false;
      }
    }

    return true;
  };
  
  // Rule for Chess Queen
  const isSafeChessQueen = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
   // Rule for Chess Rook
  const isSafeRook = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
   // Rule for Chess Bishop
  const isSafeBishop = (solution, row, col, pieceSymbol) => {
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];
    return isSafeGeneric(solution, row, col, directions, pieceSymbol);
  };
  
   // Rule for Chess Knight
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
  
   // Rule for checking all the cell of board
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
  
  // Function to place a piece on the board using constraint programming
  const placePiece = (sol, regions, regionIndex, isSafe, pieceSymbol) => {
    if (regionIndex === regions.length) return true;
  
    const region = regions[regionIndex];
  
    if (region.length === 1) {
      const [row, col] = region[0];
      sol[row][col] = pieceSymbol;
      return placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol);
    }
  
    for (let [row, col] of region) {
      if (isSafe(sol, row, col, pieceSymbol)) {
        sol[row][col] = pieceSymbol;
        if (placePiece(sol, regions, regionIndex + 1, isSafe, pieceSymbol)) {
          return true;
        }
        sol[row][col] = '✖';
      }
    }
    return false;
  };
  
  // BFS
  export const bfsSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
    let solution = board.map(row => row.slice());
    let regions = getRegions(board);
    let regionIndex = 0;

    const bfs = (regionIndex) => {
        if (regionIndex === regions.length) return true;

        const region = regions[regionIndex];
        let queue = [...region];

        while (queue.length) {
            let [row, col] = queue.shift();
            if (isSafe(solution, row, col, pieceSymbol)) {
                solution[row][col] = pieceSymbol;
                if (bfs(regionIndex + 1)) {
                    return true;
                }
                solution[row][col] = '✖';
            }
        }
        return false;
    };

    if (bfs(regionIndex)) {
        for (let row = 0; row < solution.length; row++) {
            for (let col = 0; col < solution[row].length; col++) {
                if (solution[row][col] !== pieceSymbol) {
                    solution[row][col] = '✖';
                }
            }
        }
        return solution;
    } else {
        return board.map(row => row.map(cell => '✖'));
    }
};

    // DFS
    export const dfsSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
        let solution = board.map(row => row.slice());
        let regions = getRegions(board);
        let regionIndex = 0;

        const dfs = (regionIndex) => {
            if (regionIndex === regions.length) return true;

            const region = regions[regionIndex];
            let stack = [...region];

            while (stack.length) {
                let [row, col] = stack.pop();
                if (isSafe(solution, row, col, pieceSymbol)) {
                    solution[row][col] = pieceSymbol;
                    if (dfs(regionIndex + 1)) {
                        return true;
                    }
                    solution[row][col] = '✖';
                }
            }
            return false;
        };

        if (dfs(regionIndex)) {
            for (let row = 0; row < solution.length; row++) {
                for (let col = 0; col < solution[row].length; col++) {
                    if (solution[row][col] !== pieceSymbol) {
                        solution[row][col] = '✖';
                    }
                }
            }
            return solution;
        } else {
            return board.map(row => row.map(cell => '✖'));
        }
    };
  
  // Constraint Programming
  export const constraintProgrammingSolver = (board, isSafe = isSafeQueen, pieceSymbol = '♕') => {
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
  
  export {
    isSafeQueen,
    isSafeChessQueen,
    isSafeRook,
    isSafeBishop,
    isSafeKnight,
  };  
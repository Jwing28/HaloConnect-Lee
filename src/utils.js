export const determineWinner = (...values) => {
  const total = values.reduce((total, value) => {
    total += value;
    return total;
  }, 0);

  if (total === 4) {
    return 'Yellow';
  }

  if (total === 8) {
    return 'Red';
  }

  return '';
};

export const checkWin = board => {
  // check vertical
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      if (
        board[row][col] !== 0 &&
        board[row][col] === board[row + 1][col] &&
        board[row][col] === board[row + 2][col] &&
        board[row][col] === board[row + 3][col]
      ) {
        return determineWinner(board[row][col], board[row + 1][col], board[row + 2][col], board[row + 3][col]);
      }
    }
  }
  //check horizontal
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== 0 &&
        board[row][col] === board[row][col + 1] &&
        board[row][col] === board[row][col + 2] &&
        board[row][col] === board[row][col + 3]
      ) {
        return determineWinner(board[row][col], board[row][col + 1], board[row][col + 2], board[row][col + 3]);
      }
    }
  }

  // check right and down
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== 0 &&
        board[row][col] === board[row + 1][col + 1] &&
        board[row][col] === board[row + 2][col + 2] &&
        board[row][col] === board[row + 3][col + 3]
      ) {
        return determineWinner(
          board[row][col],
          board[row + 1][col + 1],
          board[row + 2][col + 2],
          board[row + 3][col + 3]
        );
      }
    }
  }

  // check right and up
  for (let row = 3; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] !== 0 &&
        board[row][col] === board[row - 1][col + 1] &&
        board[row][col] === board[row - 2][col + 2] &&
        board[row][col] === board[row - 3][col + 3]
      ) {
        return determineWinner(
          board[row][col],
          board[row - 1][col + 1],
          board[row - 2][col + 2],
          board[row - 3][col + 3]
        );
      }
    }
  }
};

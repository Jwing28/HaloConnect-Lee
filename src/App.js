import React, { useEffect } from 'react';

import { checkWin } from './utils';
import Square from './Square';

import './App.css';

function App() {
  const defaultBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  let [currentRow, setCurrentRow] = React.useState(0);
  let [currentColumn, setCurrentColumn] = React.useState(0);
  const [boardTotal, setBoardTotal] = React.useState(0);
  const [boardState, setBoard] = React.useState(defaultBoard);
  const [winner, setWinner] = React.useState('');
  const [piece, setPiece] = React.useState(1);

  // creates newPiece after a player has taken their turn
  const newPiece = () => (piece === 1 ? setPiece(2) : setPiece(1));
  // clone existing to avoid state mutation
  const cloneBoard = board => board.map(row => row.slice());
  // create board "slots" for players to put their pieces in
  const createBoardPiece = (row, column, value, onSelect) =>
    <Square row={row} column={column} value={value} onSelect={onSelect} />;
  // as user's place pieces, adds pieces to the board
  // and updates state of pieces and board
  const selectBoardSpace = (row, column) => {
    for (row; row < 6; row++) {
      if (row < 5) {
        if (boardState[row + 1][column] !== 0 && boardState[row][column] === 0) {
          // determined curr row needs curr player's piece
          const updatedBoard = cloneBoard(boardState);
          updatedBoard[row][column] = piece;
          setBoard(updatedBoard);
          setCurrentColumn(column);
          setCurrentRow(row);
          setBoardTotal(boardTotal + piece);
          // update next piece
          newPiece();
        } else if (boardState[row + 1][column] === 0) {
        }
      } else {
        if (boardState[row][column] === 0) {
          // clone board
          const updatedBoard = cloneBoard(boardState);
          // update cloned board
          updatedBoard[row][column] = piece;
          setBoard(updatedBoard);
          setCurrentColumn(column);
          setCurrentRow(row);
          setBoardTotal(boardTotal + piece);
          // update next piece
          newPiece();
        }
      }
    }
  };

  const createBoard = () => {
    let board = [];
    let i = 0;
    for (let column = 0; column < 7; column++) {
      for (let row = 0; row < 6; row++) {
        board.push(createBoardPiece(row, column, boardState[row][column], selectBoardSpace, i));
        i++;
      }
    }
    return board;
  };

  const resetBoard = () => setBoard(defaultBoard);

  useEffect(
    () => {
      // checks for a winner, determines winner,
      // and sets winner state
      setWinner(checkWin(boardState));
    },
    [boardState, currentColumn, currentRow]
  );

  return (
    <div className="App">
      <div className="header">
        <h1>{winner ? `${winner} has won!` : 'Go for it..Connect 4!'}</h1>
        {!winner && <h3 className="turnNotifier">({piece === 1 ? "Yellow's Turn" : "Red's Turn"})</h3>}
        {winner && <button className="resetBtn" onClick={resetBoard}>Reset</button>}
      </div>
      <div className="board">
        {createBoard()}
      </div>
    </div>
  );
}

export default App;

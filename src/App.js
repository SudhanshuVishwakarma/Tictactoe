import React, { useState } from 'react';
import './Style/root.scss';
import Board from './Components/Board';
import { calculateWinner } from './helper';

const App = () => {
  const [history, setHistory] = useState([
    { board: Array(9).fill(null), isXNext: true },
  ]);

  const [currentMove, setCurrentMove] = useState(0);

  const current = history[currentMove];
  // const [isXNext, setIsXNext] = useState(false);

  const winner = calculateWinner(current.board);

  const message = winner
    ? `Winner is ${winner}`
    : `Next Player is ${current.isXNext ? 'X' : 'O'}`;

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((Square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return Square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });

    setCurrentMove(prev => prev + 1);
    // setIsXNext(prev => !prev);
  };
  return (
    <div className="app">
      <h1>TIC TAC TOE</h1>
      <h2>{message}</h2>
      <Board board={current.board} handleSquareClick={handleSquareClick} />
    </div>
  );
};

export default App;

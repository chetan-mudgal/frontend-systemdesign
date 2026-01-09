import { useState } from "react";

const SIZE = 3;
const GRID = Array.from({ length: SIZE }, () => Array(SIZE).fill(""));
export default function App() {
  const [board, setBoard] = useState(GRID);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(0);
  const [complete, setComplete] = useState(false);

  function gameValidation(newBoard) {
    // 1. both diagonals
    let pass = true;
    for (let i = 1; i < SIZE; i++) {
      if (newBoard[i][i] === "" || newBoard[i][i] !== newBoard[i - 1][i - 1]) {
        pass = false;
      }
    }
    if (pass) {
      return true;
    }

    pass = true;
    for (let i = 1; i < SIZE; i++) {
      if (
        newBoard[i][SIZE - i - 1] === "" ||
        newBoard[i][SIZE - i - 1] !== newBoard[i - 1][SIZE - i]
      ) {
        pass = false;
      }
    }
    if (pass) {
      return true;
    }

    // 2. each row
    for (let i = 0; i < SIZE; i++) {
      pass = true;
      for (let j = 1; j < SIZE; j++) {
        if (newBoard[i][j] === "" || newBoard[i][j] !== newBoard[i][j - 1]) {
          pass = false;
        }
      }
      if (pass) {
        return true;
      }
    }
    // 3. each column
    for (let j = 0; j < SIZE; j++) {
      pass = true;
      for (let i = 1; i < SIZE; i++) {
        if (newBoard[i][j] === "" || newBoard[i][j] !== newBoard[i - 1][j]) {
          pass = false;
        }
      }
      if (pass) {
        return true;
      }
    }

    return false;
  }

  function isComplete(newBoard) {
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE; j++) {
        if (newBoard[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  function resetGame() {
    setBoard(Array.from({ length: SIZE }, () => Array(SIZE).fill("")));
    setTurn("X");
    setWinner(0);
    setComplete(false);
  }

  function handleClick(x, y) {
    if (winner !== 0 || complete) {
      return;
    }
    if (board[x][y] !== "") {
      return;
    }
    setBoard((prev) => {
      const newBoard = prev.map((arr, xx) =>
        arr.map((v, yy) => {
          if (x === xx && y === yy) {
            return turn;
          }
          return v;
        })
      );

      // validation
      if (gameValidation(newBoard)) {
        setWinner(turn === "X" ? 1 : 2);
      } else if (isComplete(newBoard)) {
        setComplete(true);
      }

      return newBoard;
    });
    setTurn((pre) => (pre === "X" ? "O" : "X"));
  }
  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="grid">
        {board.map((row, x) =>
          row.map((item, y) => (
            <div
              key={`${x}-${y}`}
              className="grid-cell"
              onClick={() => handleClick(x, y)}
            >
              {item}
            </div>
          ))
        )}
      </div>

      {winner !== 0 ? (
        <div className="announcement">{`Player ${winner} Won the game`}</div>
      ) : complete ? (
        <div className="announcement">Game Draw - No Winner!</div>
      ) : null}

      {(winner !== 0 || complete) && (
        <button className="reset" onClick={resetGame}>
          Reset Game
        </button>
      )}
    </div>
  );
}

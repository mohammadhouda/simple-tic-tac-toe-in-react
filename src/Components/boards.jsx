import { useEffect, useState } from "react";
import Squares from "./Squares";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winning, setWinning] = useState(null);
  const [playerIsX, setPlayerIsX] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const playerSymbol = playerIsX ? "X" : "O";
  const computerSymbol = playerIsX ? "O" : "X";

  function handleSquareClick(index) {
    if (squares[index] !== null || winning || !isPlayerTurn) return;

    const newSquares = [...squares];
    newSquares[index] = playerSymbol;
    setSquares(newSquares);
    setIsPlayerTurn(false);
  }

  function computerMove() {
    let availableSquares = squares
      .map((val, index) => (val === null ? index : null))
      .filter((index) => index !== null);

    if (availableSquares.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    const computerChoice = availableSquares[randomIndex];

    setTimeout(() => {
      const newSquares = [...squares];
      newSquares[computerChoice] = computerSymbol;
      setSquares(newSquares);
      setIsPlayerTurn(true);
    }, 1000);
  }

  useEffect(() => {
    const checkWinner = (squares) => {
      for (let combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return squares[a];
        }
      }
      return null;
    };

    const winner = checkWinner(squares);
    if (winner) {
      setWinning(winner);
    } else if (squares.every((square) => square !== null)) {
      setWinning("Draw");
    } else if (!isPlayerTurn) {
      computerMove();
    }
  }, [squares, isPlayerTurn]);

  function handlePlayerChoice(choice) {
    setPlayerIsX(choice === "X");
    setGameStarted(true);
    setIsPlayerTurn(choice === "X");
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl mb-4">Choose Your Symbol</p>
        <div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mr-4"
            onClick={() => handlePlayerChoice("X")}
          >
            Play as X
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handlePlayerChoice("O")}
          >
            Play as O
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!winning && (
        <p className="text-2xl mb-5 font-semibold ">
          Player {isPlayerTurn ? playerSymbol : "Computer"}'s Turn
        </p>
      )}
      <div className="grid grid-cols-3 grid-rows-3 gap-2">
        {squares.map((item, index) => (
          <Squares
            key={index}
            value={item}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>

      {winning && winning !== "Draw" && (
        <div className="mt-4 text-xl">Winner: {winning}!</div>
      )}
      {winning === "Draw" && <div className="mt-4 text-xl">It's a draw!</div>}
      {winning && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            setSquares(Array(9).fill(null));
            setWinning(null);
            setIsPlayerTurn(playerIsX);
          }}
        >
          Reset Game
        </button>
      )}
    </div>
  );
}

export default Board;

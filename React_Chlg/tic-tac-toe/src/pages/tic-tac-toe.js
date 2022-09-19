import { useState, useEffect, useRef } from "react";

import { gameGrid, options, checkWinner } from "../utils";

const TicTacToe = () => {
  const [currentUser, setCurrentUser] = useState(0);

  const gameState = useRef(gameGrid);

  const [displayGrid, setDisplayGrid] = useState(null);

  useEffect(() => {
    if (gameState.current) {
      setDisplayGrid(
        gameState.current.map((row, i) =>
          row.map((val, j) => (
            <div
              id={`${i}=${j}`}
              key={`${i}=${j}`}
              className={`${val.split(" ")[0]}`}
              onClick={(e) => setUserPlaceholder(e.target.id.split("="))}
            >
              {val.split(" ")[1]}
            </div>
          ))
        )
      );
    }
  }, [currentUser]);

  const toggleUser = () => setCurrentUser((prev) => (prev === 1 ? 0 : 1));

  const setUserPlaceholder = ([row, col]) => {
    if (
      gameState.current &&
      !options.includes(gameState.current[row][col].split(" ").at(-1))
    ) {
      gameState.current[row][col] += ` ${options[currentUser]}`;
      toggleUser();
      setTimeout(() => checkWinner(gameState.current), 0);
    }
  };

  return <div className="game-area">{displayGrid}</div>;
};

export default TicTacToe;

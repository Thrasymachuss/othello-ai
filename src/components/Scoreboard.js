import React from "react";

const Scoreboard = ({
  blackScore,
  whiteScore,
  currentPlayer,
  players: [blackPlayer, whitePlayer],
  thinking,
}) => {
  return (
    <div className="scoreboard">
      <div className={`player-col${currentPlayer === 1 ? " highlighted" : ""}`}>
        <div className="score score-black">{blackScore}</div>
        <div className="player-name">
          {thinking && currentPlayer === 1 ? "Thinking..." : blackPlayer}
        </div>
      </div>
      <div className={`player-col${currentPlayer === 2 ? " highlighted" : ""}`}>
        <div className="score score-white">{whiteScore}</div>
        <div className="player-name">
          {thinking && currentPlayer === 2 ? "Thinking..." : whitePlayer}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;

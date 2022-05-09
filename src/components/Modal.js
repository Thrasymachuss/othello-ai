import React, { useState } from "react";
import { aiMap } from "../othello-logic/players/aiHelpers";

const Modal = ({
  showModal,
  startNewGame,
  closeModal,
  showEndgame,
  closeEndgame,
  blackScore,
  whiteScore,
}) => {
  const [blackPlayer, setBlackPlayer] = useState("Human");
  const [whitePlayer, setWhitePlayer] = useState("Human");
  const winMsg =
    blackScore > whiteScore
      ? "Black Wins!"
      : blackScore < whiteScore
      ? "White Wins!"
      : "Draw!";
  const resetForm = () => {
    setBlackPlayer("Human");
    setWhitePlayer("Human");
  };
  const handleSubmit = (e) => {
    startNewGame(e, blackPlayer, whitePlayer);
    resetForm();
  };
  const handleCloseModal = () => {
    closeModal();
    resetForm();
    setTimeout(() => closeEndgame(), 400);
  };
  const getFormOptions = () => {
    return [...aiMap.keys()].map((key, index) => (
      <option key={index} value={key}>
        {key}
      </option>
    ));
  };
  return (
    <div className={`backdrop${showModal ? " visible" : ""}`}>
      <div className="modal">
        <div className="modal-header">
          <h2>{showEndgame ? winMsg : "New Game"}</h2>
          <div className="x-btn" onClick={handleCloseModal}>
            X
          </div>
        </div>
        {showEndgame ? (
          <div className="endgame">
            <div className="final-score">{`${blackScore} : ${whiteScore}`}</div>
            <button
              className="primary-btn new-game-btn full-width"
              type="button"
              onClick={closeEndgame}
            >
              New Game
            </button>
            <button
              className="primary-btn close-btn full-width"
              type="button"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        ) : (
          <form className="new-game-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="black-player-select">Black Player:</label>
              <select
                id="black-player-select"
                value={blackPlayer}
                onChange={(e) => setBlackPlayer(e.target.value)}
              >
                {getFormOptions()}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="white-player-select">White Player:</label>
              <select
                id="white-player-select"
                value={whitePlayer}
                onChange={(e) => setWhitePlayer(e.target.value)}
              >
                {getFormOptions()}
              </select>
            </div>
            <button
              type="submit"
              className="primary-btn new-game-btn full-width"
            >
              Start New Game
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;

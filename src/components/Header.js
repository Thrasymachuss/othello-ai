import React from "react";

const Header = ({ openModal }) => {
  return (
    <header className="header">
      <div className="header-inner">
        <h1>Othello</h1>
        <button className="primary-btn new-game-btn" onClick={openModal}>
          New Game
        </button>
      </div>
    </header>
  );
};

export default Header;

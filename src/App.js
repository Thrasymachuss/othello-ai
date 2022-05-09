import Header from "./components/Header";
import Board from "./components/Board";
import Modal from "./components/Modal";
import Description from "./components/Description";
import { useState } from "react";
import Scoreboard from "./components/Scoreboard";
import { Position } from "./othello-logic/game/position";
import { useEffect } from "react";
import { getAiClass } from "./othello-logic/players/aiHelpers";
import { useCallback } from "react";

function App() {
  const [position, setPosition] = useState(new Position());
  const [players, setPlayers] = useState(["Human", "Human"]);
  const [aiClasses, setAiClasses] = useState([null, null]);
  const [showModal, setShowModal] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [showEndgame, setShowEndgame] = useState(false);

  const startThinking = useCallback(
    (index) => {
      setThinking(true);
      setTimeoutId(
        setTimeout(() => {
          const move = aiClasses[index].getMove(position);
          setPosition(position.playMove(move));
          setThinking(false);
        }, 500)
      );
    },
    [setThinking, aiClasses, position]
  );

  const openEndgame = useCallback(() => {
    setShowEndgame(true);
    setShowModal(true);
  }, [setShowEndgame, setShowModal]);

  const isValidHumanMove = (id) => {
    if (players[position.playerToMove - 1] !== "Human") return;
    return position.validMoves.includes(id);
  };

  const humanPlayMove = (e) => {
    const move = e.target.id;
    if (isValidHumanMove(move)) {
      setPosition(position.playMove(move));
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const closeEndgame = () => {
    setShowEndgame(false);
  };
  const startNewGame = (e, blackPlayer, whitePlayer) => {
    e.preventDefault();
    setPosition(new Position());
    setPlayers([blackPlayer, whitePlayer]);
    setAiClasses([getAiClass(blackPlayer), getAiClass(whitePlayer)]);
    setThinking(false);
    clearTimeout(timeoutId);
    closeModal();
  };

  useEffect(() => {
    if (!position.isPlaying) {
      openEndgame();
      return;
    }

    if (!position.validMoves.length && position.isPlaying) {
      setPosition(position.passTurn());
      return;
    }

    const index = position.playerToMove - 1;
    if (players[index] === "Human" || !position.validMoves.length) return;

    startThinking(index);
  }, [position, aiClasses, players, startThinking, openEndgame]);
  return (
    <div className="app">
      <Header openModal={openModal} />
      <main className="main">
        <Scoreboard
          blackScore={position.blackTiles}
          whiteScore={position.whiteTiles}
          currentPlayer={position.playerToMove}
          players={players}
          thinking={thinking}
        />
        <Board
          board={position.board}
          humanPlayMove={humanPlayMove}
          isValidHumanMove={isValidHumanMove}
        />
      </main>
      <Description />
      <Modal
        showModal={showModal}
        startNewGame={startNewGame}
        closeModal={closeModal}
        showEndgame={showEndgame}
        closeEndgame={closeEndgame}
        blackScore={position.blackTiles}
        whiteScore={position.whiteTiles}
      />
    </div>
  );
}

export default App;

import React from "react";
import Cell from "./Cell";
import { rowColToText } from "../othello-logic/game/helpers";

const Board = ({ board, humanPlayMove, isValidHumanMove }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((col, colIndex) => {
          const tileId = rowColToText(rowIndex, colIndex);
          return (
            <Cell
              key={tileId}
              id={tileId}
              value={col}
              humanPlayMove={humanPlayMove}
              validHumanMove={isValidHumanMove(tileId)}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;

import React, { useState, useEffect } from "react";

const Cell = ({ value, id, humanPlayMove, validHumanMove }) => {
  const [tileIsPlaced, setTileIsPlaced] = useState(false);
  useEffect(() => {
    if (value) {
      setTimeout(() => setTileIsPlaced(true), 0);
    } else {
      setTileIsPlaced(false);
    }
  }, [value]);
  return (
    <div
      className={`cell${validHumanMove ? " valid-move" : ""}`}
      id={id}
      onClick={(id) => humanPlayMove(id)}
    >
      {value ? (
        <div
          className={`token${value === 2 ? " flipped" : ""}${
            tileIsPlaced ? " animate" : ""
          }`}
        >
          <div className="token-child black-side"></div>
          <div className="token-child white-side"></div>
        </div>
      ) : validHumanMove ? (
        <div className="valid-move-circle"></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cell;

const corners = [
  [0, 0],
  [0, 7],
  [7, 0],
  [7, 7],
];

const scoreDiffEval = (Position, currentPlayer, opponent) => {
  const myScore =
    currentPlayer === 1 ? Position.blackTiles : Position.whiteTiles;
  const opponentScore =
    opponent === 1 ? Position.blackTiles : Position.whiteTiles;
  return (100 * (myScore - opponentScore)) / (myScore + opponentScore);
};

const numMovesEval = (Position) => {
  const opponentNumMoves = Position.calcValidMoves(false).length;
  const myNumMoves = Position.validMoves.length;
  return (
    (100 * (myNumMoves - opponentNumMoves)) /
    (myNumMoves + opponentNumMoves + 1)
  );
};

const cornersEval = (Position, currentPlayer, opponent) => {
  let myCorners = 0;
  let opponentCorners = 0;

  for (const [row, col] of corners) {
    if (Position.board[row][col] === currentPlayer) {
      myCorners++;
    } else if (Position.board[row][col] === opponent) {
      opponentCorners++;
    }
  }

  return (
    (100 * (myCorners - opponentCorners)) / (myCorners + opponentCorners + 1)
  );
};

export const staticEvaluation = (Position, opponentMove = true) => {
  const currentPlayer = Position.playerToMove === 1 ? 1 : 2;
  const opponent = Position.playerToMove === 2 ? 1 : 2;
  const coeff = opponentMove ? -1 : 1;
  const evaluation =
    coeff *
    (3 * numMovesEval(Position) +
      scoreDiffEval(Position, currentPlayer, opponent) +
      3 * cornersEval(Position, currentPlayer, opponent));

  return Number.isNaN(evaluation)
    ? coeff * Number.POSITIVE_INFINITY
    : evaluation;
};

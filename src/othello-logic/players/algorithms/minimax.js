export const minimax = (
  Position,
  depth,
  alpha,
  beta,
  maximizingPlayer,
  evalFunc
) => {
  if (depth === 0 || !Position.isPlaying) {
    return evalFunc(Position, !maximizingPlayer);
  }

  if (!Position.validMoves.length) {
    return minimax(
      Position.passTurn(),
      depth - 1,
      alpha,
      beta,
      maximizingPlayer,
      evalFunc
    );
  }

  if (maximizingPlayer) {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (const move of Position.validMoves) {
      const currentEval = minimax(
        Position.playMove(move),
        depth - 1,
        alpha,
        beta,
        false,
        evalFunc
      );
      maxEval = Math.max(maxEval, currentEval);
      const newAlpha = Math.max(alpha, currentEval);
      if (beta <= newAlpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (const move of Position.validMoves) {
      const currentEval = minimax(
        Position.playMove(move),
        depth - 1,
        alpha,
        beta,
        true,
        evalFunc
      );
      minEval = Math.min(minEval, currentEval);
      const newBeta = Math.min(beta, currentEval);
      if (newBeta <= alpha) {
        break;
      }
    }

    return minEval;
  }
};

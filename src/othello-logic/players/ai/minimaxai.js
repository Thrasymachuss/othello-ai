import { GenericAI } from "./genericai";
import { staticEvaluation } from "../algorithms/staticEvaluation";
import { minimax } from "../algorithms/minimax";

export class MinimaxAI extends GenericAI {
  constructor(depth) {
    super();
    this.depth = depth;
  }

  evaluateMoves(Position) {
    const evals = Position.validMoves.map((move) =>
      minimax(
        Position.playMove(move),
        this.depth,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        false,
        staticEvaluation
      )
    );
    return evals;
  }
}

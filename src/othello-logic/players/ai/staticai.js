import { GenericAI } from "./genericai";
import { staticEvaluation } from "../algorithms/staticEvaluation";

export class StaticAI extends GenericAI {
  evaluateMoves(Position) {
    const evals = Position.validMoves.map((move) =>
      staticEvaluation(Position.playMove(move))
    );
    return evals;
  }
}

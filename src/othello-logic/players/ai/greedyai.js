import { GenericAI } from "./genericai";

export class GreedyAI extends GenericAI {
  evaluateMoves(Position) {
    const currentPlayer = Position.playerToMove;
    const validMoves = Position.validMoves;
    const currentNumPieces =
      currentPlayer === 1 ? Position.blackTiles : Position.whiteTiles;
    const moveEvals = [];

    for (const move of validMoves) {
      const NewPosition = Position.playMove(move);
      const newNumPieces =
        currentPlayer === 1 ? NewPosition.blackTiles : NewPosition.whiteTiles;
      const piecesDiff = newNumPieces - currentNumPieces;
      moveEvals.push(piecesDiff);
    }

    return moveEvals;
  }
}

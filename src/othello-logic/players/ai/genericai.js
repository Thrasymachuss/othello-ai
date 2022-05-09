export class GenericAI {
  evaluateMoves(Position) {
    return Array(Position.validMoves.length).fill(0);
  }

  getMove(Position) {
    const moveEvals = this.evaluateMoves(Position);
    const bestEval = Math.max(...moveEvals);
    const bestEvalIndexes = moveEvals
      .map((evaluation, i) => (evaluation === bestEval ? i : ""))
      .filter((i) => typeof i === "number");
    const selectedIndex =
      bestEvalIndexes[Math.floor(Math.random() * bestEvalIndexes.length)];
    return Position.validMoves[selectedIndex];
  }
}

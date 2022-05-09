import { rowColToText, textToRowCol, directions } from "./helpers";

export class Position {
  constructor(
    playerToMove = 1,
    turnCount = 1,
    board = null,
    prevMovePassed = false
  ) {
    this.playerToMove = playerToMove;
    this.turnCount = turnCount;
    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
    [this.blackTiles, this.whiteTiles] = this.countTiles();
    this.validMoves = this.calcValidMoves();
    this.prevMovePassed = prevMovePassed;
    this.isPlaying = Boolean(this.validMoves.length || !this.prevMovePassed);
    this.winner = this.isPlaying
      ? null
      : this.blackTiles < this.whiteTiles
      ? 2
      : this.blackTiles > this.whiteTiles
      ? 1
      : 0;

    if (!this.isPlaying) {
      this.playerToMove = 0;
    }
  }

  passTurn() {
    if (this.validMoves.length) return;
    const newPlayerToMove = this.playerToMove === 1 ? 2 : 1;
    return new Position(newPlayerToMove, this.turnCount, this.board, true);
  }

  playMove(move) {
    if (!this.isPlaying || !this.validMoves.includes(move)) return null;

    const [playedRowIndex, playedColIndex] = textToRowCol(move);
    const newPlayerToMove = this.playerToMove === 1 ? 2 : 1;
    const newTurnCount = this.turnCount + 1;

    const capturedTiles = directions.reduce(
      (prevCapturedTiles, direction) => [
        ...prevCapturedTiles,
        ...this.parseTiles(playedRowIndex, playedColIndex, direction),
      ],
      []
    );

    const newBoard = this.board.map((row, currentRowIndex) =>
      row.map((col, currentColIndex) => {
        const thisTilePlayed =
          playedRowIndex === currentRowIndex &&
          playedColIndex === currentColIndex;
        return thisTilePlayed ||
          capturedTiles.includes(rowColToText(currentRowIndex, currentColIndex))
          ? this.playerToMove
          : col;
      })
    );

    return new Position(newPlayerToMove, newTurnCount, newBoard);
  }

  calcValidMoves(thisPlayer = true) {
    const validMoves = [];
    this.board.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        // Immediately return if tile is occupied
        if (col !== 0) return;

        // Check each of the 8 directions for tiles that can be captured
        for (const direction of directions) {
          if (
            this.parseTiles(rowIndex, colIndex, direction, thisPlayer).length
          ) {
            validMoves.push(rowColToText(rowIndex, colIndex));
            break;
          }
        }
      });
    });

    return validMoves;
  }

  parseTiles(rowIndex, colIndex, direction, thisPlayer = true) {
    const capturedTiles = [];
    const [moveX, moveY] = direction;
    const playerToMove = thisPlayer
      ? this.playerToMove
      : this.playerToMove === 1
      ? 2
      : 1;
    let encounteredEnemyTile = false;

    while (true) {
      rowIndex += moveY;
      colIndex += moveX;

      if (
        rowIndex < 0 ||
        rowIndex > 7 ||
        colIndex < 0 ||
        colIndex > 7 ||
        this.board[rowIndex][colIndex] === 0 ||
        (this.board[rowIndex][colIndex] === playerToMove &&
          !encounteredEnemyTile) ||
        (this.board[rowIndex][colIndex] === playerToMove &&
          !encounteredEnemyTile)
      )
        return [];

      encounteredEnemyTile = true;
      if (this.board[rowIndex][colIndex] === playerToMove) return capturedTiles;

      capturedTiles.push(rowColToText(rowIndex, colIndex));
    }
  }

  countTiles() {
    let blackTiles = 0;
    let whiteTiles = 0;

    for (const row of this.board) {
      for (const cell of row) {
        if (cell === 1) {
          blackTiles++;
        } else if (cell === 2) {
          whiteTiles++;
        }
      }
    }

    return [blackTiles, whiteTiles];
  }
}

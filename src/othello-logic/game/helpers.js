const numToLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];
const letterToNum = new Map([
  ["A", 0],
  ["B", 1],
  ["C", 2],
  ["D", 3],
  ["E", 4],
  ["F", 5],
  ["G", 6],
  ["H", 7],
]);

export const directions = [
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
];

export const rowColToText = (row, col) => {
  const number = 8 - row;
  const letter = numToLetter[col];
  return `${letter}${number}`;
};

export const textToRowCol = (move) => {
  const [letter, number] = move.split("");
  const row = 8 - number;
  const col = letterToNum.get(letter);
  return [row, col];
};

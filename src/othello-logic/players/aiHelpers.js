import { GenericAI } from "./ai/genericai";
import { GreedyAI } from "./ai/greedyai";
import { StaticAI } from "./ai/staticai";
import { MinimaxAI } from "./ai/minimaxai";

export const aiMap = new Map([
  ["Human", null],
  ["GreedyAI", new GreedyAI()],
  ["RandomAI", new GenericAI()],
  ["StaticAI", new StaticAI()],
  ["MinimaxAI+1", new MinimaxAI(1)],
  ["MinimaxAI+2", new MinimaxAI(2)],
  ["MinimaxAI+3", new MinimaxAI(3)],
]);

export const getAiClass = (playerName) => {
  for (const key of aiMap.keys()) {
    if (playerName === key) return aiMap.get(key);
  }
  return null;
};

import { Prizes } from "./prizes";

export type Roll = {
  symbols: Prizes[];
  isWinningCombination: boolean;
};
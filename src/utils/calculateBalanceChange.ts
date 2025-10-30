import { prizeToValueMap } from "@/constants";
import { Roll } from "@/types";

export const calculateBalanceChange = (roll: Roll) => {
  return roll.isWinningCombination ? prizeToValueMap[roll.symbols[0]] : -1;
};
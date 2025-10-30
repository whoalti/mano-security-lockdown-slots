import {prizeToValueMap} from "@/constants";
import {CheatThresholds} from "@/constants/cheat-thresholds";
import {SLOTS_COUNT} from "@/constants/slots";
import {Prizes} from "@/types";
import seedrandom from "seedrandom";

export class SlotsGame {
  private rng: seedrandom.PRNG;

  constructor(seed: string) {
    this.rng = seedrandom(seed);
  }

  generateRandomValue(): number {
    return this.rng();
  }

  generateRandomSymbol(): Prizes {
    const randomValue = this.generateRandomValue();
    const symbols = Object.keys(prizeToValueMap).filter(
      (key): key is Prizes => key in prizeToValueMap,
    );
    const randomIndex = Math.floor(randomValue * symbols.length);
    return symbols[randomIndex];
  }

  generateRandomSymbols(): Prizes[] {
    return Array.from({length: SLOTS_COUNT}, () => this.generateRandomSymbol());
  }

  isWinningCombination(symbols: Prizes[]): boolean {
    return symbols.every((symbol) => symbol === symbols[0]);
  }

  getCheatProbability(creditAmount: number) {
    if (creditAmount < CheatThresholds.low) {
      return 0;
    }

    if (
      creditAmount > CheatThresholds.low &&
      creditAmount < CheatThresholds.high
    ) {
      return 0.3;
    }

    return 0.6;
  }

  getIfShouldCheat(creditAmount: number) {
    const probability = this.getCheatProbability(creditAmount);
    const temp = this.generateRandomValue();
    return temp < probability;
  }

  rollHelper() {
    const symbols = this.generateRandomSymbols();
    const isWinningCombination = this.isWinningCombination(symbols);
    return {symbols, isWinningCombination};
  }

  roll(creditAmount: number) {
    const roll = this.rollHelper();
    if (roll.isWinningCombination) {
      if (this.getIfShouldCheat(creditAmount)) {
        return this.rollHelper();
      }
    }
    return roll;
  }
}

export const slotsGame = new SlotsGame("100");

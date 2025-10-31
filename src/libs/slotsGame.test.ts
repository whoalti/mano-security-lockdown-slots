import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SlotsGame } from "@/libs/slotsGame";
import { SLOTS_COUNT } from "@/constants/slots";
import { prizeToValueMap } from "@/constants";
import { Prizes } from "@/types/prizes";

describe("SlotsGame", () => {
  let game: SlotsGame;

  beforeEach(() => {
    game = new SlotsGame("seed");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("produces a deterministic random sequence for the same seed", () => {
    const a = new SlotsGame("same-seed");
    const b = new SlotsGame("same-seed");

    const seqA = Array.from({ length: 5 }, () => a.generateRandomValue());
    const seqB = Array.from({ length: 5 }, () => b.generateRandomValue());

    expect(seqA).toEqual(seqB);
    expect(seqA.every((v) => v >= 0 && v < 1)).toBe(true);
  });

  it("generateRandomSymbol returns a valid prize", () => {
    const symbol = game.generateRandomSymbol();
    const validSymbols = Object.keys(prizeToValueMap);
    expect(validSymbols).toContain(symbol);
  });

  it("generateRandomSymbols returns SLOTS_COUNT symbols and all are valid", () => {
    const symbols = game.generateRandomSymbols();
    const validSymbols = new Set(Object.keys(prizeToValueMap));
    expect(symbols).toHaveLength(SLOTS_COUNT);
    for (const s of symbols) {
      expect(validSymbols.has(s)).toBe(true);
    }
  });

  it("isWinningCombination correctly detects wins and losses", () => {
    expect(
      game.isWinningCombination([
        Prizes.Cherry,
        Prizes.Cherry,
        Prizes.Cherry,
      ])
    ).toBe(true);
    expect(
      game.isWinningCombination([
        Prizes.Cherry,
        Prizes.Orange,
        Prizes.Cherry,
      ])
    ).toBe(false);
  });

  it("getCheatProbability respects thresholds (exclusive middle range)", () => {
    expect(game.getCheatProbability(39)).toBe(0);
    expect(game.getCheatProbability(40)).toBe(0.6);
    expect(game.getCheatProbability(50)).toBe(0.3);
    expect(game.getCheatProbability(60)).toBe(0.6);
    expect(game.getCheatProbability(61)).toBe(0.6);
  });

  it("getIfShouldCheat compares against probability using generateRandomValue", () => {
    const randSpy = vi.spyOn(game, "generateRandomValue");

    randSpy.mockReturnValue(0.29);
    expect(game.getIfShouldCheat(50)).toBe(true);

    randSpy.mockReturnValue(0.3);
    expect(game.getIfShouldCheat(50)).toBe(false);

    randSpy.mockReturnValue(0.0);
    expect(game.getIfShouldCheat(10)).toBe(false);
  });

  it("rollHelper returns symbols and computed isWinningCombination", () => {
    const genSymbolsSpy = vi
      .spyOn(game, "generateRandomSymbols")
      .mockReturnValue([Prizes.Lemon, Prizes.Lemon, Prizes.Lemon]);

    let roll = game.rollHelper();
    expect(roll.isWinningCombination).toBe(true);
    expect(roll.symbols).toEqual([Prizes.Lemon, Prizes.Lemon, Prizes.Lemon]);

    genSymbolsSpy.mockReturnValue([
      Prizes.Lemon,
      Prizes.Orange,
      Prizes.Lemon,
    ]);
    roll = game.rollHelper();
    expect(roll.isWinningCombination).toBe(false);
    expect(roll.symbols).toEqual([
      Prizes.Lemon,
      Prizes.Orange,
      Prizes.Lemon,
    ]);
  });

  it("roll returns rerolled result when cheating on a winning combination", () => {
    const helperSpy = vi.spyOn(game, "rollHelper");
    helperSpy.mockReturnValueOnce({
      symbols: [Prizes.Cherry, Prizes.Cherry, Prizes.Cherry],
      isWinningCombination: true,
    });
    helperSpy.mockReturnValueOnce({
      symbols: [Prizes.Cherry, Prizes.Orange, Prizes.Lemon],
      isWinningCombination: false,
    });

    const cheatSpy = vi.spyOn(game, "getIfShouldCheat").mockReturnValue(true);

    const result = game.roll(100);
    expect(result).toEqual({
      symbols: [Prizes.Cherry, Prizes.Orange, Prizes.Lemon],
      isWinningCombination: false,
    });
    expect(cheatSpy).toHaveBeenCalledWith(100);
  });

  it("roll returns original roll when not cheating or not a win", () => {
    const helperSpy = vi.spyOn(game, "rollHelper");
    helperSpy.mockReturnValueOnce({
      symbols: [Prizes.Cherry, Prizes.Orange, Prizes.Lemon],
      isWinningCombination: false,
    });

    const cheatSpy = vi.spyOn(game, "getIfShouldCheat");

    const result = game.roll(100);
    expect(result).toEqual({
      symbols: [Prizes.Cherry, Prizes.Orange, Prizes.Lemon],
      isWinningCombination: false,
    });
    expect(cheatSpy).not.toHaveBeenCalled();
  });
});



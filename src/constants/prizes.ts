import { Prizes } from "@/types/prizes";

export const prizeToValueMap: Record<Prizes, number> = {
    [Prizes.Cherry]: 10,
    [Prizes.Orange]: 20,
    [Prizes.Lemon]: 30,
    [Prizes.Watermelon]: 40,
}

export const prizeToSymbolMap: Record<Prizes, string> = {
    [Prizes.Cherry]: "🍒",
    [Prizes.Orange]: "🍊",
    [Prizes.Lemon]: "🍋",
    [Prizes.Watermelon]: "🍉",
}
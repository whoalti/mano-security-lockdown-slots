import { prizeToValueMap } from '@/constants';
import { Roll } from './../../../types/roll';
import { create } from 'zustand';
import {persist} from "zustand/middleware";


const USER_STORAGE_KEY = "user-storage";
interface UserState {
  credits: number;
  setCredits: (credits: number) => void;
  incrementCredits: (amount: number) => void;
  decrementCredits: (amount: number) => void;
  handleRoll: (roll: Roll) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      credits: 10,
      setCredits: (credits) => set({credits}),
      incrementCredits: (amount) =>
        set((state) => ({credits: state.credits + amount})),
      decrementCredits: (amount) =>
        set((state) => ({credits: state.credits - amount})),
      handleRoll: (roll) => {
        const balanceChange = roll.isWinningCombination ? prizeToValueMap[roll.symbols[0]] : -1;
        console.log("balanceChange", balanceChange);
        set((state) => ({credits: state.credits + balanceChange}));
      },
    }),
    {
      name: USER_STORAGE_KEY,
    },
  ),
);

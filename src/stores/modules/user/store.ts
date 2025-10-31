import { Roll } from '@/types/roll';
import { create } from 'zustand';
import {persist} from "zustand/middleware";
import { calculateBalanceChange } from '@/utils/calculateBalanceChange';


const USER_STORAGE_KEY = "user-storage";
interface UserState {
  credits: number;
  vaultCredits: number;
  isGameInProgress: boolean;
  setCredits: (credits: number) => void;
  incrementCredits: (amount: number) => void;
  decrementCredits: (amount: number) => void;
  handleRoll: (roll: Roll) => void;
  rollResult: Roll | null;
  setRollResult: (roll: Roll | null) => void;
  pendingRollResult: Roll | null;
  setPendingRollResult: (roll: Roll | null) => void;
  applyPendingRollResult: () => void;
  setGameInProgress: (inProgress: boolean) => void;
  cashIn: () => void;
  cashOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      credits: 10,
      vaultCredits: 0,
      isGameInProgress: false,
      rollResult: null,
      pendingRollResult: null,
      setCredits: (credits) => set({credits}),
      incrementCredits: (amount) =>
        set((state) => ({credits: state.credits + amount})),
      decrementCredits: (amount) =>
        set((state) => ({credits: state.credits - amount})),
      handleRoll: (roll) => {
        if (roll.isWinningCombination) {
          const winnings = calculateBalanceChange(roll);
          set((state) => ({credits: state.credits + winnings}));
        }
      },
      setRollResult: (roll) => set({rollResult: roll}),
      setPendingRollResult: (roll) => set({pendingRollResult: roll}),
      applyPendingRollResult: () => {
        const roll = get().pendingRollResult;
        if (!roll) return;
        if (roll.isWinningCombination) {
          const winnings = calculateBalanceChange(roll);
          set((state) => ({credits: state.credits + winnings, pendingRollResult: null}));
        } else {
          set({pendingRollResult: null});
        }
      },
      setGameInProgress: (inProgress) => set({isGameInProgress: inProgress}),
      cashIn: () => {
        const state = get();
        if (state.isGameInProgress) {
          console.warn("Cannot cash in while game is in progress");
          return;
        }
        set((state) => ({
          credits: state.credits + state.vaultCredits,
          vaultCredits: 0,
        }));
      },
      cashOut: () => {
        const state = get();
        if (state.isGameInProgress) {
          console.warn("Cannot cash out while game is in progress");
          return;
        }
        set((state) => ({
          vaultCredits: state.vaultCredits + state.credits,
          credits: 0,
        }));
      },
    }),
    
    {
      name: USER_STORAGE_KEY,
      partialize: (state) => ({
        credits: state.credits,
        vaultCredits: state.vaultCredits,
      }),
    },
  ),
);

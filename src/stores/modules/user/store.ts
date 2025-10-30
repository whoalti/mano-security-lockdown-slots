import { Roll } from '@/types/roll';
import { create } from 'zustand';
import {persist} from "zustand/middleware";
import { calculateBalanceChange } from '@/utils/calculateBalanceChange';


const USER_STORAGE_KEY = "user-storage";
interface UserState {
  credits: number;
  setCredits: (credits: number) => void;
  incrementCredits: (amount: number) => void;
  decrementCredits: (amount: number) => void;
  handleRoll: (roll: Roll) => void;
  rollResult: Roll | null;
  setRollResult: (roll: Roll | null) => void;
  pendingRollResult: Roll | null;
  setPendingRollResult: (roll: Roll | null) => void;
  applyPendingRollResult: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      credits: 10,
      rollResult: null,
      pendingRollResult: null,
      setCredits: (credits) => set({credits}),
      incrementCredits: (amount) =>
        set((state) => ({credits: state.credits + amount})),
      decrementCredits: (amount) =>
        set((state) => ({credits: state.credits - amount})),
      handleRoll: (roll) => {
        const balanceChange = calculateBalanceChange(roll);
        set((state) => ({credits: state.credits + balanceChange}));
      },
      setRollResult: (roll) => set({rollResult: roll}),
      setPendingRollResult: (roll) => set({pendingRollResult: roll}),
      applyPendingRollResult: () => {
        const roll = get().pendingRollResult;
        if (!roll) return;
        const balanceChange = calculateBalanceChange(roll);
        set((state) => ({credits: state.credits + balanceChange, pendingRollResult: null}));
      },
    }),
    
    {
      name: USER_STORAGE_KEY,
      partialize: (state) => ({
        credits: state.credits,
      }),
    },
  ),
);

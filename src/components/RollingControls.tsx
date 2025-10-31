"use client";

import {useUserStore} from "@/stores/modules/user/store";
import {ButtonHTMLAttributes, useCallback, useMemo} from "react";

type RollingControlsProps = {
  refetch: () => void;
  isRollDisabled: boolean;
  isCashedOut?: boolean;
  isCreditLow?: boolean;
  setIsDisabled: (isDisabled: boolean) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const getCtaContent = (
  isCreditLow: boolean,
  isCashedOut: boolean,
  isRollDisabled: boolean,
) => {
  if (isCreditLow) {
    return {
      leading: <span>💰</span>,
      label: "Add Credits to Play",
      trailing: null,
    };
  }
  if (isCashedOut) {
    return {
      leading: <span>💰</span>,
      label: "Cash In to Play",
      trailing: null,
    };
  }
  if (isRollDisabled) {
    return {
      leading: <span className="animate-spin">🎰</span>,
      label: "Spinning...",
      trailing: null,
    };
  }
  return {
    leading: <span>🎲</span>,
    label: "Spin Now",
    trailing: <span>🎲</span>,
  };
};

export const RollingControls = ({
  refetch,
  isRollDisabled,
  isCashedOut = false,
  isCreditLow = false,
  setIsDisabled,
  ...props
}: RollingControlsProps) => {
  const {
    credits,
    vaultCredits,
    cashIn,
    incrementCredits,
    decrementCredits,
    setGameInProgress,
    setRollResult,
  } = useUserStore();

  const ctaContent = useMemo(() => {
    return getCtaContent(isCreditLow, isCashedOut, isRollDisabled);
  }, [isCreditLow, isCashedOut, isRollDisabled]);

  const handlePlay = useCallback(() => {
    if (credits === 0) {
      if (typeof window !== "undefined") {
        if (vaultCredits > 0) {
          const shouldCashIn = window.confirm(
            `You have 0 playable credits but ${vaultCredits} credits in vault. Cash in to continue playing?`,
          );
          if (shouldCashIn) {
            cashIn();
          }
        } else {
          const shouldAdd = window.confirm(
            "You have 0 credits. Add 10 credits?",
          );
          if (shouldAdd) {
            incrementCredits(10);
          }
        }
      }
      return;
    }
    decrementCredits(1);
    setGameInProgress(true);
    setIsDisabled(true);
    setRollResult(null);
    refetch();
  }, [credits, vaultCredits]);

  return (
    <div className="relative flex flex-col items-center gap-3">
      <button
        onClick={handlePlay}
        disabled={isRollDisabled}
        className={`
          relative px-10 py-4 text-2xl font-bold rounded-xl text-white shadow-lg
          transition-transform duration-150 disabled:opacity-50 disabled:cursor-not-allowed
          active:scale-95
        `}
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent-primary) 0%, var(--color-accent-primary-dark) 100%)",
          boxShadow:
            "0 0 20px rgba(var(--rgb-accent-primary-glow) / 0.3), 0 6px 20px rgba(0,0,0,.4)",
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
          {ctaContent.leading}
          {ctaContent.label}
          {ctaContent.trailing}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,.25) 50%, transparent 100%)",
            opacity: 0.25,
          }}
        />
      </button>
    </div>
  );
};

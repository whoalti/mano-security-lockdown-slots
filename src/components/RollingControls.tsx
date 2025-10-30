"use client";

import {ButtonHTMLAttributes} from "react";

type RollingControlsProps = {
  onRoll: () => void;
  isRollDisabled: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const RollingControls = ({
  onRoll,
  isRollDisabled,
  ...props
}: RollingControlsProps) => {
  const handleClick = () => {
    onRoll();
  };

  return (
    <div className="relative flex flex-col items-center gap-3">
      <button
        onClick={handleClick}
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
          {isRollDisabled ? (
            <>
              <span className="animate-spin">🎰</span>
              Spinning...
            </>
          ) : (
            <>
              <span>🎲</span>
              Spin Now
              <span>🎲</span>
            </>
          )}
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

"use client";

type BalanceControlsProps = {
  onCashIn: () => void;
  onCashOut: () => void;
  canCashIn: boolean;
  canCashOut: boolean;
};

export const BalanceControls = ({
  onCashIn,
  onCashOut,
  canCashIn,
  canCashOut,
}: BalanceControlsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onCashIn}
        disabled={!canCashIn}
        className="px-4 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          color: "white",
          boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
        }}
      >
        💰 Cash In
      </button>
      <button
        onClick={onCashOut}
        disabled={!canCashOut}
        className="px-4 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
          color: "white",
          boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
        }}
      >
        🏦 Cash Out
      </button>
    </div>
  );
};

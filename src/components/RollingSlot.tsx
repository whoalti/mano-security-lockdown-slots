"use client";
import {prizeToSymbolMap} from "@/constants";
import {useUserStore} from "@/stores/modules/user/store";
import {Prizes} from "@/types";
import {useEffect, useMemo, useState} from "react";

interface RollingCellProps {
  index: number;
  isRolling: boolean;
}

export const RollingCell = ({index, isRolling}: RollingCellProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const rollingTimeout = (index + 1) * 1000;
  const {rollResult} = useUserStore();

  const repeatedPrizes = useMemo(() => {
    const all = Object.values(Prizes);
    return [...all, ...all];
  }, []);

  useEffect(() => {
    if (rollResult === null) {
      setIsVisible(false);
      return;
    }
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, rollingTimeout);
    return () => clearTimeout(timeout);
  }, [rollResult, rollingTimeout]);

  const isSpinning = isRolling && (rollResult === null || !isVisible);

  return (
    <div className="slot-window">
      {isSpinning ? (
        <div
          className="slot-reel slot-reel--loop"
          style={{animationDuration: `${1 + index * 0.2}s`}}
        >
          {repeatedPrizes.map((p, i) => (
            <div className="slot-cell" key={`${p}-${i}`} aria-hidden>
              {prizeToSymbolMap[p]}
            </div>
          ))}
        </div>
      ) : (
        <div className="slot-cell slot-cell--appearance">
          {rollResult ? prizeToSymbolMap[rollResult.symbols[index]] : "🤑"}
        </div>
      )}
    </div>
  );
};

RollingCell.displayName = "RollingCell";

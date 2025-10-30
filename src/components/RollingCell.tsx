"use client";
import {prizeToSymbolMap} from "@/constants";
import {Prizes} from "@/types";
import {memo, useEffect, useState} from "react";

interface RollingCellProps {
  prize: Prizes;
  timeout: number;
}

export const RollingCell = memo(({prize, timeout}: RollingCellProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!prize) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [prize, timeout]);
  return (
    <div>{isVisible ? <div>{prizeToSymbolMap[prize]}</div> : <div>X</div>}</div>
  );
});

RollingCell.displayName = "RollingCell";

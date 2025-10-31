"use client";

import {playSlots} from "@/services";
import {useQuery} from "@tanstack/react-query";
import {useUserStore} from "@/stores/modules/user/store";
import {RollingCell} from "./RollingSlot";
import {SLOTS_COUNT} from "@/constants/slots";
import {useEffect, useState} from "react";
import {RollingControls} from "./RollingControls";
import {BalanceControls} from "./BalanceControls";

export const Game = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    credits,
    vaultCredits,
    handleRoll,
    setRollResult,
    setPendingRollResult,
    setGameInProgress,
    cashIn,
    cashOut,
    isGameInProgress,
  } = useUserStore();
  const {data, refetch, isSuccess, isError} = useQuery({
    queryKey: [],
    queryFn: () => playSlots({creditAmount: credits}),
    enabled: false,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (data && isSuccess) {
      setRollResult(data);
      setPendingRollResult(data);
      timeout = setTimeout(() => {
        handleRoll(data);
        setIsDisabled(false);
        setGameInProgress(false);
      }, SLOTS_COUNT * 1000);
    }

    if (isError) {
      setIsDisabled(false);
      setRollResult(null);
      setGameInProgress(false);
    }
    return () => timeout && clearTimeout(timeout);
  }, [
    data,
    isSuccess,
    isError,
    handleRoll,
    setIsDisabled,
    setGameInProgress,
    setRollResult,
    setPendingRollResult,
  ]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        className="w-full rounded-2xl p-4 flex flex-col gap-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.2) 100%)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.06), 0 10px 30px rgba(0,0,0,.4)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span style={{fontSize: 28}}>🪙</span>
            <div>
              <div className="text-sm opacity-80">Playable Credits</div>
              <div
                className="text-3xl font-extrabold"
                style={{color: "var(--color-accent-primary-glow)"}}
              >
                {credits}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span style={{fontSize: 28}}>🏦</span>
            <div>
              <div className="text-sm opacity-80">Vault Credits</div>
              <div
                className="text-3xl font-extrabold"
                style={{color: "var(--color-accent-secondary, #fbbf24)"}}
              >
                {vaultCredits}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <BalanceControls
            onCashIn={cashIn}
            onCashOut={cashOut}
            canCashIn={!(isGameInProgress || vaultCredits === 0)}
            canCashOut={!(isGameInProgress || credits === 0)}
          />
          <div className="hidden sm:flex items-center gap-2 text-sm opacity-80">
            <span>Spin cost:</span>
            <span
              className="font-semibold"
              style={{color: "var(--color-accent-primary)"}}
            >
              1 Credit
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        {Array.from({length: SLOTS_COUNT}).map((_, index) => (
          <RollingCell key={index} index={index} isRolling={isDisabled} />
        ))}
      </div>

      <RollingControls
        refetch={refetch}
        setIsDisabled={setIsDisabled}
        isRollDisabled={isDisabled}
        isCashedOut={credits === 0}
        isCreditLow={credits < 1 && vaultCredits < 1}
      />
    </div>
  );
};

"use client";

import {playSlots} from "@/services";
import {useQuery} from "@tanstack/react-query";
import {useUserStore} from "@/stores/modules/user/store";
import {RollingCell} from "./RollingSlot";
import {SLOTS_COUNT} from "@/constants/slots";
import {useCallback, useEffect, useState} from "react";
import {RollingControls} from "./RollingControls";

export const Game = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {credits, handleRoll, setRollResult, setPendingRollResult} =
    useUserStore();
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
      }, SLOTS_COUNT * 1000);
    }

    if (isError) {
      setIsDisabled(false);
      setRollResult(null);
    }
    return () => timeout && clearTimeout(timeout);
  }, [data, isSuccess, handleRoll]);

  const handlePlay = useCallback(() => {
    if (credits > 0) {
      refetch();
      setIsDisabled(true);
      setRollResult(null);
    }
  }, [credits]);

  return (
    <div>
      <h1 className="text-2xl font-bold">Game</h1>
      <p>Credits: {credits}</p>
      <div className="flex gap-4">
        {Array.from({length: SLOTS_COUNT}).map((_, index) => (
          <RollingCell key={index} index={index} isRolling={isDisabled} />
        ))}
      </div>
      <RollingControls onRoll={handlePlay} isRollDisabled={isDisabled} />
    </div>
  );
};

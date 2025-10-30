"use client";

import {playSlots} from "@/services";
import {useQuery} from "@tanstack/react-query";
import {useUserStore} from "@/stores/modules/user/store";
import {RollingCell} from "./RollingCell";
import {SLOTS_COUNT} from "@/constants/slots";
import Confetti from "react-confetti";
import {useEffect, useState} from "react";

export const Game = () => {
  const {credits, incrementCredits, handleRoll} = useUserStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const {data, refetch} = useQuery({
    queryKey: [],
    queryFn: () => playSlots({creditAmount: credits}),
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      console.log("data", data, data?.isWinningCombination);
      setShowConfetti(Boolean(data?.isWinningCombination));
      handleRoll(data);
    }
  }, [data, handleRoll]);

  const handlePlay = () => {
    refetch();
  };
  return (
    <div>
      {showConfetti && (
        <Confetti
          recycle={false}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      <h1 className="text-2xl font-bold">Game</h1>
      <p>Credits: {credits}</p>
      <button onClick={handlePlay}>Play</button>
      <br />
      <div className="flex gap-4">
        {Array.from({length: SLOTS_COUNT}).map((_, index) => (
          <RollingCell
            key={index}
            timeout={1000 * (index + 1)}
            prize={data?.symbols[index]}
          />
        ))}
      </div>
      <button onClick={() => incrementCredits(10)}>Increase Credits</button>
    </div>
  );
};

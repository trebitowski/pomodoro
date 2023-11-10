"use client";

import { useEffect, useState } from "react";
import useCountdown from "./use-countdown.hook";

export default function Home() {
  const { timer, setTimer, isPaused, togglePause } = useCountdown(60 * 25);
  const [numberCycles, setNumberCycles] = useState(0);
  const [mode, setMode] = useState<"Focus" | "Break" | "Recharge">("Focus");

  useEffect(() => {
    if (timer <= 0) {
      switch (mode) {
        case "Focus":
          if (numberCycles < 3) {
            setMode("Break");
            setTimer(60 * 5);
          } else {
            setMode("Recharge");
            setTimer(60 * 15);
          }
          break;
        case "Break":
          setMode("Focus");
          setTimer(60 * 25);
          setNumberCycles((currentNumberCycles) => currentNumberCycles + 1);
          break;
        case "Recharge":
          setMode("Focus");
          setTimer(60 * 25);
          setNumberCycles(0);
          break;
      }
    }
  }, [timer, setTimer, mode, numberCycles]);

  function formatTimer(time: number) {
    return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-emerald-500 text-emerald-50">
      <h1 className="text-8xl font-bold">{mode}</h1>
      <h2 className="text-6xl font-bold">{formatTimer(timer)}</h2>
      <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      <button onClick={() => setTimer(0)}>Next</button>
    </main>
  );
}

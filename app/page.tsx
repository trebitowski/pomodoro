"use client";

import { useEffect } from "react";
import useCountdown from "./use-countdown.hook";
import usePomodoro from "./use-pomodoro.hook";

export default function Home() {
  const { mode, duration, nextMode } = usePomodoro();
  const { timer, setTimer, isPaused, togglePause } = useCountdown(duration);

  useEffect(() => {
    if (timer <= 0) {
      nextMode();
    }
  }, [timer, nextMode]);

  useEffect(() => {
    setTimer(duration);
  }, [setTimer, duration]);

  function formatTimer(time: number) {
    return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-emerald-500 text-emerald-50">
      <h1 className="text-8xl font-bold">{mode}</h1>
      <h2 className="text-6xl font-bold">{formatTimer(timer)}</h2>
      <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      <button onClick={nextMode}>Next</button>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import useCountdown from "./use-countdown.hook";
import usePomodoro from "./use-pomodoro.hook";

function formatTimer(time: number) {
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
}

export default function Home() {
  const { mode, duration, nextMode } = usePomodoro();
  const { timer, isPaused, setTimer, togglePause } = useCountdown(duration);

  useEffect(() => {
    if (timer <= 0) {
      const nextDuration = nextMode();
      setTimer(nextDuration);
    }
  }, [timer, setTimer, nextMode]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-emerald-500 text-white">
      <h1 className="text-4xl font-bold drop-shadow-lg">{mode}</h1>
      <h2 className="text-9xl font-bold drop-shadow-xl will-change-contents">
        {formatTimer(timer)}
      </h2>
      <div className="flex space-x-3 pt-3 drop-shadow-lg">
        <button
          className="px-3.5 py-1.5 text-xl rounded font-bold bg-white text-emerald-600"
          onClick={togglePause}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          className="px-3.5 py-1.5 text-xl rounded font-bold bg-white text-emerald-600"
          onClick={() => {
            const nextDuration = nextMode();
            setTimer(nextDuration);
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import useCountdown from "./use-countdown.hook";
import usePomodoro from "./use-pomodoro.hook";
import Button from "./Button";

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold drop-shadow-lg">{mode}</h1>
      <h2 className="text-9xl font-bold drop-shadow-xl will-change-contents">
        {formatTimer(timer)}
      </h2>
      <div className="flex space-x-3 pt-3 drop-shadow-lg">
        <Button onClick={togglePause}>{isPaused ? "Start" : "Pause"}</Button>
        <Button
          onClick={() => {
            const nextDuration = nextMode();
            setTimer(nextDuration);
          }}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

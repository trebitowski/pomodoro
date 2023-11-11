"use client";

import { useEffect } from "react";
import useCountdown from "./use-countdown.hook";
import usePomodoro from "./use-pomodoro.hook";
import Button from "./Button";
// @ts-ignore
import useSound from "use-sound";

const alarmSoundUrl = "/sounds/alarm.mp3";

function formatTimer(time: number) {
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
}

export default function Home() {
  const { mode, duration, nextMode } = usePomodoro();
  const { timer, isPaused, setTimer, togglePause } = useCountdown(duration);

  const [alarm, { stop: stopAlarm }] = useSound(alarmSoundUrl);

  useEffect(() => {
    if (timer <= 0) {
      const nextDuration = nextMode();
      stopAlarm();
      alarm();
      setTimer(nextDuration);
      togglePause(true);
    }
  }, [timer, setTimer, nextMode, alarm, stopAlarm, togglePause]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold drop-shadow-lg">{mode}</h1>
      <h2 className="text-9xl font-bold drop-shadow-xl will-change-contents">
        {formatTimer(timer)}
      </h2>
      <div className="flex space-x-3 pt-5">
        <Button
          onClick={() => togglePause()}
          data-active={!isPaused || undefined}
        >
          {isPaused ? "Start" : "Pause"}
        </Button>
        <Button
          onClick={() => {
            const nextDuration = nextMode();
            setTimer(nextDuration);
            togglePause(true);
          }}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

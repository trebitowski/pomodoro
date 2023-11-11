"use client";

import { useEffect } from "react";
import useCountdown from "./use-countdown.hook";
import usePomodoro from "./use-pomodoro.hook";
import Button from "./Button";
// @ts-ignore
import useSound from "use-sound";

const buttonSoundUrl = "/sounds/pop-sprite.mp3";
const alarmSoundUrl = "/sounds/alarm.mp3";

function formatTimer(time: number) {
  return `${Math.floor(time / 60)}:${String(time % 60).padStart(2, "0")}`;
}

export default function Home() {
  const { mode, duration, nextMode } = usePomodoro();
  const { timer, isPaused, setTimer, togglePause } = useCountdown(duration);

  const [play] = useSound(buttonSoundUrl, {
    sprite: {
      press: [0, 70],
      off: [75, 140],
      on: [145, 200],
    },
  });

  const [alarm, { stop: stopAlarm }] = useSound(alarmSoundUrl);

  useEffect(() => {
    if (timer <= 0) {
      const nextDuration = nextMode();
      stopAlarm();
      alarm();
      setTimer(nextDuration);
    }
  }, [timer, setTimer, nextMode, alarm, stopAlarm]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold drop-shadow-lg">{mode}</h1>
      <h2 className="text-9xl font-bold drop-shadow-xl will-change-contents">
        {formatTimer(timer)}
      </h2>
      <div className="flex space-x-3 pt-5">
        <Button
          onClick={() => togglePause()}
          onMouseDown={() => play({ id: "press" })}
          onMouseUp={() => {
            isPaused ? play({ id: "on" }) : play({ id: "off" });
          }}
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
          onMouseDown={() => play({ id: "press" })}
          onMouseUp={() => play({ id: "on" })}
        >
          Next
        </Button>
      </div>
    </main>
  );
}

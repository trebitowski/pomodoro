import { useCallback, useEffect, useState } from "react";

export default function useCountdown(
  defaultCountdown: number,
  defaultPaused: boolean = true
) {
  const [startTime, setStartTime] = useState(Date.now());
  const [timer, setTimer] = useState(defaultCountdown);
  const [isPaused, setPaused] = useState(defaultPaused);
  const [_, rerender] = useState(0);

  const togglePause = useCallback((value?: boolean) => {
    setPaused((currentPaused) => {
      const newValue = value ?? !currentPaused;
      if (!newValue) {
        setStartTime(Date.now());
      }
      return newValue;
    });
  }, []);

  const setNewTimer = useCallback((newTimer: number) => {
    setTimer(newTimer);
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (!isPaused) {
      intervalId = setInterval(() => {
        rerender((current) => (current + 1) % 10);
      }, 1000);
    }
    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return {
    timer: Math.ceil((startTime + timer - Date.now()) / 1000),
    setTimer: setNewTimer,
    isPaused,
    togglePause,
  };
}

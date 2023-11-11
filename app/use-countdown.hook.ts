import { useCallback, useEffect, useState } from "react";

export default function useCountdown(
  defaultCountdown: number,
  defaultPaused: boolean = true
) {
  const [timer, setTimer] = useState(defaultCountdown);
  const [isPaused, setPaused] = useState(defaultPaused);

  const togglePause = useCallback((value?: boolean) => {
    setPaused((currentPaused) => value ?? !currentPaused);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (!isPaused) {
      intervalId = setInterval(() => {
        setTimer((currentTimer) => currentTimer - 1);
      }, 1000);
    }
    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return {
    timer,
    setTimer,
    isPaused,
    togglePause,
  };
}

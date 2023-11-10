import { useCallback, useEffect, useState } from "react";

export default function useCountdown(startingCountdown: number) {
  const [timer, setTimer] = useState(startingCountdown);
  const [isPaused, setPaused] = useState(false);

  const togglePause = useCallback(() => {
    setPaused((currentPaused) => !currentPaused);
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

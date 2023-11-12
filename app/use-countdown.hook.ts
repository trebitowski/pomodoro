import { useCallback, useEffect, useRef, useState } from "react";

const worker = new Worker(new URL("./countdown_worker.js", import.meta.url));
export default function useCountdown(
  defaultCountdown: number,
  defaultPaused: boolean = true
) {
  const [timer, setTimer] = useState(defaultCountdown);
  const [isPaused, setPaused] = useState(defaultPaused);

  const togglePause = useCallback((value?: boolean) => {
    setPaused((current) => value ?? !current);
    worker.postMessage("update");
  }, []);

  const setNewTimer = useCallback((newTimer: number) => {
    setTimer(newTimer);
    setPaused(true);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      worker.onmessage = (event) => {
        setTimer((current) => current - event.data);
      };
      worker.postMessage("create");
    }
    return () => {
      worker.postMessage("clear");
    };
  }, [isPaused]);

  return {
    timer: Math.ceil(timer / 1000),
    setTimer: setNewTimer,
    isPaused,
    togglePause,
  };
}

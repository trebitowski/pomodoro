import { useCallback, useEffect, useRef, useState } from "react";

export default function useCountdown(
  defaultCountdown: number,
  defaultPaused: boolean = true
) {
  const [timer, setTimer] = useState(defaultCountdown);
  const [isPaused, setPaused] = useState(defaultPaused);
  const worker = useRef(
    new Worker(new URL("./countdown_worker.js", import.meta.url))
  );

  const togglePause = useCallback((value?: boolean) => {
    setPaused((current) => value ?? !current);
    worker.current.postMessage("update");
  }, []);

  const setNewTimer = useCallback((newTimer: number) => {
    setTimer(newTimer);
    setPaused(true);
  }, []);

  useEffect(() => {
    const workerRef = worker.current;
    if (!isPaused) {
      worker.current.onmessage = (event) => {
        setTimer((current) => current - event.data);
      };
      worker.current.postMessage("create");
    }
    return () => {
      workerRef.postMessage("clear");
    };
  }, [isPaused]);

  return {
    timer: Math.ceil(timer / 1000),
    setTimer: setNewTimer,
    isPaused,
    togglePause,
  };
}

import { useCallback, useState } from "react";

const modeDurationMap = {
  Focus: 60 * 25,
  Break: 60 * 5,
  Recharge: 60 * 15,
};

export default function usePomodoro() {
  const [mode, setMode] = useState<"Focus" | "Break" | "Recharge">("Focus");
  const [numberCycles, setNumberCycles] = useState(0);

  const nextMode = useCallback(() => {
    switch (mode) {
      case "Focus":
        if (numberCycles < 3) {
          setMode("Break");
        } else {
          setMode("Recharge");
        }
        break;
      case "Break":
        setMode("Focus");
        setNumberCycles((currentNumberCycles) => currentNumberCycles + 1);
        break;
      case "Recharge":
        setMode("Focus");
        setNumberCycles(0);
        break;
    }
  }, [mode, numberCycles]);

  return {
    mode,
    duration: modeDurationMap[mode],
    nextMode,
  };
}

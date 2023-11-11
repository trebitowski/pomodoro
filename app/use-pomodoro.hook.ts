import { useCallback, useState } from "react";

const modeDurationMap = {
  Focus: 1000 * 60 * 25,
  Break: 1000 * 60 * 5,
  Recharge: 1000 * 60 * 15,
};

export default function usePomodoro() {
  const [mode, setMode] = useState<"Focus" | "Break" | "Recharge">("Focus");
  const [numberCycles, setNumberCycles] = useState(0);

  const nextMode = useCallback(() => {
    switch (mode) {
      case "Focus":
        if (numberCycles < 3) {
          setMode("Break");
          return modeDurationMap["Break"];
        } else {
          setMode("Recharge");
          return modeDurationMap["Recharge"];
        }
      case "Break":
        setMode("Focus");
        setNumberCycles((currentNumberCycles) => currentNumberCycles + 1);
        return modeDurationMap["Focus"];
      case "Recharge":
        setMode("Focus");
        setNumberCycles(0);
        return modeDurationMap["Focus"];
    }
  }, [mode, numberCycles]);

  return {
    mode,
    duration: modeDurationMap[mode],
    nextMode,
  };
}

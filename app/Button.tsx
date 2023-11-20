import { ButtonHTMLAttributes } from "react";
// @ts-ignore
import useSound from "use-sound";

const buttonSoundUrl = "/sounds/pop-sprite.mp3";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "data-active"?: boolean;
}
export default function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  const [play] = useSound(buttonSoundUrl, {
    sprite: {
      press: [0, 70],
      off: [75, 140],
      on: [145, 200],
    },
  });

  return (
    <button
      {...rest}
      onMouseDown={() => play({ id: "press" })}
      onMouseUp={() => {
        rest["data-active"] ? play({ id: "off" }) : play({ id: "on" });
      }}
      className="button relative bg-transparent border-none p-0 cursor-pointer outline-4 group"
    >
      <span className="absolute inset-0 rounded-xl bg-black/20 translate-y-[2px] filter blur-sm" />
      <span className="absolute inset-0 rounded-xl button-edge" />
      <span className="block bg-white py-3 px-[2.625rem] font-bold rounded-xl text-xl text-red-700 button-idle group-active:button-active will-change-transform group-hover:button-hover group-data-[active]:button-active">
        {children}
      </span>
    </button>
  );
}

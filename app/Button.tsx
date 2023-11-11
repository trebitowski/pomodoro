import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="button relative bg-transparent border-none p-0 cursor-pointer outline-4 group"
    >
      <span className="absolute inset-0 rounded-xl bg-black/20 translate-y-[2px] filter blur-sm" />
      <span className="absolute inset-0 rounded-xl button-edge" />
      <span className="block bg-white py-3 px-[2.625rem] font-bold rounded-xl text-xl text-emerald-700 button-idle group-active:button-active will-change-transform group-hover:button-hover group-data-[active]:button-active">
        {children}
      </span>
    </button>
  );
}

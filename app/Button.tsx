import { ButtonHTMLAttributes } from "react";

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="px-3.5 py-1.5 text-xl rounded font-bold bg-white text-emerald-600"
    />
  );
}

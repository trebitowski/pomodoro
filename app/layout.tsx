import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pomodoro Timer",
  description: "A distraction-free focus timer based on the Pomodoro technique",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          "text-red-100 bg-gradient-to-b from-red-800 to-red-950 " +
          quicksand.className
        }
      >
        {children}
      </body>
    </html>
  );
}

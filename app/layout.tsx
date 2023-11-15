import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
        className={`text-white bg-jade-500 overscroll-none ${quicksand.className}`}
      >
        <svg
          className="pointer-events-none fixed isolate opacity-70 mix-blend-soft-light"
          width="100%"
          height="100%"
        >
          <filter id="bg-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.83"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#bg-grain)"></rect>
        </svg>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

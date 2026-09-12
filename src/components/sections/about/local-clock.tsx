"use client";

import { useEffect, useState } from "react";

type Props = {
  timeZone: string;
};

/** The current time where I am, ticking once a second. Blank until it runs in the browser. */
export function LocalClock({ timeZone }: Props) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone,
        }),
      );
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return <span className="tabular-nums">{time}</span>;
}

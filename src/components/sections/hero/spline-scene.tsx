"use client";

import { useEffect } from "react";

// The viewer is served from our own public folder, so the site never depends on Spline's servers.
export const VIEWER_SRC = "/spline/viewer/spline-viewer.js";

function loadViewerOnce() {
  if (document.querySelector(`script[src="${VIEWER_SRC}"]`)) return;
  const script = document.createElement("script");
  script.type = "module";
  script.src = VIEWER_SRC;
  document.head.appendChild(script);
}

type Props = {
  src: string;
  /** Positioning within the section. The scene fills whatever box it is given. */
  className?: string;
};

/** The 3D robot. It fills its box, melts into the page along one edge, and reacts to the pointer anywhere on the page. */
export function SplineScene({ src, className }: Props) {
  useEffect(loadViewerOnce, []);

  return (
    <div
      aria-hidden="true"
      className={`after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-[22%] after:bg-linear-to-r after:from-page after:to-transparent after:content-[''] max-stack:after:inset-x-0 max-stack:after:top-0 max-stack:after:h-[30%] max-stack:after:w-auto max-stack:after:bg-linear-to-b ${className ?? ""}`}
    >
      <spline-viewer
        url={src}
        events-target="global"
        background="#000000"
        className="block h-full w-full"
      />
    </div>
  );
}

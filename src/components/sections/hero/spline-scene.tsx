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
  className?: string;
};

/** The live 3D robot. Fills its box and reacts to the pointer anywhere on the page. */
export function SplineScene({ src, className }: Props) {
  useEffect(loadViewerOnce, []);

  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className ?? ""}`}>
      <spline-viewer
        url={src}
        events-target="global"
        background="#000000"
        className="block h-full w-full"
      />
    </div>
  );
}

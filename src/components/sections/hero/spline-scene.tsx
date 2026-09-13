"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";
import { PAGE_COLOUR } from "@/lib/theme/theme";

// The viewer is served from our own public folder, so the site never depends on Spline's servers.
export const VIEWER_SRC = "/spline/viewer/spline-viewer.js";

function loadViewerOnce() {
  if (document.querySelector(`script[src="${VIEWER_SRC}"]`)) return;
  const script = document.createElement("script");
  script.type = "module";
  script.src = VIEWER_SRC;
  document.head.appendChild(script);
}

/**
 * Stops the scene's render loop while the viewer is off screen and starts it
 * again when it comes back, so a robot nobody can see costs no frames. The
 * loop only exists once the scene has loaded, so nothing happens before then.
 */
function pauseWhenHidden(viewer: SplineViewerElement): () => void {
  let onScreen = true;
  let loaded = viewer._loaded === true;

  const apply = () => {
    const app = viewer._spline;
    if (!loaded || !app) return;
    if (onScreen) app.play();
    else app.stop();
  };
  const onLoaded = () => {
    loaded = true;
    apply();
  };
  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    apply();
  });

  observer.observe(viewer);
  viewer.addEventListener("load-complete", onLoaded);
  return () => {
    observer.disconnect();
    viewer.removeEventListener("load-complete", onLoaded);
  };
}

type Props = {
  src: string;
  className?: string;
};

/** The live 3D robot. Fills its box, reacts to the pointer anywhere on the page, and rests while scrolled away. */
export function SplineScene({ src, className }: Props) {
  const ref = useRef<SplineViewerElement>(null);
  // The viewer paints its own background, so it follows the theme by attribute.
  const theme = useTheme();

  useEffect(loadViewerOnce, []);
  useEffect(() => {
    const viewer = ref.current;
    if (!viewer) return;
    return pauseWhenHidden(viewer);
  }, []);

  return (
    <div aria-hidden="true" className={`absolute inset-0 ${className ?? ""}`}>
      <spline-viewer
        ref={ref}
        url={src}
        events-target="global"
        background={PAGE_COLOUR[theme]}
        className="block h-full w-full"
      />
    </div>
  );
}

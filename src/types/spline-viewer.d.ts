import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  /**
   * The <spline-viewer> element from the vendored viewer (2.0.46). The runtime
   * handle is private to the viewer; it is used only to pause the render loop
   * off screen, and everything that touches it copes with it being absent.
   */
  interface SplineViewerElement extends HTMLElement {
    _spline?: { stop(): void; play(): void };
    _loaded?: boolean;
  }
}

// The custom element, defined by the self-hosted viewer script in public/spline/viewer.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<
        HTMLAttributes<SplineViewerElement>,
        SplineViewerElement
      > & {
        url: string;
        /** "global" makes the scene react to the pointer anywhere on the page. */
        "events-target"?: "global" | "local";
        background?: string;
      };
    }
  }
}

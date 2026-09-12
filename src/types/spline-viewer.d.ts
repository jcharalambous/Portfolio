import type { DetailedHTMLProps, HTMLAttributes } from "react";

// The <spline-viewer> custom element, defined by the self-hosted viewer script in public/spline/viewer.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        url: string;
        /** "global" makes the scene react to the pointer anywhere on the page. */
        "events-target"?: "global" | "local";
        background?: string;
      };
    }
  }
}

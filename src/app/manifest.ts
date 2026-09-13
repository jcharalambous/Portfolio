import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site/config";

/** The web app manifest: name, colours and the icons used when the site is installed to a home screen or desktop. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name.split(" ")[0],
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/icons/install-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/install-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

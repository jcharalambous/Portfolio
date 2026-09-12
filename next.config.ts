import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev only: let phones on the same network load the dev server's scripts.
  // Update the address if the Mac's network address changes.
  allowedDevOrigins: ["172.16.30.253"],
};

export default nextConfig;

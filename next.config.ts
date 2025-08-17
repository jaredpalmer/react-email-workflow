import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Forward browser logs to the terminal for easier debugging
    browserDebugInfoInTerminal: true,
  },
};

export default nextConfig;

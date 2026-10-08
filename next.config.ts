import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "wizardtv.vip" }],
        destination: "https://www.wizardtv.vip/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

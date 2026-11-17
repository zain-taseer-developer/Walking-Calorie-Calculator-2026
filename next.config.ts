import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/blog/category/treadmill-&-workouts",
        destination: "/blog/category/treadmill-and-workouts",
        permanent: true,
      },
      {
        source: "/blog/category/calories-&-nutrition",
        destination: "/blog/category/calories-and-nutrition",
        permanent: true,
      },
      {
        source: "/blog/category/steps-&-distance",
        destination: "/blog/category/steps-and-distance",
        permanent: true,
      },
      {
        source: "/blog/pace-and-speed",
        destination: "/blog/category/pace-and-speed",
        permanent: true,
      },
      {
        source: "/blog/beginners-and-seniors",
        destination: "/blog/category/beginners-and-seniors",
        permanent: true,
      },
      {
        source: "/blog/walking-basics",
        destination: "/blog/category/walking-basics",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

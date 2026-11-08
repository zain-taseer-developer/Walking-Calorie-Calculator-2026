import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;

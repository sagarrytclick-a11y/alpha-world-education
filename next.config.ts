import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "satyawati.du.ac.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "staticprintenglish.theprint.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "techportal.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.yashoverseas.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

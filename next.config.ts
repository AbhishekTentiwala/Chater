import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  webpack:(config)=>{
    config.externals.push({
      "utf-8-validate":"commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    })
    return config;

  },
  images:{
    remotePatterns:[
      new URL("https://utfs.io/**"),
      new URL("https://*.ufs.sh/**")
    ]
  }
};

export default nextConfig;

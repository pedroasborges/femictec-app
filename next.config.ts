import type { NextConfig } from "next";

const defaultPatterns = [
  {
    protocol: "http" as const,
    hostname: "localhost",
    port: "1337",
  },
  {
    protocol: "http" as const,
    hostname: "localhost",
    port: "1338",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    port: "1337",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    port: "1338",
  },
];

function getEnvRemotePattern() {
  const rawUrl = process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_BASE_URL;
  if (!rawUrl) return null;

  try {
    const parsed = new URL(rawUrl);
    return {
      protocol: parsed.protocol.replace(":", "") as "http" | "https",
      hostname: parsed.hostname,
      port: parsed.port || undefined,
    };
  } catch {
    return null;
  }
}

const envPattern = getEnvRemotePattern();
const remotePatterns = envPattern ? [envPattern, ...defaultPatterns] : defaultPatterns;

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns,
  },
};

export default nextConfig;

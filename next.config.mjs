import { withPayload } from '@payloadcms/next/withPayload';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

// const monorepoRoot = path.resolve(dirname, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Pin the workspace root so Next doesn't pick up sibling lockfiles.
  turbopack: {
    root: dirname,
  },
  outputFileTracingRoot: dirname,
  images: {
    remotePatterns: [],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

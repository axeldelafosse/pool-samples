const path = require('path');

const { withExpo } = require('@expo/next-adapter');
const withVideos = require('next-videos');
const withReactSvg = require('next-react-svg');
const withOffline = require('next-offline');
const withTM = require('next-transpile-modules')([
  'app',
  'react-native-reanimated',
  'styled-components/native'
]);
// TODO: , { resolveSymlinks: true, unstable_webpack5: true }
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  env: {
    STAGE: process.env.STAGE
  },
  async headers() {
    const cacheHeaders = [
      { key: 'Cache-Control', value: 'public, max-age=15552000, immutable' }
    ];
    return [
      { source: '/_next/static/:static*', headers: cacheHeaders },
      { source: '/images/:image*', headers: cacheHeaders },
      { source: '/fonts/:font*', headers: cacheHeaders }
    ];
  },
  target: 'serverless',
  typescript: {
    ignoreDevErrors: true,
    ignoreBuildErrors: true
  },
  publicRuntimeConfig: false,
  webpack: (config, { defaultLoaders }) => {
    // Import polyfills
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (
        entries['main.js'] &&
        !entries['main.js'].includes('./src/polyfills/import.ts')
      ) {
        entries['main.js'].unshift('./src/polyfills/import.ts');
      }

      return entries;
    };

    // Monorepo. Hot reloading for @pool/app
    config.resolve.symlinks = true;

    return config;
  },
  images: {
    domains: [
      'poolmessenger.com',
      'images.weserv.nl', // TODO: change this as 'loader'
      'poolpoolpool.s3.eu-west-3.amazonaws.com'
    ]
  },
  // withOffline
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  generateInDevMode: false,
  dontAutoRegisterSw: true,
  workboxOpts: {
    swDest:
      process.env.STAGE === 'prod'
        ? 'static/workbox-service-worker.js'
        : '_next/static/workbox-service-worker.js',
    manifestTransforms: [
      // Basic transformation to remove a certain URL:
      (originalManifest) => {
        const manifest = originalManifest.map((entry) => {
          if (entry.url.includes('[')) {
            entry.url = entry.url.replace('[', '%5B');
          }
          if (entry.url.includes(']')) {
            entry.url = entry.url.replace(']', '%5D');
          }
          entry.url = `/_next${entry.url}`; // or do this with modifyURL. static = '/_next/static'
          return entry;
        });

        // Optionally, set warning messages.
        const warnings = [];
        return { manifest, warnings };
      }
    ],
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst', // NetworkFirst - StaleWhileRevalidate
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 5,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  },
  // withExpo
  projectRoot: __dirname,
  // withTM
  withTM,
  // withReactSvg
  include: [path.resolve(__dirname, '..')]
};

const pipe = (...ops) => ops.reduce((a, b) => (arg) => b(a(arg)));

const wrapper = pipe(
  withExpo, // Should be first
  withBundleAnalyzer,
  withVideos,
  withReactSvg,
  withOffline,
  withTM // Should be last
);

module.exports = wrapper(nextConfig);

const { createMetroConfiguration } = require('expo-yarn-workspaces');
const { getDefaultConfig } = require('metro-config');

const config = createMetroConfiguration(__dirname);

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    ...config,
    transformer: {
      ...config.transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true // TODO: test
        }
      }),
      assetPlugins: ['expo-asset/tools/hashAssetFiles'] // expo-updates
    },
    resolver: {
      ...config.resolver,
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();

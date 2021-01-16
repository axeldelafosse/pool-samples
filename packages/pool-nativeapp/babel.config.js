module.exports = function(api) {
  api.cache(true);

  const presets = [['@expo/next-adapter/babel', { lazyImports: true }]];
  const plugins = [];

  // 'react-native-reanimated/plugin'

  return {
    presets,
    plugins
  };
};

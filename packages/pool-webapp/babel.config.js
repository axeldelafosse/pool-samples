const path = require('path');

module.exports = function (api) {
  api.cache(true);

  const presets = ['@expo/next-adapter/babel'];
  const plugins = [['styled-components', { ssr: true }]];

  return {
    presets,
    plugins
  };
};

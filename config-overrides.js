const { log } = require('console');
const { useBabelRc, removeModuleScopePlugin, override } = require('customize-cra');

module.exports = override(useBabelRc(), removeModuleScopePlugin(), (config) => {
  config.module.rules.push({
    test: /\.(glsl|vs|fs)$/,
    type: 'asset/source',
    // generator: {
    //   filename: 'assets/images/[hash][ext]',
    // },
  });
  return config;
});

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  // Your existing Metro configuration options
};

// metro.config.js
// const {
//   wrapWithReanimatedMetroConfig,
// } = require('react-native-reanimated/metro-config');

// module.exports = wrapWithReanimatedMetroConfig(config);
module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const { getDefaultConfig } = require("expo/metro-config");

// Get the default configuration
const config = getDefaultConfig(__dirname);

// Additional thirdweb configuration
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = [
  "react-native",
  "browser",
  "require",
];

// Polyfill Node.js modules that are missing in React Native
config.resolver.extraNodeModules = {
  stream: require.resolve("stream-browserify"),
  crypto: require.resolve("react-native-crypto"),
  assert: require.resolve("assert/"),
  http: require.resolve("stream-http"),
  https: require.resolve("https-browserify"),
  os: require.resolve("os-browserify/browser"),
  url: require.resolve("url/"),
  vm: require.resolve("vm-browserify"),
};

module.exports = config;

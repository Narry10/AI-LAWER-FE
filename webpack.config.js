const path = require("path");

module.exports = {
  entry: "./src/index.js", // Example entry point
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    fallback: {
      https: require.resolve("https-browserify"),
      // Add other fallbacks if needed
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // Other rules...
    ],
  },
  // Other configuration options...
};

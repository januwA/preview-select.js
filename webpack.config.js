const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    "preview-select": path.resolve(__dirname, "src/index.ts"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: false,
    }),
  ],
  output: {
    library: {
      name: "previewSelect",
      type: "umd",
    },
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

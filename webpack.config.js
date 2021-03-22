const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  target: "web",
  mode: isProduction ? "production" : "development",
  entry: {
    ["background/index"]: path.resolve("src", "background", "index.ts"),
    ["content/index"]: path.resolve("src", "content", "index.ts"),
  },
  output: {
    path: path.resolve("dist"),
    publicPath: "/",
    filename: "[name].js",
  },
  devtool: isProduction ? "nosources-source-map" : "eval-source-map",
  cache: {
    type: "filesystem",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("public"),
        },
      ],
    }),
  ],
};

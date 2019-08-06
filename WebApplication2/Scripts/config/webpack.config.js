const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js"
  },
  module: {
      rules: [
          {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],

          },
        {
          use: {
              loader: "babel-loader",
          },
          test: /\.js$/,
          exclude: /node_modules/ 
        }
    ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
        ]
}
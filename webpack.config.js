var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/App.js",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "dist/static/"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    port: 9876,
    contentBase: path.join(__dirname, "src")
  }
};

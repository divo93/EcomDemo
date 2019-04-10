
const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: {
    index: ["babel-polyfill",SRC_DIR + '/index.js']
  },
    output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build',
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test:/\.html$/,
        use: [ 'html-loader']
      },
      {
        test:/\.css$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test:/\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}
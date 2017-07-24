/* eslint-disable */
import path from 'path';
import webpack from 'webpack';

var publicPath = 'http://localhost:8000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

export default {
  entry: [
    hotMiddlewareScript,
    path.join(__dirname, './src/draw')
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname,"dist"),
    publicPath: publicPath,
  },
  devtool: 'source-map',
  resolve: {
          // resolve 指定可以被 import 的文件后缀
    extensions: ['.js', '.jsx'],
  },
  module: {
    // loaders是一个数组，每个元素都用来指定loader
      loaders: [
        // {
        //  test: /\.(jsx|js)$/,
        //  loader: ['babel-loader','eslint-loader'], //指定使用什么loader，可以用字符串，也可以用数组
        // },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jsx|js)$/, //test值为正则表达式，当文件路径匹配时启用
          loader: 'babel-loader', //指定使用什么loader，可以用字符串，也可以用数组
          exclude: /regexp/, //可以使用exclude来排除一部分文件
      }],
  },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};

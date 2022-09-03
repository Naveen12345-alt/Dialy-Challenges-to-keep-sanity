const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

module.exports = (env) => {
  return merge(common(env), {
    mode: 'development',
    target: 'web',
    devtool: 'eval',
    output: {
      pathinfo: true,
      publicPath: '/',
      filename: '[name].bundle.js',
    },
    devServer: {
      watchFiles: path.join(__dirname),
      hot: true,
      host: '127.0.0.1',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
  });
};

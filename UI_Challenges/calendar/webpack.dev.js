const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * @defination Webpacks is a module bundler which builds and load modules and their dependencies synchronously.
 * It converts dependencies into modules and makes sure to pull them at the right time in the current scope.
 * All the modules and dependencies are loaded into a single filename using DG[DEPENDENCY GRAPH]
 * Tapables are the backbone of webpack as they allow us mix our code with existing class and
 * use existing function and emit events that we are listening to.
 * Tapables that make webpack work:
 *
 *  Compiler: Central Dispatch; that delegates top level events when webpack runs, stop or completes execution
 *  Compilation: creates DG and run it; and works as brain of webpack
 *  Resolver: helps findings files[with relative path] and dependencies based on information of import statements
 *  Module Factory: takes resolved request, collects source files and return module object.
 *  Parser: convert raw code into AST.
 *  Template: Creates final code that we see in our final bundle.
 *
 *  Process: webpack reads entry point, goes to resolver to verify if it exists,
 *  once a confirmation is received, module factory takes the resolved request, collects source with file,
 *  and return module object which passes thru parser , which recognizes the correct type; and if it is
 *  non-js module, it is passed to loader otherwise it's dependencies are collected and attached to
 *  our module. and this process repeats until entire dependency graph is built.
 */
module.exports = {
  //entry point for its dependency graph and the filename mentioned is used to build DG.
  entry: './src/index.js',
  mode: 'development',
  devtool: 'inline-source-map',
  //output is the absolute path of the final bundle which gets distributed to browsers
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    contentBase: './dist',
  },
  /**
   * loaders are used for resolving non-javascript modules within ur code,
   * it takes resource file and returns modified state.
   * All non-javascript modules are converted into javascript modules by functional transformations.
   * We can even filter thru the module to let it which modules to include; using include and exclude.s
   */
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  /**
   * Plugins: are es5 classes which have apply method have allow us to hook into compilation lifecycle.
   *  It helps webpack compiler emit events, it adds a new instance to plugins array.
   */
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Calendar - Development',
      template: 'index.html',
    }),
  ],
};

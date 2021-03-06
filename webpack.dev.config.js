const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: ['./examples/index.js'],
  
  output: {
  	filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  mode: 'development',
  
  devtool: 'source-map',
  
  devServer: {
  	contentBase: './dist'
  },
  
  module: {
  	rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(['dist'])
  ]
};
  
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // or 'production'
  entry: {
    main: './src/main.js', // Main entry point
    index: './src/pages/index/index.js',
    vehicle: './src/pages/vehicle/vehicle.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index/index.html',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/vehicle/vehicle.html',
      chunks: ['vehicle'],
      filename: 'vehicle.html',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          chunks: 'all',
          minChunks: 2,
          name: 'commons',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
  },
};

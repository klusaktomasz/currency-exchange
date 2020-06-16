const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (_env, argv) => {
  const isDev = argv.mode !== 'production';

  return {
    devtool: isDev && 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'js/[name].[contenthash].js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isDev ? 'development' : 'production',
              },
            },
            {
              loader: 'eslint-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: /docs/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
      new StylelintPlugin({
        files: 'src/**/*.js',
      }),
      new CopyPlugin([
        {
          from: 'public',
          to: '.',
          ignore: ['index.html'],
        },
      ]),
    ],
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: { comparisons: false },
            mangle: { safari10: true },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          common: {
            minChunks: 2,
            priority: -10,
          },
        },
      },
      runtimeChunk: 'single',
    },
    devServer: {
      compress: true,
      historyApiFallback: true,
      overlay: true,
      stats: 'errors-only',
    },
  };
};

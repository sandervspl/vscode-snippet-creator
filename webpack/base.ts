import * as path from 'path';
import * as webpack from 'webpack';
import webpackMerge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';
import config from './config';

const baseConfig: webpack.Configuration = {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
      // Files will invalidate i. e. when more chunks with the same vendors are added.
      // medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      name: false,
    },
    // Keep the runtime chunk seperated to enable long term caching
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /external/,
            loader: 'url-loader?limit=10000',
          },
          {
            loader: '@svgr/webpack',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        oneOf: [
          {
            resource: /external/,
            loader: 'file-loader',
            query: { name: 'static/[name].[ext]' },
          },
          {
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: 'static/[name].[ext]',
            },
          },
        ],
      },
      {
        exclude: [
          /\.jsx?$/,
          /\.tsx?$/,
          /\.css$/,
          /\.svg$/,
          /\.(jpe?g|png|gif)$/i,
          /\.json$/,
          /\.html/,
        ],
        loader: 'file-loader',
        query: { name: 'static/[name].[ext]' },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    new MonacoWebpackPlugin({
      languages: ['cson', 'json', 'javascript', 'typescript'],
      features: ['coreCommands'],
    }),
    new HtmlWebpackPlugin({
      title: config.appName,
      filename: 'index.html',
      inject: true,
      template: path.join(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};

export default baseConfig;

export const merge = (...config: webpack.Configuration[]) => webpackMerge(baseConfig, ...config);

import path from 'path';
import nodeExternals from 'webpack-node-externals';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import workbox from 'workbox-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import * as webpack from 'webpack';
import globals from './globals';
import { merge } from './base';
import config from './config';

const prodConfig: webpack.Configuration = merge({
  name: 'client',
  mode: 'production',
  entry: {
    app: [
      '@babel/polyfill',
      path.join(__dirname, '../src/index.tsx'),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(globals('client')),
    new WebpackPwaManifest({
      name: config.appName,
      short_name: config.shortName,
      orientation: 'landscape',
      display: 'standalone',
      background_color: '#1e1e1e',
      theme_color: '#1e1e1e',
      start_url: '/',
      scope: '/',
      ios: true,
    }),
    new workbox.GenerateSW({
      cacheId: 'vsc',
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
});

const serverConfig: webpack.Configuration = {
  name: 'server',
  mode: 'production',
  target: 'node',
  node: {
    __dirname: true,
  },
  entry: {
    server: [path.resolve(__dirname, '../src/server/index.ts')],
  },
  externals: [
    nodeExternals({ whitelist: /\.(?!js(\?|$))([^.]+(\?|$))/ }),
  ],
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
  plugins: [
    new webpack.DefinePlugin(globals('server')),
  ],
};

module.exports = [prodConfig, serverConfig];

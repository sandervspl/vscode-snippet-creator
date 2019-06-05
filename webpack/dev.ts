import path from 'path';
import * as webpack from 'webpack';
import * as devServer from 'webpack-dev-server';
import CleanTerminalPlugin from 'clean-terminal-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { merge } from './base';
import globals from './globals';

const devConfig: devServer.Configuration = merge({
  name: 'client',
  mode: 'development',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true&noInfo=true',
      '@babel/polyfill',
      path.join(__dirname, '../src/index.tsx'),
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(globals('client')),
    new CleanTerminalPlugin(),
  ],
  devServer: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    hot: true,
    stats: 'minimal',
    historyApiFallback: true,
  },
});

module.exports = devConfig;

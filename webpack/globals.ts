import * as i from '@types';
import { port } from '../src/config';

const env = process.env.NODE_ENV || 'development';

export default (appType: i.AppType) => ({
  'process.env': {
    NODE_ENV: JSON.stringify(env),
    PORT: port[env],
  },
  __DEV__: env === 'development',
  __TEST__: env === 'test',
  __PROD__: env === 'production',
  __ACC__: env === 'acceptation',
  __CLIENT__: appType === 'client',
  __SERVER__: appType === 'server',
});

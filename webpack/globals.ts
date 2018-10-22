import * as i from '@types';
import { port } from '../src/config';

const env = process.env.NODE_ENV || 'development';
const appEnv = process.env.APP_ENV || 'development';

export default (appType: i.AppType) => ({
  'process.env': {
    NODE_ENV: JSON.stringify(env),
    PORT: port[env],
  },
  __DEV__: appEnv === 'development',
  __TEST__: appEnv === 'test',
  __PROD__: appEnv === 'production',
  __ACC__: appEnv === 'acceptation',
  __CLIENT__: appType === 'client',
  __SERVER__: appType === 'server',
});

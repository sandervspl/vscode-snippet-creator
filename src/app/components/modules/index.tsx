import * as React from 'react';
import * as Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const LoadableLoader = (options: any): any => Loadable(options);

export const Home = LoadableLoader({
  loader: () => import('./Home'),
  loading: Loading,
});

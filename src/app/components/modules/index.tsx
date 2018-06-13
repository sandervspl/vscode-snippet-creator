import * as React from 'react';
import * as Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const LoadableLoader = (options: any): any => Loadable(options);

export const Test = LoadableLoader({
  loader: () => import('./Test'),
  loading: Loading,
});

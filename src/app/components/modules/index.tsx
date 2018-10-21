import * as Loadable from 'react-loadable';
import { LoadableComponent } from '@common';

/* tslint:disable space-in-parens */
export const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ './Home'),
  loading: LoadableComponent,
});

export const Editor = Loadable({
  loader: () => import(/* webpackChunkName: "Editor" */ './Editor'),
  loading: LoadableComponent,
});

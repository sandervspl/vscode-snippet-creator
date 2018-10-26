// @ts-ignore
import { lazy } from 'react';

export { FullscreenLoader } from './FullscreenLoader';

export const Home = lazy(() => import(
  /* webpackChunkName: "Home" */ './Home'
));
export const Editor = lazy(() => import(
  /* webpackChunkName: "Editor" */ './Editor'
));
export const OutputEditor = lazy(() => import(
  /* webpackChunkName: "OutputEditor" */ './OutputEditor'
));

import { lazy } from 'react';

export { FullscreenLoader } from './FullscreenLoader';

export const Home = lazy(() => import('./Home'));
export const NewSnippet = lazy(() => import('./NewSnippet'));
export const Editor = lazy(() => import('./Editor'));
export const OutputEditor = lazy(() => import('./OutputEditor'));

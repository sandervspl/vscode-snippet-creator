import { lazy } from 'react';

export { FullscreenLoader } from './FullscreenLoader';
export { default as Home } from './Home';
export { default as NewSnippet } from './NewSnippet';

export const Editor = lazy(() => import('./Editor'));
export const OutputEditor = lazy(() => import('./OutputEditor'));

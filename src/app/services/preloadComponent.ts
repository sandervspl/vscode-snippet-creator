import * as Loadable from 'react-loadable';

export const preloadComponent = (component: Loadable.LoadableComponent) => () => {
  component.preload();
};

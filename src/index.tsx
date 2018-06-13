import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { SSR } from 'config/index';
import Root from './app/components/Root';
import './manifest.json';

if (!global._babelPolyfill) {
  require('@babel/polyfill');
}

const app = document.getElementById('app');

const render = Component => {
  if (__DEV__ || !SSR) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      app,
    );
  } else {
    ReactDOM.hydrate(<Component />, app);
  }
};

render(Root);
// registerServiceWorker();

if (__DEV__ && module.hot) {
  module.hot.accept('./app/components/Root', () => {
    render(require('./app/components/Root'));
  });
}

import * as React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { globalStyles, theme } from 'app/styles';
import { storeDirectory, history } from 'app/stores';
import App from './App';

import 'app/static/favicon.ico';

globalStyles();

export default () => (
  <Provider {...storeDirectory}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);

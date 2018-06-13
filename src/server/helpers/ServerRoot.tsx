import * as React from 'react';
import { StyleSheetManager, ThemeProvider } from 'styled-components';
import { StaticRouter } from 'react-router';
import { Provider } from 'mobx-react';
import App from 'components/App';
import { theme, globalStyles } from 'app/styles';
import { storeDirectory } from 'app/stores';

globalStyles();

export default ({ location, sheet }) => (
  <Provider {...storeDirectory}>
    <StyleSheetManager sheet={sheet}>
      <ThemeProvider theme={theme}>
        <StaticRouter location={location} context={{}}>
          <App/>
        </StaticRouter>
      </ThemeProvider>
    </StyleSheetManager>
  </Provider>
);

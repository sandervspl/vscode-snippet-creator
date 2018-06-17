import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Home } from './modules';

// @ts-ignore
// TypeScript issue
@withRouter // necessary for App to re-render on route change
@observer
class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    );
  }
}

export interface AppProps {}

export default App;

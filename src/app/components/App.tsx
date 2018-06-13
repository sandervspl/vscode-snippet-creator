import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Test } from './modules';

// @ts-ignore
// Argument of type 'typeof App' is not assignable to parameter of type 'ComponentType<RouteComponentType<any>>'.
@withRouter // necessary for App to re-render on route change
@observer
class App extends React.Component<AppProps, {}> {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Test}/>
        </Switch>
      </main>
    );
  }
}

export interface AppProps {}

export default App;

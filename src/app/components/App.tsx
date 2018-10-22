import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Head } from '@common';
import { Home } from './modules';

@observer
class App extends React.Component<AppProps> {
  render() {
    return (
      <>
        <Head />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </>
    );
  }
}

export interface AppProps extends RouteComponentProps {}

// withRouter is necessary for App to re-render on route change (MobX's fault)
export default withRouter(App);

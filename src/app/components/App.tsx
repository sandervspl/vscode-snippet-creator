// @ts-ignore
import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Head } from '@common';
import { Home, FullscreenLoader } from '@modules';

@observer
class App extends Component<AppProps> {
  render() {
    return (
      <>
        <Head />
        <Suspense fallback={FullscreenLoader}>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </Suspense>
      </>
    );
  }
}

export interface AppProps extends RouteComponentProps {}

export default withRouter(App);

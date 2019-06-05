// @ts-ignore
import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { localStorageHelper } from 'app/services';
import { Head } from '@common';
import { Home, FullscreenLoader } from '@modules';
import { EditorStore } from 'stores/Editor';

@observer
class App extends Component<AppProps> {
  componentDidMount() {
    const savedOptions = localStorageHelper.editor.get();

    // Store default settings in localstorage
    if (!savedOptions) {
      localStorageHelper.editor.set({
        options: { ...EditorStore.INIT_OPTIONS }
      });
    }
  }

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

// @ts-ignore
import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { SnackbarProvider } from 'notistack';
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
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Head />
        <Suspense fallback={FullscreenLoader}>
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </Suspense>
      </SnackbarProvider>
    );
  }
}

export type AppProps = RouteComponentProps;

export default withRouter(App);

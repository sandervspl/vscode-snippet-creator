import * as i from 'types';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { localStorageHelper } from 'app/services';
import { Head } from '@common';
import { Home } from '@modules';
import Stores from 'app/stores';

@inject(Stores.editorStore)
@observer
class App extends Component<AppProps> {
  componentDidMount() {
    const { editorStore } = this.props;
    const editorStorage = localStorageHelper.editor.get();

    // Store default settings in localstorage
    if (!editorStorage) {
      localStorageHelper.editor.initOptions();
    }

    // Save localstorage in state
    if (editorStorage && editorStorage.options) {
      editorStore!.options = editorStorage.options;
    }
  }

  render() {
    return (
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Head />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </main>
      </SnackbarProvider>
    );
  }
}

export type AppProps = RouteComponentProps & {
  editorStore?: i.EditorStore;
};

export default withRouter(App);

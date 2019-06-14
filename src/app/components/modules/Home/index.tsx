import * as i from '@types';
import React, { Component, Suspense } from 'react';
import { inject, observer } from 'mobx-react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Stores from 'app/stores';
import { Editor, OutputEditor, NewSnippet } from '@modules';
import { FullscreenLoader } from 'modules/FullscreenLoader';
import { EditorContainer } from 'common/Editor';
import SettingsButton from './components/SettingsButton';
import Tabs from './components/Tabs';
import { Container, StyledAppBar, EditorsContainer } from './components/styled';

@inject(Stores.editorTabsStore)
@observer
class Home extends Component<Props> {
  render() {
    const { tabId, activeTab } = this.props.editorTabsStore!;

    return (
      <Container>
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="h2">
              SNIPPET CREATOR
            </Typography>
            <SettingsButton />
          </Toolbar>
        </StyledAppBar>
        <EditorsContainer>
          <EditorContainer>
            <Tabs tabId={tabId} />
            <Suspense fallback={FullscreenLoader}>
              {activeTab && activeTab.ready ? (
                <Editor tabId={tabId} />
              ) : (
                <NewSnippet />
              )}
            </Suspense>
          </EditorContainer>
          <EditorContainer>
            <Suspense fallback={FullscreenLoader}>
              <OutputEditor />
            </Suspense>
          </EditorContainer>
        </EditorsContainer>
      </Container>
    );
  }
}

interface Props {
  editorTabsStore?: i.EditorTabsStore;
}

export default Home;

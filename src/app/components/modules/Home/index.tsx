import * as i from '@types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Stores from 'app/stores';
import { Editor, OutputEditor } from '@modules';
import { Container, StyledAppBar, EditorsContainer } from './components/styled';
import SettingsButton from './components/SettingsButton';

@inject(Stores.editorTabsStore)
@observer
class Home extends Component<HomeProps> { 
  render() {
    const { tabId } = this.props.editorTabsStore!;
    
    return (
      <Container>
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="title">
              Snippet Creator
            </Typography>
            <SettingsButton />
          </Toolbar>
        </StyledAppBar>
        <EditorsContainer>
          <Editor tabId={tabId} />
          <OutputEditor />
        </EditorsContainer>
      </Container>
    );
  }
}

interface HomeProps {
  editorTabsStore?: i.EditorTabsStore;
}

export default Home;

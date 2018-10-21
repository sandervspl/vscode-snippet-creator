import * as i from '@types';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Toolbar, Typography } from '@material-ui/core';
import Stores from 'app/stores';
import { Editor, OutputEditor } from '@modules';
import { Container, StyledAppBar, EditorsContainer } from './components/styled';

@inject(Stores.editorTabsStore)
@observer
class Home extends React.Component<HomeProps> { 
  render() {
    const { tabId } = this.props.editorTabsStore;
    
    return (
      <Container>
        <StyledAppBar position="static">
          <Toolbar>
            <Typography variant="title">
              VSCode Snippet Creator
            </Typography>
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

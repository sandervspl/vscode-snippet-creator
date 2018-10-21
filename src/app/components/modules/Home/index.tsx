import * as i from '@types';
import * as React from 'react';
import * as monaco from 'monaco-editor';
import { inject, observer } from 'mobx-react';
import { Toolbar, Typography } from '@material-ui/core';
import Stores from 'app/stores';
import { Editor } from '@modules';
import { Container, StyledAppBar, EditorsContainer } from './components/styled';

@inject(Stores.editorTabsStore, Stores.editorStore, Stores.outputStore)
@observer
class Home extends React.Component<HomeProps> {
  outputContainer: HTMLElement;
  outputEditor: monaco.editor.IStandaloneCodeEditor;

  state = {
    value: '',
    output: '',
  };

  componentDidMount() {
    this.outputEditor = monaco.editor.create(this.outputContainer, {
      language: 'json',
      minimap: {
        enabled: false,
      },
    });
    this.outputEditor.setValue(this.props.outputStore.body);
    monaco.editor.setTheme('vs-dark');
  }

  componentDidUpdate() {
    this.outputEditor.setValue(this.props.outputStore.body);
  }
  
  assignRef2 = (c: HTMLElement) => {
    this.outputContainer = c;
  }
  
  render() {
    const { tabId } = this.props.editorTabsStore;
    // Import to rerender when output body changes
    const { body } = this.props.outputStore;
    
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
          <section ref={this.assignRef2} style={{ width: '50%', height: '100%' }} />
        </EditorsContainer>
      </Container>
    );
  }
}

interface HomeProps {
  editorTabsStore?: i.EditorTabsStore;
  editorStore?: i.EditorStore;
  outputStore?: i.OutputStore;
  value: string;
  output: string; // stringified JSON
}

export default Home;

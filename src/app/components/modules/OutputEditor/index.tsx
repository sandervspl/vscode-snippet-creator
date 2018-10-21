import * as i from '@types';
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import * as monaco from 'monaco-editor';
import { Button } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Stores from 'app/stores';
import { EditorContainer } from 'common/Editor';
import { TopContainer, OutputMonacoEditor } from './components/styled';

@inject(Stores.outputStore)
@observer
class OutputEditor extends React.Component<OutputProps> {
  outputContainer: HTMLElement;
  outputEditor: monaco.editor.IStandaloneCodeEditor;

  componentDidMount() {
    this.outputEditor = monaco.editor.create(this.outputContainer, {
      language: 'json',
      readOnly: true,
      minimap: {
        enabled: false,
      },
    });
    this.setEditorBody();
    monaco.editor.setTheme('vs-dark');
  }

  componentDidUpdate() {
    this.setEditorBody();
  }

  setEditorBody = () => {
    this.outputEditor.setValue(`{\n${this.props.outputStore.body}\n}`);
  }
  
  assignRef2 = (c: HTMLElement) => {
    this.outputContainer = c;
  }

  render() {
    const { body } = this.props.outputStore;

    return (
      <EditorContainer>
        <TopContainer style={{ width: '100%', minHeight: '48px' }}>
          <CopyToClipboard text={body}>
            <Button variant="contained">
              Copy Snippet
            </Button>
          </CopyToClipboard>
        </TopContainer>
        <OutputMonacoEditor ref={this.assignRef2} />
      </EditorContainer>
    );
  }
}

interface OutputProps {
  outputStore?: i.OutputStore;
}

export default OutputEditor;

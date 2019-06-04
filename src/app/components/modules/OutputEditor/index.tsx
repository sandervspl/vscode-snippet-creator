import * as i from '@types';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Button from '@material-ui/core/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Stores from 'app/stores';
import { EditorContainer } from 'common/Editor';
import { TopContainer, OutputMonacoEditor } from './components/styled';

@inject(Stores.outputStore)
@observer
class OutputEditor extends Component<OutputProps> {
  outputEditor: monaco.editor.IStandaloneCodeEditor;
  editorRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.outputEditor = monaco.editor.create(this.editorRef.current!, {
      automaticLayout: true,
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
    this.outputEditor.setValue(`{\n${this.props.outputStore!.body}\n}`);
  }

  render() {
    const { body } = this.props.outputStore!;

    return (
      <EditorContainer>
        <TopContainer style={{ width: '100%', minHeight: '48px' }}>
          <CopyToClipboard text={body}>
            <Button variant="contained">
              Copy to clipboard
            </Button>
          </CopyToClipboard>
        </TopContainer>
        <OutputMonacoEditor ref={this.editorRef} />
      </EditorContainer>
    );
  }
}

interface OutputProps {
  outputStore?: i.OutputStore;
}

export default OutputEditor;

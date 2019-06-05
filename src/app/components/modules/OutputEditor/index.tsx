import * as i from '@types';
import React, { Component } from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Button from '@material-ui/core/Button';
import CopyToClipboard from 'react-copy-to-clipboard';
import Stores from 'app/stores';
import { localStorageHelper } from 'app/services';
import { EditorContainer } from 'common/Editor';
import { TopContainer, OutputMonacoEditor } from './components/styled';

@inject(Stores.outputStore, Stores.editorStore)
@observer
class OutputEditor extends Component<OutputProps> {
  outputEditor: monaco.editor.IStandaloneCodeEditor;
  editorRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const savedOptions = localStorageHelper.editor.get();
    let initLang = 'json';

    if (savedOptions) {
      if (savedOptions.options.editor === 'Atom') {
        initLang = 'cson';
      }
    }

    this.outputEditor = monaco.editor.create(this.editorRef.current!, {
      automaticLayout: true,
      language: initLang,
      readOnly: true,
      minimap: {
        enabled: false,
      },
    });

    monaco.editor.setTheme('vs-dark');

    this.setEditorBody();
  }

  componentDidUpdate(prevProps: OutputProps) {
    this.setEditorBody();
  }

  // Update editor on settings changes
  updateEditorOptions = reaction(
    (): i.EditorOptions['editor']  => this.props.editorStore!.options.editor,
    () => {
      const { editorStore } = this.props;

      // Update language
      let language = 'json';

      if (editorStore!.isAtomFormatting) {
        language = 'cson';
      }

      monaco.editor.setModelLanguage(this.outputEditor.getModel(), language);
    }
  );

  setEditorBody = () => {
    if (this.props.editorStore!.isVSCodeFormatting) {
      this.outputEditor.setValue(`{\n${this.props.outputStore!.body}\n}`);
    }

    if (this.props.editorStore!.isAtomFormatting) {
      this.outputEditor.setValue(this.props.outputStore!.body);
    }
  }

  render() {
    const { body } = this.props.outputStore!;

    return (
      <EditorContainer>
        <TopContainer>
          <CopyToClipboard text={body}>
            <Button variant="text" color="inherit">
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
  editorStore?: i.EditorStore;
}

export default OutputEditor;

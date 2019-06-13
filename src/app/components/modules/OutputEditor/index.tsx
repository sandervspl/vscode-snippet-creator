import * as i from '@types';
import React, { Component } from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CopyToClipboard from 'react-copy-to-clipboard';
import { WithSnackbarProps, withSnackbar } from 'notistack';
import Stores from 'app/stores';
import { localStorageHelper } from 'app/services';
import { EditorContainer } from 'common/Editor';
import { TopContainer, OutputMonacoEditor, EditorIndicator } from './components/styled';

@inject(Stores.outputStore, Stores.editorStore)
@observer
class OutputEditor extends Component<Props> {
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

  componentDidUpdate() {
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

  onCopy = () => {
    this.props.enqueueSnackbar('Snippet copied to clipboard!', { variant: 'success' });
  }

  render() {
    const { body } = this.props.outputStore!;
    const { editor } = this.props.editorStore!.options;

    return (
      <EditorContainer>
        <TopContainer>
          <CopyToClipboard text={body} onCopy={this.onCopy}>
            <Button variant="text" color="inherit">
              <FileCopyIcon />
              Copy snippet
            </Button>
          </CopyToClipboard>

          <EditorIndicator>{editor}</EditorIndicator>
        </TopContainer>
        <OutputMonacoEditor ref={this.editorRef} />
      </EditorContainer>
    );
  }
}

type Props = WithSnackbarProps & {
  outputStore?: i.OutputStore;
  editorStore?: i.EditorStore;
}

export default withSnackbar(OutputEditor);

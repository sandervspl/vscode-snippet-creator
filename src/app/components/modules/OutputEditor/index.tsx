import * as i from '@types';
import React, { useEffect, useContext, useState, useRef } from 'react';
import { reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Button from '@material-ui/core/Button';
import CopyToClipboard from 'react-copy-to-clipboard';
import _ from 'lodash';
import Stores, { storeDirectory } from 'app/stores';
import { localStorageHelper } from 'app/services';
import { EditorContainer } from 'common/Editor';
import { TopContainer, OutputMonacoEditor, EditorIndicator } from './components/styled';
import { WithSnackbarProps, withSnackbar } from 'notistack';

const OutputEditor: React.FC<Props> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [outputEditor, setOutputEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const outputStore = useContext(storeDirectory.outputStore);

  useEffect(() => {
    const savedOptions = localStorageHelper.editor.get();
    let initLang = 'json';

    if (savedOptions) {
      if (savedOptions.options.editor === 'Atom') {
        initLang = 'cson';
      }
    }

    setOutputEditor(monaco.editor.create(editorRef.current!, {
      automaticLayout: true,
      language: initLang,
      readOnly: true,
      minimap: {
        enabled: false,
      },
    }));

    monaco.editor.setTheme('vs-dark');

    setEditorBody();
  }, []);

  /** useEffect does not seem to work for some reason */
  // Update editor on settings changes
  reaction(
    ()  => props.editorStore!.options.editor,
    () => {
      if (!outputEditor) return;

      const { editorStore } = props;

      // Update language
      let language = 'json';

      if (editorStore!.isAtomFormatting) {
        language = 'cson';
      }

      monaco.editor.setModelLanguage(outputEditor.getModel(), language);

      // Update formatting
      setEditorBody();
    }
  );

  /** useEffect does not seem to work for some reason */
  // Format output value on value change
  reaction(
    () => outputStore.body,
    () => {
      setEditorBody();
    }
  );

  const setEditorBody = () => {
    if (!outputEditor) return;

    if (props.editorStore!.isVSCodeFormatting) {
      outputEditor.setValue(`{\n${outputStore.body}\n}`);
    }

    if (props.editorStore!.isAtomFormatting) {
      outputEditor.setValue(outputStore.body);
    }
  };

  const onCopy = () => {
    props.enqueueSnackbar('Snippet copied to clipboard!', { variant: 'success' });
  };

  const { body } = outputStore;
  const { editor } = props.editorStore!.options;

  return (
    <EditorContainer>
      <TopContainer>
        <CopyToClipboard text={body} onCopy={onCopy}>
          <Button variant="text" color="inherit">
            Copy to clipboard
          </Button>
        </CopyToClipboard>

        <EditorIndicator>{editor}</EditorIndicator>
      </TopContainer>
      <OutputMonacoEditor ref={editorRef} />
    </EditorContainer>
  );
};

type Props = WithSnackbarProps & {
  outputStore?: i.OutputStore;
  editorStore?: i.EditorStore;
}


export default _.flowRight(
  inject(Stores.editorStore),
  observer,
  withSnackbar,
)(OutputEditor);

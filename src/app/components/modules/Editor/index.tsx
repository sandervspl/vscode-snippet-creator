import * as i from '@types';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { observer, inject } from 'mobx-react';
import * as monaco from 'monaco-editor';
import _ from 'lodash';
import Stores, { storeDirectory } from 'app/stores';
import { useForceUpdate } from 'hooks';
import { EditorContainer, MonacoEditor } from 'common/Editor';
import { Tabs } from './components';

export const Editor: React.FC<Props> = ({ tabId, editorStore, editorTabsStore }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const outputStore = useContext(storeDirectory.outputStore);
  const forceUpdate = useForceUpdate();

  // Instantiate editor
  useEffect(() => {
    const { options } = editorStore!;

    setEditor(monaco.editor.create(editorRef.current!, {
      automaticLayout: true,
      language: options.language,
      minimap: {
        enabled: false,
      },
    }));
  }, []);

  // After editor is instantiated
  useEffect(() => {
    if (!editor) return;

    const { options } = editorStore!;

    editor.getModel().updateOptions({
      tabSize: options.indent,
    });

    // Update store when content in the editor updates
    editor.onDidChangeModelContent(() => {
      const { tabId } = editorTabsStore!;
      const value = editor.getValue();

      // Update value in store
      editorStore!.setBody(tabId, value);

      // Update value in output
      outputStore.body = value;

      // Force re-render to show parsed output
      forceUpdate();
    });
  }, [editor]);

  // Update editor on settings changes
  useEffect(() => {
    if (!editor) return;

    const { options } = editorStore!;

    // Set indent
    editor.getModel().updateOptions({
      tabSize: options.indent,
    });

    // Set language
    monaco.editor.setModelLanguage(editor.getModel(), options.language);
  }, [editorStore!.options]);

  // Change body of editor when we switch tabs
  useEffect(() => {
    if (!editor) return;

    editor.setValue(editorStore!.getBody(tabId));
  }, [tabId]);

  return (
    <EditorContainer>
      <Tabs tabId={editorTabsStore!.tabId} />
      <MonacoEditor ref={editorRef} />
    </EditorContainer>
  );
};

export interface Props {
  editorStore?: i.EditorStore;
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default _.flowRight(
  inject(Stores.editorTabsStore, Stores.editorStore),
  observer,
)(Editor);

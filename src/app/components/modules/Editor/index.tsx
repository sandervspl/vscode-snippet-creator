import * as i from '@types';
import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as monaco from 'monaco-editor';
import { localStorageHelper } from '@services';
import Stores from 'app/stores';
import { EditorContainer, MonacoEditor } from 'common/Editor';
import { Tabs } from './components';

@inject(Stores.editorTabsStore, Stores.editorStore)
@observer
export class Editor extends Component<EditorProps> {
  editor: monaco.editor.IStandaloneCodeEditor;
  editorRef = React.createRef<HTMLDivElement>();

  // Update editor on settings changes
  updateEditorOptions = reaction(
    (): i.EditorOptions => ({
      indent: this.props.editorStore!.options.indent,
      language: this.props.editorStore!.options.language,
    }),
    (options) => {
      // Set indent
      this.editor.getModel().updateOptions({
        tabSize: options.indent,
      });

      // Set language
      monaco.editor.setModelLanguage(this.editor.getModel(), options.language);
    }
  );

  componentDidUpdate(prevProps: EditorProps) {
    const { tabId: prevTabId } = prevProps;
    const { editorStore, tabId } = this.props;

    // Change body of editor when we switch tabs
    if (prevTabId !== tabId) {
      this.editor.setValue(editorStore!.getBody(tabId));
    }

    // Sync store value with editor value
    if (this.editor.getValue() !== editorStore!.getBody(tabId)) {
      this.editor.setValue(editorStore!.getBody(tabId));
    }
  }

  componentDidMount() {
    const { editorStore } = this.props;
    const editorStorage = localStorageHelper.editor.get() as i.EditorLocalStorage;
    let { options } = editorStorage;

    // Save default settings in localstorage
    if (!options) {
      options = {
        language: editorStore!.options.language,
        indent: editorStore!.options.indent,
      };

      localStorageHelper.editor.setOptions(options);
    } else {
      // Save localstorage in state
      editorStore!.options = options;
    }

    this.editor = monaco.editor.create(this.editorRef.current!, {
      automaticLayout: true,
      language: options.language,
      minimap: {
        enabled: false,
      },
    });

    this.editor.getModel().updateOptions({
      tabSize: options.indent,
    });

    this.editor.onDidChangeModelContent(() => {
      const { tabId } = this.props.editorTabsStore!;
      const value = this.editor.getValue();

      // Update value in store
      this.props.editorStore!.setBody(tabId, value);

      this.forceUpdate();
    });
  }
  
  render() {
    const { editorTabsStore } = this.props;
    
    return (
      <EditorContainer>
        <Tabs tabId={editorTabsStore!.tabId} />
        <MonacoEditor ref={this.editorRef} />
      </EditorContainer>
    );
  }
}

export interface EditorProps {
  editorStore?: i.EditorStore;
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default Editor;

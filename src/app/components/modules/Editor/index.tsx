import * as i from '@types';
import React, { Component } from 'react';
import { reaction } from 'mobx';
import { observer, inject } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Stores from 'app/stores';
import { MonacoEditor } from 'common/Editor';

@inject(Stores.editorTabsStore, Stores.editorStore)
@observer
export class Editor extends Component<EditorProps> {
  editor: monaco.editor.IStandaloneCodeEditor;
  editorRef = React.createRef<HTMLDivElement>();

  // Update editor on settings changes
  updateEditorOptions = reaction(
    (): i.EditorOptions => this.props.editorStore!.options,
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
    const { options } = editorStore!;

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

    // Update store when content in the editor updates
    this.editor.onDidChangeModelContent(() => {
      const { tabId } = this.props.editorTabsStore!;
      const value = this.editor.getValue();

      // Update value in store
      this.props.editorStore!.setBody(tabId, value);

      this.forceUpdate();
    });
  }

  render() {
    return (
      <MonacoEditor ref={this.editorRef} />
    );
  }
}

export interface EditorProps {
  editorStore?: i.EditorStore;
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

export default Editor;

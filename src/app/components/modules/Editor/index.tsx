import * as i from 'app/interfaces';
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import * as monaco from 'monaco-editor';
import Stores from 'app/stores';
import { EditorContainer, MonacoEditor } from './components/styled';
import { Tabs } from './components';

@inject(Stores.editorTabsStore, Stores.editorStore)
@observer
export class Editor extends React.Component<EditorProps> {
  editorContainer: HTMLElement;
  editor: monaco.editor.IStandaloneCodeEditor;

  componentDidUpdate(prevProps) {
    const { tabId: prevTabId } = prevProps;
    const { editorStore, tabId } = this.props;

    // Change body of editor when we switch tabs
    if (prevTabId !== tabId) {
      this.editor.setValue(editorStore.getBody(tabId));
    }

    // Sync store value with editor value
    if (this.editor.getValue() !== editorStore.getBody(tabId)) {
      this.editor.setValue(editorStore.getBody(tabId));
    }
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainer, { language: 'javascript' });

    this.editor.onDidChangeModelContent(() => {
      const { tabId } = this.props.editorTabsStore;
      const value = this.editor.getValue();

      // Update value in store
      this.props.editorStore.setBody(tabId, value);

      this.forceUpdate();
    });
  }

  assignRef = (c: HTMLElement) => {
    this.editorContainer = c;
  }
  
  render() {
    const { editorTabsStore } = this.props;
    
    return (
      <EditorContainer>
        <Tabs tabId={editorTabsStore.tabId} />
        <MonacoEditor innerRef={this.assignRef} />
      </EditorContainer>
    );
  }
}

export interface EditorProps {
  editorStore?: i.EditorStore;
  editorTabsStore?: i.EditorTabsStore;
  tabId: number;
}

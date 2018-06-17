import * as i from 'app/interfaces';
import * as React from 'react';
import * as monaco from 'monaco-editor';
import { Editor } from 'modules/Editor';
import { inject, observer } from 'mobx-react';
import Stores from 'app/stores';

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
    this.outputEditor = monaco.editor.create(this.outputContainer, { language: 'json' });
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
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <Editor tabId={tabId} />
        <section ref={this.assignRef2} style={{width:'50%', height:'100%'}} />
      </div>
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

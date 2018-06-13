import * as React from 'react';
import * as monaco from 'monaco-editor';

class Home extends React.Component {
  editorContainer: HTMLElement;
  editor: monaco.editor.IStandaloneCodeEditor;

  state = {
    value: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.editor.setValue(this.state.value);
    }
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainer, { language: 'javascript' });
    monaco.editor.setTheme('vs-dark');

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      this.setState({ value });
    });
  }

  assignRef = (c: HTMLElement) => {
    this.editorContainer = c;
  }
  
  render() {
    return (
      <>
        <h1>hello</h1>
        <section ref={this.assignRef} style={{width:'800px', height:'600px', border:'1px solid #ccc'}} />
      </>
    );
  }
}

export default Home;

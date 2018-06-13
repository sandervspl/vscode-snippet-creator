import * as React from 'react';
import * as monaco from 'monaco-editor';

interface SnippetOutput {
  [name: string]: {
    prefix: string;
    body: string[];
    description?: string;
  }
}

class Home extends React.Component<{}, HomeProps> {
  editorContainer: HTMLElement;
  editor: monaco.editor.IStandaloneCodeEditor;

  state = {
    value: '',
    output: {},
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.editor.setValue(this.state.value);
      
      // @TODO: turn state.output to a JSON
      // console.log(this.state.output);
    }
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorContainer, { language: 'javascript' });
    monaco.editor.setTheme('vs-dark');

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();

      const output: SnippetOutput = {
        'test': {
          prefix: 'test',
          body: value.split('\n'),
        },
      };

      this.setState({
        value,
        output: JSON.stringify(output, null, 2),
      });
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

interface HomeProps {
  value: string;
  output: string; // stringified JSON
}

export default Home;

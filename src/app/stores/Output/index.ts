import * as i from '@types';
import { observable, computed } from 'mobx';
import { storeDirectory as stores } from 'app/stores';

class OutputStore implements i.OutputStore {
  @observable private value = '';

  formatVSCode = (snippet: i.Snippet): string => {
    const output: i.SnippetOutput = {
      [snippet.name]: {
        prefix: snippet.prefix,
        body: this.value.split('\n'),
      },
    };

    let outputStr = JSON.stringify(output, null, 2);
    outputStr = outputStr.substr(2, outputStr.length - 4);

    return outputStr;
  }
  
  formatAtom = (snippet: i.Snippet): string => {
    const fixedBody = this.value
      .split('\n')
      .map((line, i) => i === 0 ? line : `    ${line}`)
      .join('\n');

    return `'${snippet.name}':\n  'prefix': '${snippet.prefix}'\n  'body': """\n    ${fixedBody}\n  """`;
  }

  @computed
  get body(): string {
    const { editorTabsStore, editorStore } = stores;
    const snippet = editorTabsStore.activeTab;

    if (editorStore.isVSCodeFormatting) {
      return this.formatVSCode(snippet);
    }

    if (editorStore.isAtomFormatting) {
      return this.formatAtom(snippet);
    }

    return '';
  }

  set body(value: string) {
    this.value = value;
  }
}

const store = new OutputStore();

export default store;

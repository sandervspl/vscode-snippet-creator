import * as i from '@types';
import { observable, computed, action } from 'mobx';
import { storeDirectory as stores } from 'app/stores';

class OutputStore implements i.OutputStore {
  @observable private value = '';

  @computed
  get body(): string {
    const { editorTabsStore } = stores;
    const snippet = editorTabsStore.activeTab;
    
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

  set body(value: string) {
    this.value = value;
  }
}

const store = new OutputStore();

export default store;

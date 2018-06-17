import * as i from 'app/interfaces';
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
    
    return JSON.stringify(output, null, 2);
  }

  set body(value: string) {
    this.value = value;
  }
}

const store = new OutputStore();

export default store;

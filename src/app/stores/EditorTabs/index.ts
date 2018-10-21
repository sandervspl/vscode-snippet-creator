import * as i from '@types';
import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';

class EditorTabsStore implements i.EditorTabsStore {
  // tabId is is NOT related to Snippet.id
  @observable tabId = 0;
  @observable tabs: i.Snippet[] = [{ id: 0, name: '', prefix: '' }];

  @computed
  get activeTab(): i.Snippet {
    return this.tabs[this.tabId];
  }

  @action
  public addTab = (name: string, prefix: string) => {
    this.tabs = [
      ...(this.tabs.length > 1 ? this.tabs.filter(tab => tab.id !== 0) : []),
      {
        id: this.tabs.length,
        name,
        prefix,
      },
      this.tabs.find(tab => tab.id === 0),
    ];

    this.tabId = this.tabs.length - 2;
  }
}

const store = new EditorTabsStore();

export default store;

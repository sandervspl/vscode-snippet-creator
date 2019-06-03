import * as i from '@types';
import { observable, computed, action } from 'mobx';
import _ from 'lodash';

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
    const firstTab = this.tabs.find(tab => tab.id === 0)!;
    const notFirstTabs: i.Snippet[] = this.tabs.length > 1 ? this.tabs.filter(tab => tab.id !== 0) : [];

    const newTab = {
      id: this.tabs.length,
      name,
      prefix,
    };

    const newTabs = [
      ...notFirstTabs,
      newTab,
      firstTab,
    ];

    this.tabs = newTabs;

    this.tabId = this.tabs.length - 2;
  }
}

const store = new EditorTabsStore();

export default store;

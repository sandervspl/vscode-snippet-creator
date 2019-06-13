import * as i from '@types';
import { observable, action } from 'mobx';

class EditorTabsStore implements i.EditorTabsStore {
  private static readonly INIT_TAB = {
    id: 0,
    name: '',
    prefix: '',
    ready: false,
  };

  /**
   * @note tabId is is NOT related to Snippet.id
   */
  @observable tabId = 0;
  @observable tabs: i.Snippet[] = [EditorTabsStore.INIT_TAB];

  public get activeTab(): i.Snippet {
    return this.tabs[this.tabId];
  }

  public setActiveTab = (id: number) => {
    this.tabId = id;
  }

  @action
  public addTab = (name: string, prefix: string) => {
    const firstTab = this.tabs.find((tab) => tab.id === 0) || this.tabs[0];

    const notFirstTabs: i.Snippet[] = this.tabs.length > 1
      ? this.tabs.filter((tab) => tab.id !== 0)
      : [];

    const newTab = {
      ...EditorTabsStore.INIT_TAB,
      id: this.tabs.length,
      name,
      prefix,
    };

    const newTabs = [
      ...notFirstTabs,
      firstTab,
      newTab,
    ];

    this.tabs = newTabs;

    this.tabId = this.tabs.length - 2;
  }

  @action
  public updateTab = (name: string, prefix = '', ready = false) => {
    this.tabs[this.tabId] = {
      ...this.tabs[this.tabId],
      name,
      prefix,
      ready,
    };
  }

  @action
  public addEmptyTab = () => {
    this.addTab('', '');
  }
}

const store = new EditorTabsStore();

export default store;

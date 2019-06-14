import * as i from '@types';
import { observable, action } from 'mobx';
import { uniqueId } from 'lodash';

class EditorTabsStore implements i.EditorTabsStore {
  private getUniqueId = () => Number(uniqueId());

  private readonly INIT_TAB: i.Snippet = {
    id: this.getUniqueId(),
    name: 'Untitled',
    prefix: '',
    ready: false,
  };

  @observable tabId: number = this.INIT_TAB.id;
  @observable tabs: Record<number, i.Snippet> = {
    [this.INIT_TAB.id]: this.INIT_TAB,
  }

  @action
  public getTab = (id: number): i.Snippet => {
    return this.tabs[id];
  }

  public get activeTab(): i.Snippet {
    return this.getTab(this.tabId);
  }

  @action
  public setActiveTab = (id: number) => {
    this.tabId = id;
  }

  @action
  public addTab = (name: string, prefix: string): number => {
    const newTab = {
      ...this.INIT_TAB,
      id: this.getUniqueId(),
      name,
      prefix,
    };

    this.tabs = {
      ...this.tabs,
      [newTab.id]: newTab,
    };

    return newTab.id;
  }

  @action
  public addEmptyTab = (): number => {
    return this.addTab(this.INIT_TAB.name, '');
  }

  @action
  public updateTab = (name: string, prefix = '', ready = false) => {
    this.tabs = {
      ...this.tabs,
      [this.tabId]: {
        ...this.tabs[this.tabId],
        name,
        prefix,
        ready,
      },
    };
  }

  @action
  public removeTab = (id: number) => {
    this.toPreviousTab(id);

    delete this.tabs[id];
  }

  public isFirstTab = (id: number): boolean => {
    const tabIds = this.getTabIds();

    return tabIds.indexOf(id) === 0;
  }

  private getTabIds = (): number[] => {
    return Object.keys(this.tabs).map((key) => Number(key));
  }

  @action
  private toPreviousTab = (id: number) => {
    const tabIds = this.getTabIds();
    const indexOfTab = tabIds
      .map((key) => this.tabs[key].id)
      .indexOf(id);

    if (indexOfTab === -1) {
      this.tabId = tabIds[0];
    } else {
      const prevTabId = Math.max(0, indexOfTab - 1);
      this.tabId = tabIds[prevTabId];
    }
  }
}

const store = new EditorTabsStore();

export default store;

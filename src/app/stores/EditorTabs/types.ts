export interface EditorTabsStore {
  tabId: number;
  tabs: Snippet[];
  activeTab: Snippet;
  addTab: (name: string, prefix: string) => void;
}

export interface Snippet {
  id: number;
  name: string;
  prefix: string;
}

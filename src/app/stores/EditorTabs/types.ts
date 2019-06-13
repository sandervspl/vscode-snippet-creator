export interface EditorTabsStore {
  tabId: number;
  tabs: Snippet[];
  activeTab: Snippet;
  setActiveTab: (id: number) => void;
  addTab: (name: string, prefix: string) => void;
  addEmptyTab: () => void;
  updateTab: (name: string, prefix?: string, ready?: boolean) => void;
  removeTab: (id: number) => void;
}

export interface Snippet {
  id: number;
  name: string;
  prefix: string;
  ready: boolean;
}

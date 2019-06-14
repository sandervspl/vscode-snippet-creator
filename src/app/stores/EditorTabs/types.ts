export interface EditorTabsStore {
  tabId: number;
  tabs: Record<number, Snippet>;
  activeTab: Snippet | undefined;
  getTab: (id: number) => Snippet | undefined;
  setActiveTab: (id: number) => void;
  addTab: (name: string, prefix: string) => number;
  addEmptyTab: () => number;
  updateTab: (name: string, prefix?: string, ready?: boolean) => void;
  removeTab: (id: number) => void;
  isFirstTab: (id: number) => boolean;
}

export interface Snippet {
  id: number;
  name: string;
  prefix: string;
  ready: boolean;
}

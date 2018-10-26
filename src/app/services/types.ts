import EditorStorage from './localStorage/EditorStorage';

export interface LocalStorageRetriever<T = string> {
  get: () => T | {};
  set: (data: T) => void;
  clear: () => void;
}

export interface LocalStorage {
  editor: EditorStorage;
}

export enum LOCAL_STORAGE_KEY {
  'editor' = 'VSCSC_EDITOR',
}

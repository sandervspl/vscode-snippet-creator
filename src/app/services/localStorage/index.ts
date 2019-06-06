import * as i from '@types';
import EditorStorage from './EditorStorage';

class LocalStorage implements i.LocalStorage {
  public editor = new EditorStorage();
}

export const localStorageHelper = new LocalStorage();

import * as i from '@types';
import EditorStorage from './EditorStorage';

class LocalStorage implements i.LocalStorage {
  public editor = new EditorStorage();
}

const ls = new LocalStorage();

export const localStorageHelper = ls;

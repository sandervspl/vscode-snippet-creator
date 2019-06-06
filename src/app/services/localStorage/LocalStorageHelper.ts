import * as i from '@types';

export default class LocalStorageHelper<T> {
  constructor(private key: i.LOCAL_STORAGE_KEY) {}

  get = (): T | null => {
    const localStorageData = localStorage.getItem(this.key);

    if (localStorageData) {
      return JSON.parse(localStorageData);
    }

    return null;
  }
  
  set = (data: T) => {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear = () => {
    localStorage.removeItem(this.key);
  }
}

import * as i from '@types';

export default class LocalStorageHelper<T> {
  constructor(private key: i.LOCAL_STORAGE_KEY) {}

  get = () => {
    const data: T = JSON.parse(localStorage.getItem(this.key));
    return data || {};
  }
  
  set(data: T) {
    localStorage && localStorage.setItem(this.key, JSON.stringify(data));
  }

  clear = () => {
    localStorage && localStorage.removeItem(this.key);
  }
}

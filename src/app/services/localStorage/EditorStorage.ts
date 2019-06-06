import * as i from '@types';
import LocalStorageHelper from './LocalStorageHelper';
import { EditorStore } from 'stores/Editor';

export default class EditorStorage extends LocalStorageHelper<i.EditorLocalStorage> {
  constructor() {
    super(i.LOCAL_STORAGE_KEY.editor);
  }

  public initOptions = () => {
    this.set({
      options: EditorStore.INIT_OPTIONS,
    });
  }

  public setOptions = (options: Partial<i.EditorOptions>) => {
    const curData = this.get();
    let newData: i.EditorLocalStorage;

    if (curData) {
      newData = {
        ...curData,
        options: {
          ...curData.options,
          ...options,
        },
      };

      this.set(newData);
    } else {
      this.initOptions();
    }
  }
}

import * as i from '@types';
import LocalStorageHelper from './LocalStorageHelper';

export default class EditorStorage extends LocalStorageHelper<i.EditorLocalStorage> {
  constructor() {
    super(i.LOCAL_STORAGE_KEY.editor);
  }

  public setOptions(data: Partial<i.EditorOptions>) {
    const curData = this.get();

    if (curData) {
      const newData = {
        ...curData,
        options: {
          ...curData.options,
          ...data,
        },
      };

      super.set(newData);
    }
  }
}

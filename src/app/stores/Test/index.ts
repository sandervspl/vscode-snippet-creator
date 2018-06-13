import * as i from 'app/interfaces';
import { observable, action } from 'mobx';
import AsyncStore from '../abstract/Async';

class TestStore extends AsyncStore implements i.TestStore {
  @observable passed = false;

  @action
  public install = (): Promise<void> => {
    this.setLoading();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.setSuccess();
        this.passed = true;
        resolve();
      }, 2000);
    });
  }
}

const store = new TestStore();

export default store;

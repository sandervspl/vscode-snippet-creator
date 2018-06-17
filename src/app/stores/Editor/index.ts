import * as i from 'app/interfaces';
import { observable, computed, action } from 'mobx';
import outputStore from 'stores/Output';

class EditorStore implements i.EditorStore {
  @observable bodies: i.EditorBodies = {};

  // @computed
  public getBody(id: number): string {
    return this.bodies[id] || '';
  }

  @action
  public setBody(id: number, value: string) {
    this.bodies = {
      ...this.bodies,
      [id]: value,
    };

    outputStore.body = this.getBody(id);
  }
}

const store = new EditorStore();

export default store;

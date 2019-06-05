import * as i from '@types';
import { observable, computed, action, reaction } from 'mobx';
import outputStore from 'stores/Output';
import { localStorageHelper } from '@services';

export class EditorStore implements i.EditorStore {
  public static readonly INIT_OPTIONS: i.EditorOptions = {
    indent: 2,
    language: 'typescript',
    editor: 'VS Code',
  };

  @observable bodies: i.EditorBodies = {};
  @observable options: i.EditorOptions = EditorStore.INIT_OPTIONS;

  private updateStorage = reaction(
    (): i.EditorOptions => ({
      indent: this.options.indent,
      language: this.options.language,
      editor: this.options.editor,
    }),
    (options) => {
      localStorageHelper.editor.setOptions(options);
    }
  );

  public get isAtomFormatting() { return this.options.editor === 'Atom'; }
  public get isVSCodeFormatting() { return this.options.editor === 'VS Code'; }

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

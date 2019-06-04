import * as i from '@types';

export interface EditorStore {
  bodies: i.EditorBodies;
  options: i.EditorOptions;
  getBody: (id: number) => string;
  setBody: (id: number, value: string) => void;
}

export interface SnippetOutput {
  [name: string]: {
    prefix: string;
    body: string[];
    description?: string;
  }
}

export interface EditorBodies {
  [index: number]: string;
}

export interface EditorOptions {
  indent: number;
  language: 'javascript' | 'typescript';
  editor: 'VS Code' | 'Atom';
}

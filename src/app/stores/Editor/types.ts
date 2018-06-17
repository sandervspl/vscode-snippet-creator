export interface EditorStore {
  bodies: EditorBodies;
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

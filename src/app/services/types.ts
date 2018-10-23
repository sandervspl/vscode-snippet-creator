import * as i from '@types';
import * as React from 'react';
import EditorStorage from './localStorage/EditorStorage';

export type PropChildrenText = string;
export type PropChildrenNode = React.ReactChild | React.ReactChildren | React.ReactNode;
export type PropChildrenAll = PropChildrenText | PropChildrenNode;

export type ReactComponent = React.ComponentClass | React.StatelessComponent;

export interface LocalStorageRetriever<T = string> {
  get: () => T | {};
  set: (data: T) => void;
  clear: () => void;
}

export interface LocalStorage {
  editor: EditorStorage;
}

export enum LOCAL_STORAGE_KEY {
  'editor' = 'VSCSC_EDITOR',
}

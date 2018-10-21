// prop children types
import * as React from 'react';

export type PropChildrenText = string;
export type PropChildrenNode = React.ReactChild | React.ReactChildren | React.ReactNode;
export type PropChildrenAll = PropChildrenText | PropChildrenNode;

export type ReactComponent = React.ComponentClass | React.StatelessComponent;

export interface JWTokenService {
  get: () => string | null;
  set: (data: any) => void;
  clear: () => void;
}

export interface LocalStorageHelper {
  jwToken: JWTokenService;
}

export enum LOCAL_STORAGE_KEYS {
  'jwToken' = 'JW_TOKEN',
}

export { RouterStore } from 'mobx-react-router';
import { RouteComponentProps as IRouteComponentProps } from 'react-router-dom';

export * from 'services/types';
export * from 'services/composition/types';
export * from 'services/localStorage/types';

export * from 'stores/EditorTabs/types';
export * from 'stores/Editor/types';
export * from 'stores/Output/types';

export * from 'styles/types';

// Make generics optional
export interface RouteComponentProps<P = any, C = any> extends IRouteComponentProps<P, C> {}

export type AppType = 'client' | 'server';
export type EnvType = 'development' | 'acceptation' | 'production';

import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

export const LoadableComponent: React.StatelessComponent<LoadingComponentProps> = (props) => {
  if (props.error) {
    // tslint:disable-next-line no-console
    if (__DEV__) console.error(props.error);

    return <p>Error loading the page. Please reload the page.</p>;
  }

  return <p>Loading...</p>;
};

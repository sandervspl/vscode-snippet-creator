import * as React from 'react';
import Helmet from 'react-helmet';
import * as GA from 'services/scripts/GA';

export class Head extends React.Component {
  render() {
    // if (__DEV__) return null;

    return (
      <>
        <Helmet script={[{ src: GA.src }]} />
        <Helmet script={[{ innerHTML: GA.code }]} />
      </>
    );
  }
}

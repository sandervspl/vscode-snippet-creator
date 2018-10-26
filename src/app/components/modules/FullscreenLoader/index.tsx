import * as React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from './components/styled';

export const FullscreenLoader = (
  <Container>
    <CircularProgress color="secondary" size={100} />
  </Container>
);

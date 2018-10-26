import styledNormalize from './normalize';
import { createGlobalStyle } from '@styled-components';

export default createGlobalStyle`
  ${styledNormalize}

  body {
    max-height: 100vh;
    overflow-y: hidden;
  }
`;

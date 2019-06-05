import * as styledComponents from 'styled-components';
import { theme } from 'app/styles';

const {
  ServerStyleSheet,
  StyleSheetManager,
} = styledComponents;

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<typeof theme>;

export { css, createGlobalStyle, keyframes, ThemeProvider, ServerStyleSheet, StyleSheetManager };
export default styled;

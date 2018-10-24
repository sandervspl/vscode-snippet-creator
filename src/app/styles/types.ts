import * as i from '@types';

export interface Colors {
  black: string;
  white: string;
  primaryBg: string;
  primaryBgLight: string;
  primaryText: string;
  border: string;
}

export interface Fonts {
  primary: string;
}

export interface Theme {
  color: Colors;
  font: Fonts;
}

export interface BaseStyled {
  theme?: i.Theme;
  className?: string;
}

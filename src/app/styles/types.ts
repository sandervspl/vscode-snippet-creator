import * as i from 'app/interfaces';

export interface Colors {
  [colorName: string]: string;
}

export interface Fonts {
  [fontName: string]: string;
}

export interface Theme {
  color: Colors;
  font: Fonts;
}

export interface BaseStyled {
  theme?: i.Theme;
  className?: string;
}

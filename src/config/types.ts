import * as i from '@types';

export type PortNumber = {
  [k in i.AppType]: number;
};

export type EnvUrl = Partial<{
  [k in i.EnvType]: string;
}>;

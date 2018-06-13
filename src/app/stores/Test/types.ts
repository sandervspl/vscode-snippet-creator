import * as i from 'app/interfaces';

export interface TestStore extends i.AsyncStore {
  passed: boolean;
  isLoading: boolean;
  install: () => Promise<void>;
}

import * as i from 'app/interfaces';

export interface Fetcher extends i.ApiHelper {
  isLoading: boolean;
  hasLoaded: boolean;
  hasFailed: boolean;
  setLoading: () => void;
  setSuccess: () => void;
  setFailed: (err: any) => void;
  apiUri: string;
}

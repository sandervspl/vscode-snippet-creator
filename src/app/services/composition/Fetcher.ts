import * as i from '@types';
import { action, computed, observable } from 'mobx';
import * as qs from 'qs';
import { localStorageHelper } from '@services';
import apiConfig from 'config/api';

export class Fetcher implements i.Fetcher {
  @observable private loading: boolean = false;
  @observable private loaded: boolean = false;
  @observable private error: boolean = false;

  // Implementations can retrieve load states only with these functions.
  // Changing load state can only be done with setX actions.
  @computed
  public get isLoading(): boolean {
    return this.loading;
  }

  @computed
  public get hasLoaded(): boolean {
    return this.loaded;
  }

  @computed
  public get hasFailed(): boolean {
    return this.error;
  }

  @action
  public setLoading = () => {
    this.loading = true;
    this.loaded = false;
    this.error = false;
  }

  @action
  public setSuccess = () => {
    this.loading = false;
    this.loaded = true;
    this.error = false;
  }

  @action
  public setFailed = (err: any) => {
    this.loading = false;
    this.loaded = false;
    this.error = true;

    // tslint:disable-next-line no-console
    console.log(err);
  }

  public get apiUri(): string {
    const env = process.env.NODE_ENV || 'development';
    return {
      production: apiConfig.production,
      development: apiConfig.development,
    }[env];
  }

  get = ({ path, query, withAuth }: i.GenerateOptions) =>
    this.request(this.generateOptions({ method: 'GET', path, query, withAuth }))

  del = ({ path, query, withAuth }: i.GenerateOptions) =>
    this.request(this.generateOptions({ method: 'DELETE', path, query, withAuth }))

  post = ({ path, body, withAuth }: i.GenerateOptions) =>
    this.request(this.generateOptions({ method: 'POST', path, body, withAuth }))

  put = ({ path, body, withAuth }: i.GenerateOptions) =>
    this.request(this.generateOptions({ method: 'PUT', path, body, withAuth }))

  patch = ({ path, body, withAuth }: i.GenerateOptions) =>
    this.request(this.generateOptions({ method: 'PATCH', path, body, withAuth }))

  private request = async ({ path, options, handle401 }: i.RequestOptions): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(path, options)
        .then((response) => {
          const unauthorized = response.status === 401 || response.status === 403;

          if (unauthorized && handle401) {
            localStorageHelper.jwToken.clear();
          }

          // FOR DELETE CALLS WHEN BACK-END DOESN'T RETURN ANYTHING
          if (response.status === 204) return;

          if (response.ok) {
            return response.json();
          }

          return reject({ status: response.status, statusText: response.statusText });
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private generateOptions = (options: i.GenerateOptions): i.RequestOptions => {
    const { method, path, withAuth = false, query, body } = options;

    return {
      path: `${this.apiUri}${path}${query ? '?' : ''}${qs.stringify(query || {})}`,
      options: {
        headers: {
          'Content-Type': 'application/json',
        },
        method,
        ...body ? { body: JSON.stringify(body) } : {},
      },
      handle401: withAuth,
    };
  }
}

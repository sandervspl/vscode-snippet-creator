import * as i from 'app/interfaces';
import { action, computed, observable } from 'mobx';
import * as qs from 'qs';

abstract class AsyncStore implements i.AsyncStore {
  @observable private loading = false;
  @observable private loaded = false;
  @observable private error = false;

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
  };

  @action
  public setSuccess = () => {
    this.loading = false;
    this.loaded = true;
    this.error = false;
  };

  @action
  public setFailed = (err: any) => {
    this.loading = false;
    this.loaded = false;
    this.error = true;

    // tslint:disable-next-line no-console
    console.log(err);
  };

  public get apiUri(): string {
    const env = process.env.NODE_ENV || 'development';
    return {
      production: 'http://api.SOME_DOMAIN.com/api/v1/',
      development: 'http://localhost:8080/api/v1/',
    }[env];
  }

  public get api(): i.ApiHelper {
    return {
      get: ({ path, query, withAuth }: i.GenerateOptions) =>
        this.request(this.generateOptions({ method: 'GET', path, query, withAuth })),
      del: ({ path, query, withAuth }: i.GenerateOptions) =>
        this.request(this.generateOptions({ method: 'DELETE', path, query, withAuth })),
      post: ({ path, body, withAuth }: i.GenerateOptions) =>
        this.request(this.generateOptions({ method: 'POST', path, body, withAuth })),
      put: ({ path, body, withAuth }: i.GenerateOptions) =>
        this.request(this.generateOptions({ method: 'PUT', path, body, withAuth })),
      patch: ({ path, body, withAuth }: i.GenerateOptions) =>
        this.request(this.generateOptions({ method: 'PATCH', path, body, withAuth })),
    };
  }

  private request = async ({ path, options, handle401 }: i.RequestOptions): Promise<any> => {
    return new Promise((resolve, reject) => {
      fetch(path, options)
        .then(response => {
          const unauthorized = response.status === 401 || response.status === 403;

          if (unauthorized && handle401) {
            window.localStorage.removeItem('JWTTOKEN');
          }

          // FOR DELETE CALLS WHEN BACK-END DOESN'T RETURN ANYTHING
          if (response.status === 204) return;

          if (response.ok) {
            const token = response.headers.get('JWT-Token');
            if (token) window.localStorage.setItem('JWTTOKEN', token);
            return response.json();
          }

          return reject({ status: response.status, statusText: response.statusText });
        })
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

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
  };
}

export default AsyncStore;

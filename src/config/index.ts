export const env = process.env.NODE_ENV || 'development';

export const port = {
  client: process.env.PORT || 3000,
  server: 8080,
};

export const api = {
  production: `http://localhost:${port.server}/api/v1/`,
  development: `http://localhost:${port.server}/api/v1/`,
}[env];

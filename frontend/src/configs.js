export const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? window.location.hostname
    : 'http://localhost:5000';

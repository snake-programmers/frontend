export const SENTRY_DSN =
  'https://ad586d6a036c42169a1229bf719d5fa8@o568807.ingest.sentry.io/6083709';
export const SENTRY_TRACES = 0.2;
export const SENTRY_TRACING_ORIGINS: (string | RegExp)[] = [
  new RegExp('.*\\.alesharik\\.com'),
];
export const API_URL = 'https://tulahack.alesharik.com';
export const MAX_HTTP_RETRIES = 3;

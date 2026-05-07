export const APP_VERSION = '1.0.0';

export function withVersion(url: string): string {
  return url.includes('?') ? `${url}&v=${APP_VERSION}` : `${url}?v=${APP_VERSION}`;
}

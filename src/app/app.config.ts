import { InjectionToken } from '@angular/core';
import * as data from '../assets/app.settings.json';
import { DEFAULT_ROUTE } from './shared/global-utils/constants';
const appSettings = data;
export const projectVersion = appSettings.version;
export const projectVersionShort = appSettings.version.substring(0, 3);
export interface App_Config {
  keysToSave: string[];
  defaultRoute: string;
  baseUrl: string;
  photoUrl: string;
  linksToCache: string[];
}

type environement = 'PRD' | 'PPR' | 'TST' | 'DEV';

const CURRENT_ENV: environement = appSettings.environment as environement;

const URL_API_DEV = 'https://my-json-server.typicode.com/typicode/demo/posts';
const URL_API_TEST = 'https://my-json-server.typicode.com/typicode/demo/comments';
const URL_API_PPR = 'https://my-json-server.typicode.com/typicode/demo/profile';
const URL_API_PROD = 'https://my-json-server.typicode.com/typicode/demo/db';

const photoUrl = 'https://randomuser.me/api/portraits/';

export function getBaseUrl(): string {
  switch (CURRENT_ENV) {
    case 'DEV':
      return URL_API_DEV;
    case 'TST':
      return URL_API_TEST;
    case 'PPR':
      return URL_API_PPR;
    case 'PRD':
      return URL_API_PROD;
  }
}

function getConfig(): App_Config {
  return {
    keysToSave: ['survicate', 'analytics', 'theme'],
    defaultRoute: `/home/${DEFAULT_ROUTE}`,
    baseUrl: getBaseUrl(),
    photoUrl,
    linksToCache: ['GetPhotoById', 'GetPhotoByUpn']
  };
}

export const APP_CONFIG = new InjectionToken<App_Config>('API_ENDPOINT_GLOBAL_CONFIG', {
  providedIn: 'root',
  factory: getConfig
});

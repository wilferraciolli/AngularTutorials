import { InjectionToken } from '@angular/core';

export interface UserConfig {
  language: string;
}

export const defaultUserConfig: UserConfig = {
  language: 'en'
}

export const USER_CONFIG_TOKEN = new InjectionToken<UserConfig>('userconfig', {
  providedIn: 'root',
  factory: () => defaultUserConfig
});

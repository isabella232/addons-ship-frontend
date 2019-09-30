import getConfig from 'next/config';

import { APIConfig, AppConfig } from '@/models/services';

const {
  publicRuntimeConfig: { SHIP_API_URL, APP_BASE_URL, SEGMENT_WRITE_KEY }
} = getConfig();

export const shipApiConfig: APIConfig & AppConfig = {
  url: SHIP_API_URL || 'http://localhost:3003',
  baseUrl: APP_BASE_URL || 'http://localhost:3000'
};

export const analyticsConfig = {
  segmentWriteKey: SEGMENT_WRITE_KEY
};

const placeholderIconBaseUrl = 'https://bitrise-public-content-production.s3.amazonaws.com/addons/default-app-icon';
export const placeholderIcons = {
  ios: `${placeholderIconBaseUrl}-ios.png`,
  android: `${placeholderIconBaseUrl}-android.png`,
  cordova: `${placeholderIconBaseUrl}-cordova.png`,
  fastlane: `${placeholderIconBaseUrl}-fastlane.png`,
  flutter: `${placeholderIconBaseUrl}-flutter.png`,
  go: `${placeholderIconBaseUrl}-go.png`,
  ionic: `${placeholderIconBaseUrl}-ionic.png`,
  macos: `${placeholderIconBaseUrl}-macos.png`,
  nodejs: `${placeholderIconBaseUrl}-nodejs.png`,
  react: `${placeholderIconBaseUrl}-react.png`,
  xamarin: `${placeholderIconBaseUrl}-xamarin.png`,
  other: 'https://bitrise-public-content-production.s3.amazonaws.com/addons-ship/default-app-icon-other.png'
};

export const emailMaxLength = 254;

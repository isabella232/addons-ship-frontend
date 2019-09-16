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

export const placeholderAppIcon =
  'https://bitrise-addons-ship-backend.s3-us-west-2.amazonaws.com/assets/icons/placeholder-512.jpg';

export const emailMaxLength = 254;

import getConfig from 'next/config';

import { APIConfig } from '@/models/services';

const {
  publicRuntimeConfig: { SHIP_API_URL }
} = getConfig();

export const shipApiConfig: APIConfig = {
  url: SHIP_API_URL || 'http://localhost:3003'
};

import { createAction } from 'deox';

import { Platform } from '@/models';

import { $ } from './common';

export const selectPlatform = createAction($`SELECT_PLATFORM`, resolve => (platform: Platform) => resolve(platform));

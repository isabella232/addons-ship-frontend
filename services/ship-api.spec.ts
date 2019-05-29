jest.mock('node-fetch');

import fetch from 'node-fetch';
import api from './ship-api';
import { mockAppVersion } from '@/mocks';

describe('Ship API service', () => {
  it('fetches test devices for an app', async () => {
    const appSlug = 'an-app-slug';
    const versionId = 'a-version-id';
    let appVersion = await api.getAppVersion(appSlug, versionId);

    // expect(fetch).toHaveBeenCalledWith(`/apps/${appSlug}/versions/${versionId}`);

    expect(appVersion).toEqual(mockAppVersion);
  });
});

jest.mock('node-fetch');

import fetch from 'node-fetch';
import api from './ship-api';

describe('Ship API service', () => {
  it('fetches a version for an app', async () => {
    const appSlug = 'an-app-slug';
    const versionId = 'a-version-id';
    const appVersion = await api.getAppVersion(appSlug, versionId);

    // expect(fetch).toHaveBeenCalledWith(`/apps/${appSlug}/versions/${versionId}`);

    expect(appVersion).toMatchSnapshot();
  });

  it('fetches a list of version for an app', async () => {
    const appSlug = 'an-app-slug';
    const appVersions = await api.getAppVersionList(appSlug);

    // expect(fetch).toHaveBeenCalledWith(`/apps/${appSlug}/versions/${versionId}`);

    expect(appVersions).toMatchSnapshot();
  });
});

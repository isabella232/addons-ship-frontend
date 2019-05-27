jest.mock('node-fetch');

import fetch from 'node-fetch';
import api from './bitrise-api';

describe('Bitrise API service', () => {
  it('fetches test devices for an app', async () => {
    const appSlug = 'an-app-slug';
    const testDevices = await api.getTestDevices(appSlug);

    // expect(fetch).toHaveBeenCalledWith(`/v0.1/apps/${appSlug}/test-devices`);

    expect(testDevices).toMatchSnapshot();
  });
});

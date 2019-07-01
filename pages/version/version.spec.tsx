jest.mock('@/ducks/appVersion');
jest.mock('@/ducks/settings');
jest.mock('@/ducks/testDevices');

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { fetchAppVersion } from '@/ducks/appVersion';
import { fetchSettings } from '@/ducks/settings';
import { fetchTestDevices } from '@/ducks/testDevices';
import { VersionPage } from './';

describe('AppVersion', () => {
  it('renders the details tab correctly', () => {
    const tree = toJSON(
      shallow(
        <VersionPage appVersion={mockAppVersion} appSlug="some-app" versionId="a-version-id" pagePath="some/path" />
      )
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders the devices tab correctly', () => {
    const tree = toJSON(
      shallow(
        <VersionPage
          appVersion={mockAppVersion}
          appSlug="some-app"
          versionId="a-version-id"
          pagePath="some/path"
          selectedTab="devices"
        />
      )
    );
    expect(tree).toMatchSnapshot();
  });

  describe('dispatches the proper actions', () => {
    const req = { path: 'some/path' };

    it('dispatches fetchAppVersion and fetchSettings', async () => {
      await VersionPage.getInitialProps({ query: {}, req, store: { dispatch: jest.fn() } } as any);

      expect(fetchAppVersion).toHaveBeenCalled();
      expect(fetchSettings).toHaveBeenCalled();
    });

    it('dispatches fetchTestDevices', async () => {
      await VersionPage.getInitialProps({
        query: { selectedTab: 'devices' },
        req,
        store: { dispatch: jest.fn() }
      } as any);

      expect(fetchTestDevices).toHaveBeenCalled();
    });
  });
});

jest.mock('nookies', () => ({
  get: () => ({}),
  set: () => ({})
}));
jest.mock('@/ducks/appVersion');
jest.mock('@/ducks/settings');
jest.mock('@/ducks/testDevices');
jest.mock('@/ducks/appVersion/fetchAppVersionEvents');

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { fetchAppVersion } from '@/ducks/appVersion';
import { fetchSettings } from '@/ducks/settings';
import { fetchTestDevices } from '@/ducks/testDevices';
import { VersionPage } from '.';
import fetchAppVersionEvents from '@/ducks/appVersion/fetchAppVersionEvents';

describe('AppVersion', () => {
  const defaultProps = {
    appVersion: mockAppVersion,
    appSlug: 'some-app',
    versionId: 'a-version-id',
    pagePath: 'some/path',
    activityLastSeen: 0,
    lastEventTimestamp: 0
  };
  it('renders the details tab correctly', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the devices tab correctly', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} selectedTab="devices" />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the qa tab correctly', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} selectedTab="qa" />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the activity tab correctly', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} selectedTab="activity" />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the other tabs correctly', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} selectedTab="whateever" />));
    expect(tree).toMatchSnapshot();
  });

  describe('dispatches the proper actions', () => {
    const req = { path: 'some/path' };

    it('dispatches fetchAppVersion and fetchSettings', async () => {
      const props = await VersionPage.getInitialProps({
        query: {},
        req,
        store: { dispatch: jest.fn() },
        isServer: true
      } as any);

      expect(fetchAppVersion).toHaveBeenCalled();
      expect(fetchSettings).toHaveBeenCalled();
      expect(props).toMatchSnapshot();
    });

    it('dispatches fetchTestDevices', async () => {
      const props = await VersionPage.getInitialProps({
        query: { selectedTab: 'devices' },
        req,
        store: { dispatch: jest.fn() },
        isServer: true
      } as any);

      expect(fetchTestDevices).toHaveBeenCalled();
      expect(props).toMatchSnapshot();
    });

    it('dispatches fetchAppVersionEvents', async () => {
      const props = await VersionPage.getInitialProps({
        query: { selectedTab: 'activity' },
        req,
        store: { dispatch: jest.fn() },
        isServer: true
      } as any);

      expect(fetchAppVersionEvents).toHaveBeenCalled();
      expect(props).toMatchSnapshot();
    });

    it('calculates path correctly on the client too', async () => {
      window.history.pushState({}, '', '/such/path');

      const props = await VersionPage.getInitialProps({
        query: {},
        store: { dispatch: jest.fn() },
        isServer: false
      } as any);

      expect(props).toMatchSnapshot();
    });
  });

  it('displays a new activity marker badge', () => {
    const tree = toJSON(shallow(<VersionPage {...defaultProps} lastEventTimestamp={1} />));
    expect(tree).toMatchSnapshot();
  });
});

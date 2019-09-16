jest.mock('nookies', () => ({
  get: () => ({}),
  set: () => ({})
}));

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { VersionPage, VersionPageProps } from '.';

describe('AppVersion', () => {
  const defaultProps: VersionPageProps = {
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

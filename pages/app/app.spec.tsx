jest.mock('@/ducks/appVersionList');

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersions } from '@/mocks';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import { AppPage, AppPageProps } from './';
import { getAppVersionsByVersion, getAppVersionsByBuildNumber } from '@/ducks/selectors';

describe('AppPage', () => {
  let appVersionsByVersion: AppPageProps['appVersionsByVersion'];
  let appVersionsByBuildNumber: AppPageProps['appVersionsByBuildNumber'];

  beforeAll(() => {
    appVersionsByVersion = getAppVersionsByVersion({
      appVersionList: mockAppVersions,
      appVersion: null,
      testDevices: []
    }) as AppPageProps['appVersionsByVersion'];

    appVersionsByBuildNumber = getAppVersionsByBuildNumber({
      appVersionList: mockAppVersions,
      appVersion: null,
      testDevices: []
    }) as AppPageProps['appVersionsByBuildNumber'];
  });

  it('renders the list of app versions correctly', () => {
    const tree = toJSON(
      shallow(
        <AppPage
          appSlug="app-slug-123"
          appVersionsByVersion={appVersionsByVersion}
          appVersionsByBuildNumber={appVersionsByBuildNumber}
        />
      )
    );
    expect(tree).toMatchSnapshot();
  });

  describe('dispatches the proper actions', () => {
    const req = { path: 'some/path' };

    it('dispatches fetchAppVersionList', async () => {
      await AppPage.getInitialProps({ query: {}, req, store: { dispatch: jest.fn() } } as any);

      expect(fetchAppVersionList).toHaveBeenCalled();
    });
  });

  describe('when user selects sort by versions', () => {
    let appPageComponent: any;

    beforeEach(() => {
      appPageComponent = shallow(
        <AppPage
          appSlug="app-slug-123"
          appVersionsByVersion={appVersionsByVersion}
          appVersionsByBuildNumber={appVersionsByBuildNumber}
        />
      );

      appPageComponent.setState({ selectedVersionSortingOptionValue: 'latest-version' });
    });

    it('renders the list of app version grouped by version', () => {
      const tree = toJSON(appPageComponent);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when user selects sort by build numbers', () => {
    let appPageComponent: any;

    beforeEach(() => {
      appPageComponent = shallow(
        <AppPage
          appSlug="app-slug-123"
          appVersionsByVersion={appVersionsByVersion}
          appVersionsByBuildNumber={appVersionsByBuildNumber}
        />
      );

      appPageComponent.setState({ selectedVersionSortingOptionValue: 'latest-build' });
    });

    it('renders the list of app version grouped by build number', () => {
      const tree = toJSON(appPageComponent);
      expect(tree).toMatchSnapshot();
    });
  });
});

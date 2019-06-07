jest.mock('@/utils/media');
jest.mock('@/ducks/appVersionList');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersions, mockAppVersion } from '@/mocks';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import { AppPage, AppPageProps } from './';
import AppView from './view';
import { getAppVersionsByVersion, getAppVersionsByBuildNumber } from '@/ducks/selectors';
import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

describe('AppPageView', () => {
  (mediaQuery as jest.Mock).mockReturnValue([true]);

  describe('when page is empty', () => {
    let appViewComponent: any;

    beforeAll(() => {
      appViewComponent = mount(
        <AppView
          emptyPage={true}
          latestAppVersion={null}
          versionSortingOptions={[
            {
              text: 'Option 1',
              value: 'option-1'
            },
            {
              text: 'Option 2',
              value: 'option-2'
            }
          ]}
          versionSortOptionWithValueSelected={() => {}}
          selectedVersionSortingOption={{
            text: 'Option 1',
            value: 'option-1'
          }}
          groupedAppVersionList={[]}
        />
      );
    });

    it('renders empty page', () => {
      const tree = toJSON(appViewComponent);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when page has apps', () => {
    let appViewComponent: any;

    beforeAll(() => {
      appViewComponent = mount(
        <AppView
          emptyPage={false}
          latestAppVersion={
            {
              id: mockAppVersion.id,
              appName: mockAppVersion.appName,
              version: mockAppVersion.version,
              buildNumber: mockAppVersion.buildNumber,
              description: mockAppVersion.description,
              lastUpdate: mockAppVersion.lastUpdate,
              iconUrl: mockAppVersion.iconUrl
            } as AppVersion
          }
          versionSortingOptions={[
            {
              text: 'Option 1',
              value: 'option-1'
            },
            {
              text: 'Option 2',
              value: 'option-2'
            }
          ]}
          versionSortOptionWithValueSelected={() => {}}
          selectedVersionSortingOption={{
            text: 'Option 1',
            value: 'option-1'
          }}
          groupedAppVersionList={[
            {
              groupName: 'group 1',
              appVersions: mockAppVersions
            }
          ]}
        />
      );
    });

    it('renders page with apps', () => {
      const tree = toJSON(appViewComponent);
      expect(tree).toMatchSnapshot();
    });
  });
});

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

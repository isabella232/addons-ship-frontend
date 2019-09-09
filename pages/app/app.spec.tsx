jest.mock('@/utils/media');

import { shallow, mount, ReactWrapper } from 'enzyme';
import toJSON, { shallowToJson, mountToJson } from 'enzyme-to-json';

import { mockAppVersions, mockAppVersion, mockApp } from '@/mocks';
import { AppPage, AppPageProps } from './';
import AppView from './view';
import { getAppVersionsByVersion, getAppVersionsByBuildNumber } from '@/ducks/selectors';
import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

describe('AppPageView', () => {
  (mediaQuery as jest.Mock).mockReturnValue([true]);

  describe('when page has apps', () => {
    let appViewComponent: ReactWrapper;

    beforeAll(() => {
      appViewComponent = mount(
        <AppView
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
          isCrossPlatform={false}
          onSelectPlatform={jest.fn()}
          productFlavours={[]}
          selectProductFalvour={jest.fn()}
        />
      );
    });

    it('renders page with apps', () => {
      const tree = toJSON(appViewComponent);
      expect(tree).toMatchSnapshot();
    });

    it('renders the product flavour tags', () => {
      appViewComponent.setProps({ productFlavours: ['first', 'second'] });

      const tree = mountToJson(appViewComponent);
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('AppPage', () => {
  const defaultProps = {
    app: mockApp,
    fetchAppVersionList: jest.fn() as any,
    appSlug: 'app-slug-123',
    isLoading: false,
    appVersionsByVersion: null as any,
    appVersionsByBuildNumber: null as any,
    isCrossPlatform: false,
    selectPlatform: jest.fn() as any,
    productFlavours: []
  };

  let appVersionsByVersion: AppPageProps['appVersionsByVersion'];
  let appVersionsByBuildNumber: AppPageProps['appVersionsByBuildNumber'];

  beforeAll(() => {
    appVersionsByVersion = getAppVersionsByVersion({
      appVersionList: mockAppVersions,
      testDevices: []
    } as any) as AppPageProps['appVersionsByVersion'];

    appVersionsByBuildNumber = getAppVersionsByBuildNumber({
      appVersionList: mockAppVersions,
      testDevices: []
    } as any) as AppPageProps['appVersionsByBuildNumber'];

    defaultProps.appVersionsByVersion = appVersionsByVersion;
    defaultProps.appVersionsByBuildNumber = appVersionsByBuildNumber;
  });

  it('renders the list of app versions correctly', () => {
    const tree = toJSON(shallow(<AppPage {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders empty page', () => {
    const tree = shallowToJson(
      shallow(<AppPage {...defaultProps} appVersionsByVersion={[]} appVersionsByBuildNumber={[]} />)
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading placeholder', () => {
    const tree = shallowToJson(shallow(<AppPage {...defaultProps} isLoading />));
    expect(tree).toMatchSnapshot();
  });

  it('sets state when versionSortOptionWithValueSelected was called', () => {
    const wrapper = shallow(<AppPage {...defaultProps} />);

    const sortingOption = 'whatever';
    (wrapper.instance() as AppPage).versionSortOptionWithValueSelected(sortingOption);
    expect(wrapper.state('selectedVersionSortingOptionValue')).toEqual(sortingOption);
  });

  describe('dispatches the proper actions', () => {
    it('dispatches fetchAppVersionList', async () => {
      const { fetchAppVersionList } = defaultProps;

      shallow(<AppPage {...defaultProps} />);

      expect(fetchAppVersionList).toHaveBeenCalled();
    });
  });

  describe('when user selects sort by versions', () => {
    it('renders the list of app version grouped by version', () => {
      const wrapper = shallow(<AppPage {...defaultProps} />);

      wrapper.setState({ selectedVersionSortingOptionValue: 'latest-version' });

      const tree = shallowToJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when user selects sort by build numbers', () => {
    it('renders the list of app version grouped by build number', () => {
      const wrapper = shallow(<AppPage {...defaultProps} />);

      wrapper.setState({ selectedVersionSortingOptionValue: 'latest-build' });

      const tree = shallowToJson(wrapper);
      expect(tree).toMatchSnapshot();
    });
  });

  test('selectProductFlavour', () => {
    const wrapper = shallow(<AppPage {...defaultProps} />);

    const flavour = 'whatever';
    (wrapper.instance() as AppPage).selectProductFlavour(flavour);
    expect(wrapper.state('selectedProductFlavour')).toEqual(flavour);
  });
});

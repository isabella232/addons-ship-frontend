import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { AppPageQuery, PageContext, AppVersion, Platform } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import { selectPlatform } from '@/ducks/app';
import {
  getAppVersionsByVersion,
  getAppVersionsByBuildNumber,
  isCrossPlatform,
  getPlatformAppVersionsByVersion,
  getPlatformAppVersionsByBuildNumber,
  getVersionFlavors
} from '@/ducks/selectors';
import EmptyPage from '@/components/EmptyPage';
import ShipHead from '@/components/ShipHead';
import { App } from '@/models/app';

import View from './view';
import Placeholder from './view/placeholder-list';

export interface AppPageProps extends AppPageQuery {
  app: App | null;
  appVersionsByVersion: Array<{
    groupName: string;
    appVersions: AppVersion[];
  }>;
  appVersionsByBuildNumber: Array<{
    groupName: string;
    appVersions: AppVersion[];
  }>;
  fetchAppVersionList: typeof fetchAppVersionList;
  isLoading?: boolean;
  isCrossPlatform: boolean;
  selectedPlatform?: Platform;
  selectPlatform: typeof selectPlatform;
  productFlavors: string[];
}

type AppPageState = {
  selectedVersionSortingOptionValue: 'latest-build' | 'latest-version';
  selectedProductFlavor?: string;
};

export class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {
    selectedVersionSortingOptionValue: 'latest-build'
  };

  versionSortingOptions = [
    {
      text: 'Latest Build',
      value: 'latest-build'
    },
    {
      text: 'Latest Version',
      value: 'latest-version'
    }
  ];

  static getInitialProps = ({ query: { appSlug } }: PageContext) => ({ appSlug });

  componentDidMount() {
    const { appSlug, fetchAppVersionList } = this.props;

    fetchAppVersionList(appSlug);
  }

  versionSortOptionWithValueSelected = (value: AppPageState['selectedVersionSortingOptionValue']) => {
    this.setState({
      selectedVersionSortingOptionValue: value
    });
  };

  selectProductFlavor = (flavor: string) => {
    this.setState({ selectedProductFlavor: flavor });
  };

  render() {
    const {
      app,
      isLoading,
      appVersionsByVersion,
      appVersionsByBuildNumber,
      selectedPlatform,
      isCrossPlatform,
      selectPlatform,
      productFlavors
    } = this.props;
    const { selectedVersionSortingOptionValue } = this.state;

    let groupedAppVersionList =
      selectedVersionSortingOptionValue === 'latest-version' ? appVersionsByVersion : appVersionsByBuildNumber;

    let content;
    if (isLoading) {
      content = <Placeholder />;
    } else if (!groupedAppVersionList || groupedAppVersionList.length === 0) {
      content = <EmptyPage />;
    } else {
      let {
        appVersions: [latestAppVersion]
      } = groupedAppVersionList[0];

      let startColor, endColor;
      if (app && app.colors) {
        ({ start: startColor, end: endColor } = app.colors);
      }

      const showProductFlavors = latestAppVersion.platform === 'android';
      let selectedProductFlavor: string | undefined;

      if (showProductFlavors) {
        selectedProductFlavor = this.state.selectedProductFlavor;
        if (!selectedProductFlavor && productFlavors.length > 0) {
          selectedProductFlavor = productFlavors[0];
        }
      }

      if (selectedProductFlavor) {
        groupedAppVersionList = groupedAppVersionList
          .map(({ appVersions, groupName }) => ({
            groupName,
            appVersions: appVersions.filter(({ productFlavor }) => productFlavor === selectedProductFlavor)
          }))
          .filter(({ appVersions }) => appVersions.length);

        ({
          appVersions: [latestAppVersion]
        } = groupedAppVersionList[0]);
      }

      let warnings: string[] = [];

      if (app) {
        warnings = latestAppVersion.platform === 'ios' ? app.iosErrors : app.androidErrors;
      }

      const viewProps = {
        iconUrl: app!.avatarUrl,
        isCrossPlatform,
        latestAppVersion,
        versionSortingOptions: this.versionSortingOptions,
        versionSortOptionWithValueSelected: this.versionSortOptionWithValueSelected,
        selectedVersionSortingOption: find(this.versionSortingOptions, {
          value: selectedVersionSortingOptionValue as string
        }),
        groupedAppVersionList,
        selectedPlatform,
        onSelectPlatform: selectPlatform,
        startColor,
        endColor,
        productFlavors: showProductFlavors ? productFlavors : [],
        selectedProductFlavor,
        selectProductFalvour: this.selectProductFlavor,
        warnings
      };
      content = <View {...viewProps} />;
    }

    return (
      <Fragment>
        <ShipHead>Versions</ShipHead>
        {content}
      </Fragment>
    );
  }
}

const mapStateToProps = (rootState: RootState) => {
  const _isCrossPlatform = isCrossPlatform(rootState);

  return {
    app: rootState.app.app,
    isLoading: !rootState.appVersionList,
    appVersionsByVersion: _isCrossPlatform
      ? getPlatformAppVersionsByVersion(rootState, rootState.app.selectedPlatform!)
      : getAppVersionsByVersion(rootState),
    appVersionsByBuildNumber: _isCrossPlatform
      ? getPlatformAppVersionsByBuildNumber(rootState, rootState.app.selectedPlatform!)
      : getAppVersionsByBuildNumber(rootState),
    isCrossPlatform: _isCrossPlatform,
    selectedPlatform: rootState.app.selectedPlatform,
    productFlavors: getVersionFlavors(rootState)
  };
};

const mapDispatchToProps = {
  fetchAppVersionList,
  selectPlatform
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage as any);
Connected.displayName = 'AppPage';

export default Connected;

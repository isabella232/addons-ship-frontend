import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { AppPageQuery, PageContext, AppVersion, Platform } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import { getAppVersionsByVersion, getAppVersionsByBuildNumber, isCrossPlatform } from '@/ducks/selectors';
import EmptyPage from '@/components/EmptyPage';
import ShipHead from '@/components/ShipHead';

import View from './view';
import Placeholder from './view/placeholder-list';

export interface AppPageProps extends AppPageQuery {
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
}

type AppPageState = {
  selectedVersionSortingOptionValue: string | null;
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
      text: 'Latest version',
      value: 'latest-version'
    }
  ];

  static getInitialProps = ({ query: { appSlug } }: PageContext) => ({ appSlug });

  componentDidMount() {
    const { appSlug, fetchAppVersionList } = this.props;

    fetchAppVersionList(appSlug);
  }

  versionSortOptionWithValueSelected = (value: string) => {
    this.setState({
      selectedVersionSortingOptionValue: value
    });
  };

  render() {
    const { isLoading, appVersionsByVersion, appVersionsByBuildNumber, selectedPlatform, isCrossPlatform } = this.props;
    const { selectedVersionSortingOptionValue } = this.state;

    const groupedAppVersionList =
      selectedVersionSortingOptionValue && selectedVersionSortingOptionValue === 'latest-version'
        ? appVersionsByVersion
        : appVersionsByBuildNumber;

    let content;
    if (isLoading) {
      content = <Placeholder />;
    } else if (!groupedAppVersionList || groupedAppVersionList.length === 0) {
      content = <EmptyPage />;
    } else {
      let {
        appVersions: [latestAppVersion]
      } = groupedAppVersionList[0];

      const viewProps = {
        isCrossPlatform,
        latestAppVersion,
        versionSortingOptions: this.versionSortingOptions,
        versionSortOptionWithValueSelected: this.versionSortOptionWithValueSelected,
        selectedVersionSortingOption: find(this.versionSortingOptions, {
          value: selectedVersionSortingOptionValue as string
        }),
        groupedAppVersionList,
        selectedPlatform
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

const mapStateToProps = (rootState: RootState) => ({
  isLoading: !rootState.appVersionList,
  appVersionsByVersion: getAppVersionsByVersion(rootState),
  appVersionsByBuildNumber: getAppVersionsByBuildNumber(rootState),
  isCrossPlatform: isCrossPlatform(rootState),
  selectedPlatform: rootState.app.selectedPlatform
});

const mapDispatchToProps = {
  fetchAppVersionList
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppPage as any);
Connected.displayName = 'AppPage';

export default Connected;

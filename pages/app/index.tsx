import { Component } from 'react';
import { connect } from 'react-redux';

import { AppPageQuery, PageContext, AppVersionList } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import { getAppVersionsByVersion, getAppVersionsByBuildNumber } from '@/ducks/selectors';

import View from './view';

interface AppPageProps extends AppPageQuery {
  appVersionsByVersion: {
    groupName: string;
    appVersions: AppVersionList;
  }[];
  appVersionsByBuildNumber: {
    groupName: string;
    appVersions: AppVersionList;
  }[];
  groupedAppVersionList: {
    groupName: string;
    appVersions: AppVersionList;
  }[];
}

type AppPageState = {
  selectedVersionSortingOptionValue: string | null;
};

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {
    selectedVersionSortingOptionValue: null
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

  componentDidMount() {
    this.setState({
      selectedVersionSortingOptionValue: 'latest-build'
    });
  }

  static async getInitialProps({ query: { appSlug }, store }: PageContext) {
    await store.dispatch(fetchAppVersionList(appSlug as string) as any);

    return { appSlug };
  }

  versionSortOptionWithValueSelected = (value: string) => {
    this.setState({
      selectedVersionSortingOptionValue: value
    });
  };

  render() {
    const groupedAppVersionList =
      this.state.selectedVersionSortingOptionValue && this.state.selectedVersionSortingOptionValue === 'latest-version'
        ? this.props.appVersionsByVersion
        : this.props.appVersionsByBuildNumber;
    const latestAppVersion = groupedAppVersionList[0].appVersions[0];
    const emptyPage = false;

    const viewProps = {
      emptyPage,
      latestAppVersion,
      versionSortingOptions: this.versionSortingOptions,
      versionSortOptionWithValueSelected: this.versionSortOptionWithValueSelected,
      selectedVersionSortingOption: this.versionSortingOptions.find(
        (versionSortingOption: any) => versionSortingOption.value === this.state.selectedVersionSortingOptionValue
      ),
      groupedAppVersionList
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = (rootState: RootState) => ({
  appVersionsByVersion: getAppVersionsByVersion(rootState),
  appVersionsByBuildNumber: getAppVersionsByBuildNumber(rootState)
});

export default connect(mapStateToProps)(AppPage as any);

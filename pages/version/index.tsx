import { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Base, Tabs, Tab, Divider } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { AppVersionPageQuery, PageContext, AppVersion, AppVersionPageTabs } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersion } from '@/ducks/appVersion';

import Details from './details';
import Devices from './devices';
import { fetchTestDevices } from '@/ducks/testDevices';

interface VersionPageProps extends AppVersionPageQuery {
  appVersion: AppVersion;
  pagePath: string;
}

type VersionPageState = {
  showTooltips: boolean;
};

export class VersionPage extends Component<VersionPageProps, VersionPageState> {
  static defaultProps = {
    selectedTab: 'details'
  };

  state: VersionPageState = {
    showTooltips: false
  };

  static async getInitialProps({ query, store, req }: PageContext) {
    const {
      appSlug,
      versionId,
      isPublic,
      selectedTab = AppVersionPageTabs[0]
    } = (query as unknown) as AppVersionPageQuery;

    switch (selectedTab) {
      case 'details':
        await store.dispatch(fetchAppVersion(appSlug, versionId) as any);
        break;
      case 'devices':
        await store.dispatch(fetchTestDevices(appSlug) as any);
        break;
    }

    const pagePath = req.path.replace(new RegExp(`/${selectedTab}$`), '');

    return { appSlug, versionId, isPublic, selectedTab, pagePath };
  }

  tabContent = () => {
    const { selectedTab } = this.props;

    switch (selectedTab) {
      case 'details':
        return <Details />;
      case 'devices':
        return <Devices />;
      default:
        return <h1>{selectedTab}</h1>;
    }
  };

  render() {
    const { pagePath, selectedTab } = this.props;

    const tab = (key: string) => (
      <Tab active={selectedTab === key}>
        <Link href={`${pagePath}/${key}`}>
          <a>{startCase(key)}</a>
        </Link>
      </Tab>
    );

    return (
      <Base paddingVertical="x10">
        <Base maxWidth={960}>
          <Tabs gap="x10">
            {tab('details')}
            {tab('devices')}
            {tab('test')}
            {tab('activity')}
          </Tabs>
        </Base>
        <Divider color="gray-2" direction="horizontal" />
        <Base maxWidth={960}>{this.tabContent()}</Base>
      </Base>
    );
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });
export default connect(mapStateToProps)(VersionPage as any);

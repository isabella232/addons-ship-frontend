import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Base, Tabs, Tab, Divider, Flex, AddonFooter } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { AppVersionPageQuery, PageContext, AppVersion, AppVersionPageTabs } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersion } from '@/ducks/appVersion';
import { fetchTestDevices } from '@/ducks/testDevices';
import { fetchSettings } from '@/ducks/settings';
import fetchAppVersionEvents from '@/ducks/appVersion/fetchAppVersionEvents';

import Details from './details';
import Devices from './devices';
import Activity from './activity';
import QA from './qa';

import css from './style.scss';

interface VersionPageProps extends AppVersionPageQuery {
  appVersion: AppVersion;
  pagePath: string;
}

export class VersionPage extends Component<VersionPageProps> {
  static defaultProps = {
    selectedTab: 'details'
  };

  static async getInitialProps({ query, store, req, isServer }: PageContext) {
    const {
      appSlug,
      versionId,
      isPublic,
      selectedTab = AppVersionPageTabs[0]
    } = (query as unknown) as AppVersionPageQuery;

    const path = isServer ? req.path : location.pathname;
    const pagePath = path.replace(new RegExp(`/(${AppVersionPageTabs.join('|')})?$`), '');

    const promises = [store.dispatch(fetchAppVersion(appSlug, versionId) as any)];

    switch (selectedTab) {
      case 'details':
        Connected.displayName = 'AppVersionDetails';
        promises.push(store.dispatch(fetchSettings(appSlug) as any));
        break;
      case 'devices':
        Connected.displayName = 'AppVersionDevices';
        promises.push(store.dispatch(fetchTestDevices(appSlug) as any));
        break;
      case 'activity':
        Connected.displayName = 'AppVersionActivity';
        promises.push(store.dispatch(fetchAppVersionEvents(appSlug, versionId) as any));
        break;
      case 'qa':
        Connected.displayName = 'AppVersionQA';
        break;
    }

    await Promise.all(promises);

    return { appSlug, versionId, isPublic, selectedTab, pagePath };
  }

  tabContent = () => {
    const { selectedTab } = this.props;

    switch (selectedTab) {
      case 'details':
        return <Details />;
      case 'devices':
        return <Devices />;
      case 'activity':
        return <Activity />;
      case 'qa':
        return <QA />;
      default:
        return <h1>{selectedTab}</h1>;
    }
  };

  render() {
    const {
      pagePath,
      selectedTab,
      appVersion: { appSlug, id }
    } = this.props;

    const tab = (key: string) => (
      <Tab active={selectedTab === key}>
        <Link as={`${pagePath}/${key}`} href={`/version?appSlug=${appSlug}&versionId=${id}&selectedTab=${key}`}>
          <a>{startCase(key)}</a>
        </Link>
      </Tab>
    );

    return (
      <Fragment>
        <Base>
          <Base maxWidth={960}>
            <Tabs gap="x10">
              {tab('details')}
              {tab('devices')}
              {tab('qa')}
              {tab('activity')}
            </Tabs>
          </Base>
          <Divider color="gray-2" direction="horizontal" />
          <Base maxWidth={960}>{this.tabContent()}</Base>
        </Base>
        <Flex className={css.footerWrapper}>
          <AddonFooter addonName="Ship" />
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ appVersion: { appVersion } }: RootState) => ({
  appVersion
});

const Connected = connect(mapStateToProps)(VersionPage as any);
Connected.displayName = 'AppVersionPage';

export default Connected;

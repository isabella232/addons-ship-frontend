import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Base, Tabs, Tab, Divider, Flex, AddonFooter, Dot } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';
import nookies from 'nookies';

import { AppVersionPageQuery, PageContext, AppVersion, AppVersionPageTabs } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersion } from '@/ducks/appVersion';
import fetchAppVersionEvents from '@/ducks/appVersion/fetchAppVersionEvents';
import { orderedAppVersionEvents } from '@/ducks/selectors';

import Details from './details';
import Devices from './devices';
import Activity from './activity';
import QA from './qa';

import css from './style.scss';
import ShipHead from '@/components/ShipHead';

export interface VersionPageProps extends AppVersionPageQuery {
  appVersion: AppVersion | null;
  pagePath: string;
  activityLastSeen: number;
  lastEventTimestamp: number;
  fetchAppVersion: typeof fetchAppVersion;
}

export class VersionPage extends Component<VersionPageProps> {
  static defaultProps = {
    selectedTab: 'details'
  };

  static async getInitialProps(ctx: PageContext) {
    const { query, store, req, isServer } = ctx;
    const {
      appSlug,
      versionId,
      isPublic,
      selectedTab = AppVersionPageTabs[0]
    } = (query as unknown) as AppVersionPageQuery;
    const path = isServer ? req.path : location.pathname;
    const pagePath = path.replace(new RegExp(`/(${AppVersionPageTabs.join('|')})?$`), '');

    const promises = [];

    const activityLastSeenKey = `activity_${appSlug}_${versionId}`;
    const cookies = nookies.get(ctx);
    const activityLastSeen = parseInt(cookies[activityLastSeenKey], 10) || 0;

    switch (selectedTab) {
      case 'details':
        Connected.displayName = 'AppVersionDetails';
        break;
      case 'devices':
        Connected.displayName = 'AppVersionDevices';
        break;
      case 'activity':
        nookies.set(ctx, activityLastSeenKey, Date.now().toString(), {
          path: '/'
        });

        Connected.displayName = 'AppVersionActivity';
        promises.push(store.dispatch(fetchAppVersionEvents(appSlug, versionId) as any));
        break;
      case 'qa':
        Connected.displayName = 'AppVersionQA';
        break;
    }

    await Promise.all(promises);

    return { appSlug, versionId, isPublic, selectedTab, pagePath, activityLastSeen };
  }

  componentDidMount() {
    const { appSlug, versionId, fetchAppVersion } = this.props;
    fetchAppVersion(appSlug, versionId);
  }

  tabContent = () => {
    const { selectedTab, appSlug, versionId } = this.props;

    switch (selectedTab) {
      case 'details':
        return <Details appSlug={appSlug} versionId={versionId} />;
      case 'devices':
        return <Devices />;
      case 'activity':
        return <Activity versionId={versionId} />;
      case 'qa':
        return <QA />;
      default:
        return <h1>{selectedTab}</h1>;
    }
  };

  render() {
    const { pagePath, selectedTab, appSlug, versionId, activityLastSeen, lastEventTimestamp } = this.props;

    const showActivityBadge = selectedTab === 'activity' ? false : activityLastSeen < lastEventTimestamp;

    const tab = (key: string) => (
      <Link as={`${pagePath}/${key}`} href={`/version?appSlug=${appSlug}&versionId=${versionId}&selectedTab=${key}`}>
        <a>
          <Tab active={selectedTab === key} paddingHorizontal="x2">
            <Flex direction="horizontal" alignChildren="middle" gap="x1">
              {showActivityBadge && key === 'activity' && <Dot size=".5rem" backgroundColor="red-3" />}
              <span className={css.tabAnchor}>{startCase(key)}</span>
            </Flex>
          </Tab>
        </a>
      </Link>
    );

    let title;
    switch (selectedTab) {
      case 'devices':
        title = 'Test Devices';
        break;
      case 'activity':
        title = 'Version Activity';
        break;
      case 'qa':
        title = 'QA';
        break;
      case 'details':
      default:
        title = 'Version Details';
    }

    return (
      <Fragment>
        <ShipHead>{title}</ShipHead>
        <Flex direction="vertical" grow>
          <Base maxWidth={960}>
            <Tabs gap="x12">
              {tab('details')}
              {tab('devices')}
              {tab('qa')}
              {tab('activity')}
            </Tabs>
          </Base>
          <Divider color="gray-2" direction="horizontal" width="1px" />
          <Flex direction="vertical" maxWidth={960} grow>
            {this.tabContent()}
          </Flex>
        </Flex>
        <Flex paddingVertical="x16">
          <AddonFooter addonName="Ship" />
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ appVersion: { appVersion, events } }: RootState) => ({
  appVersion,
  lastEventTimestamp: events.length > 0 ? new Date(orderedAppVersionEvents(events)[0].createdAt).getTime() : -1
});

const mapDispatchToProps = {
  fetchAppVersion
};

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionPage as any);
Connected.displayName = 'AppVersionPage';

export default Connected;

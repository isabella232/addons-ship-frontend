import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Base, Divider, Flex, AddonFooter } from '@bitrise/bitkit';
import nookies from 'nookies';

import { AppVersionPageQuery, PageContext, AppVersion, AppVersionPageTabs, AppVersionEventStatus } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersion } from '@/ducks/appVersion';
import { orderedAppVersionEvents } from '@/ducks/selectors';

import Tabmenu from './tabmenu';
import Details from './details';
import Devices from './devices';
import Activity from './activity';
import QA from './qa';

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
    const { query, req, isServer } = ctx;
    const {
      appSlug,
      versionId,
      isPublic,
      selectedTab = AppVersionPageTabs[0]
    } = (query as unknown) as AppVersionPageQuery;
    const path = isServer ? req.path : location.pathname;
    const pagePath = path.replace(new RegExp(`/(${AppVersionPageTabs.join('|')})?$`), '');

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
        break;
      case 'qa':
        Connected.displayName = 'AppVersionQA';
        break;
    }

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
        return <Activity appSlug={appSlug} versionId={versionId} />;
      case 'qa':
        return <QA />;
      default:
        return <h1>{selectedTab}</h1>;
    }
  };

  render() {
    const { selectedTab, appSlug, versionId, activityLastSeen, lastEventTimestamp } = this.props;

    const showActivityBadge = selectedTab === 'activity' ? false : activityLastSeen < lastEventTimestamp;

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
          <Base maxWidth={992}>
            <Tabmenu
              tabs={[
                { label: 'details', showBadge: false },
                { label: 'devices', showBadge: false },
                { label: 'qa', showBadge: false },
                { label: 'activity', showBadge: showActivityBadge }
              ]}
              selectedTab={selectedTab}
              linkAsPrefix={`/apps/${appSlug}/versions/${versionId}/`}
              linkHrefPrefix={`/version?appSlug=${appSlug}&versionId=${versionId}&selectedTab=`}
            ></Tabmenu>
          </Base>
          <Divider color="gray-2" direction="horizontal" width="1px" />
          <Flex paddingHorizontal="x4" direction="vertical" maxWidth={992} grow>
            {this.tabContent()}
            <AddonFooter addonName="Ship" paddingVertical="x16" />
          </Flex>
        </Flex>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ appVersion: { appVersion, events } }: RootState) => ({
  appVersion,
  lastEventTimestamp:
    events.filter(appVersionEvent => appVersionEvent.status === AppVersionEventStatus.Failed).length > 0
      ? new Date(
          orderedAppVersionEvents(events).filter(
            appVersionEvent => appVersionEvent.status === AppVersionEventStatus.Failed
          )[0].createdAt
        ).getTime()
      : -1
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

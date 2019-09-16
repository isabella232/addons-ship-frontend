import { Component, Fragment } from 'react';
import { Base, Divider, AddonFooter, Flex } from '@bitrise/bitkit';

import { PageContext } from '@/models';
import { AppSettingsPageQuery, AppSettingsPageTabs } from '@/models/settings';
import ShipHead from '@/components/ShipHead';

import General from './general';
import Notifications from './notifications';
import TabMenu from '../version/TabMenu';

export class SettingsPage extends Component<AppSettingsPageQuery> {
  static displayName = 'SettingsPage';
  static defaultProps = {
    selectedTab: 'general'
  };

  static getInitialProps({ query }: PageContext) {
    const { appSlug, selectedTab = AppSettingsPageTabs[0] } = (query as unknown) as AppSettingsPageQuery;

    switch (selectedTab) {
      case 'notifications':
        SettingsPage.displayName = 'NotificationSettings';
        break;
    }

    return { appSlug, selectedTab };
  }

  tabContent = () => {
    const { selectedTab, appSlug } = this.props;

    switch (selectedTab) {
      case 'general':
        return <General appSlug={appSlug} />;
      case 'notifications':
        return <Notifications appSlug={appSlug} />;
      default:
        return <h1>{selectedTab}</h1>;
    }
  };

  render() {
    const { appSlug, selectedTab } = this.props;

    return (
      <Fragment>
        <ShipHead>{selectedTab === 'general' ? 'Settings' : 'Notifications'}</ShipHead>
        <Base>
          <Base>
            <Base maxWidth={992}>
              <TabMenu
                tabs={[{ label: 'general' }, { label: 'notifications' }]}
                selectedTab={selectedTab}
                linkAsPrefix={`/apps/${appSlug}/settings/`}
                linkHrefPrefix={`/settings?appSlug=${appSlug}&selectedTab=`}
              ></TabMenu>
            </Base>
            <Divider color="gray-2" direction="horizontal" width="1px" />
            <Flex padding="x4" direction="vertical" maxWidth={992} grow>
              {this.tabContent()}
              <AddonFooter addonName="Ship" paddingVertical="x16" />
            </Flex>
          </Base>
        </Base>
      </Fragment>
    );
  }
}

export default SettingsPage;

import { Component } from 'react';
import Link from 'next/link';
import { Base, Tabs, Tab, Divider } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { PageContext } from '@/models';
import { AppSettingsPageQuery, AppSettingsPageTabs } from '@/models/settings';
import { fetchSettings, listAppContacts } from '@/ducks/settings';

import General from './general';
import Notifications from './notifications';

export class SettingsPage extends Component<AppSettingsPageQuery> {
  static displayName = 'SettingsPage';
  static defaultProps = {
    selectedTab: 'general'
  };

  static async getInitialProps({ query, store, req, isServer }: PageContext) {
    const { appSlug, selectedTab = AppSettingsPageTabs[0] } = (query as unknown) as AppSettingsPageQuery;

    switch (selectedTab) {
      case 'general':
        SettingsPage.displayName = 'GeneralSettings';
        await store.dispatch(fetchSettings(appSlug) as any);
        break;
      case 'notifications':
        SettingsPage.displayName = 'NotificationSettings';
        await store.dispatch(listAppContacts(appSlug) as any);
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

    const tab = (key: string) => (
      <Tab active={selectedTab === key}>
        <Link as={`/apps/${appSlug}/settings/${key}`} href={`/settings?appSlug=${appSlug}&selectedTab=${key}`}>
          <a>{startCase(key)}</a>
        </Link>
      </Tab>
    );

    return (
      <Base paddingVertical="x10">
        <Base maxWidth={960}>
          <Tabs gap="x10">
            {tab('general')}
            {tab('notifications')}
          </Tabs>
        </Base>
        <Divider color="gray-2" direction="horizontal" />
        <Base maxWidth={960}>{this.tabContent()}</Base>
      </Base>
    );
  }
}

export default SettingsPage;

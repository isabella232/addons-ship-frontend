import { Component } from 'react';
import Link from 'next/link';
import { Base, Tabs, Tab, Divider } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { AppSettingsPageQuery, PageContext, AppSettingsPageTabs } from '@/models';
import { fetchSettings } from '@/ducks/settings';

import General from './general';
import Notifications from './notifications';

interface SettingsPageProps extends AppSettingsPageQuery {
  pagePath: string;
}

export class SettingsPage extends Component<SettingsPageProps> {
  static defaultProps = {
    selectedTab: 'general'
  };

  static async getInitialProps({ query, store, req }: PageContext) {
    const { appSlug, selectedTab = AppSettingsPageTabs[0] } = (query as unknown) as AppSettingsPageQuery;

    switch (selectedTab) {
      case 'general':
        await store.dispatch(fetchSettings(appSlug) as any);
        break;
    }

    const pagePath = req.path.replace(new RegExp(`/${selectedTab}$`), '');

    return { appSlug, selectedTab, pagePath };
  }

  tabContent = () => {
    const { selectedTab } = this.props;

    switch (selectedTab) {
      case 'general':
        return <General />;
      case 'notifications':
        return <Notifications />;
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

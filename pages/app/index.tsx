import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import formatDate from 'date-fns/format';
import { Text, Divider } from '@bitrise/bitkit';

import css from './style.scss';

import { AppPageQuery, PageContext, AppVersionList } from '@/models';
import AppSummary from '@/components/AppSummary';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import { RootState } from '@/store';
import { fetchAppVersionList } from '@/ducks/appVersionList';

interface AppPageProps extends AppPageQuery {
  appVersionList: AppVersionList;
}

type AppPageState = {};

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {};

  static async getInitialProps({ query: { appSlug }, store }: PageContext) {
    await store.dispatch(fetchAppVersionList(appSlug as string) as any);

    return { appSlug };
  }

  render() {
    const { appVersionList } = this.props;
    const latestAppVersion = appVersionList[0].appVersions[0];

    return (
      <div className={css.appPageWrapper}>
        <div className={css.appPage}>
          <div className={css.appSummaryWrapper}>
            <AppSummary
              detailsPagePath={`/${latestAppVersion.id}/details`}
              title={`${latestAppVersion.appName} v${latestAppVersion.version} (${latestAppVersion.buildNumber})`}
              description={latestAppVersion.description}
              note={`Updated on ${formatDate(latestAppVersion.lastUpdate, 'MMMM D, YYYY')}`}
              iconUrl={latestAppVersion.iconUrl}
              platformIconUrl="/static/icon-apple.svg"
            />
          </div>
          <Text letterSpacing="x1" size="x5" weight="bold">
            Version History
          </Text>
          <Divider color="gray-2" direction="horizontal" margin="x2" />
          {appVersionList.map((appVersionListItem, i) => (
            <Fragment key={i}>
              <div className={css.majorVersionHeading}>v.{appVersionListItem.version}</div>
              {appVersionListItem.appVersions.map((appVersion, j) => (
                <VersionListPageItem
                  key={`${i}-${j}`}
                  detailsPagePath={`/${appVersion.id}/details`}
                  platformIconUrl="/static/icon-apple.svg"
                  title={`${appVersion.appName} (${appVersion.buildNumber})`}
                  description={appVersion.description}
                  note={`Updated on ${formatDate(appVersion.lastUpdate, 'MMMM D, YYYY')}`}
                />
              ))}
            </Fragment>
          ))}
        </div>
        <div className={css.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ appVersionList }: RootState) => ({ appVersionList });

export default connect(mapStateToProps)(AppPage as any);

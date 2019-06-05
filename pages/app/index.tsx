import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import formatDate from 'date-fns/format';
import { Flex, Base, Text } from '@bitrise/bitkit';

import css from './style.scss';

import { AppPageQuery, PageContext, AppVersionList } from '@/models';
import AppSummary from '@/components/AppSummary';
import SectionHeading from '@/components/SectionHeading';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import { RootState } from '@/store';
import { fetchAppVersionList } from '@/ducks/appVersionList';
import EmptyPage from '@/components/EmptyPage';

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
    const emptyPage = true;

    return (
      <Flex direction="vertical" className={css.wrapper}>
        {emptyPage ? (
          <EmptyPage />
        ) : (
          <Flex direction="vertical" alignChildrenHorizontal="middle" padding="x16">
            <Base width="100%">
              <AppSummary
                detailsPagePath={`/${latestAppVersion.id}/details`}
                title={`${latestAppVersion.appName} v${latestAppVersion.version} (${latestAppVersion.buildNumber})`}
                description={latestAppVersion.description}
                note={`Updated on ${formatDate(latestAppVersion.lastUpdate, 'MMMM D, YYYY')}`}
                iconUrl={latestAppVersion.iconUrl}
                platformIconUrl="/static/icon-apple.svg"
              />
              <Base className={css.sectionHeadingWrapper}>
                <SectionHeading>Version History</SectionHeading>
                {appVersionList.map((appVersionListItem, i) => (
                  <Fragment key={i}>
                    <Text className={css.majorVersionHeading} size="x4" weight="bold" color="gray-6">
                      v.{appVersionListItem.version}
                    </Text>
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
              </Base>
            </Base>
          </Flex>
        )}
        <Base paddingVertical="x6">
          <Footer />
        </Base>
      </Flex>
    );
  }
}

const mapStateToProps = ({ appVersionList }: RootState) => ({ appVersionList });

export default connect(mapStateToProps)(AppPage as any);

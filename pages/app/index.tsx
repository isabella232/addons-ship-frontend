import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import formatDate from 'date-fns/format';
import { Text, Divider, Flex, Dropdown, Base } from '@bitrise/bitkit';

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

type AppPageState = {
  selectedVersionSortingOption: any;
};

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {
    selectedVersionSortingOption: null
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
      selectedVersionSortingOption: this.versionSortingOptions.find(
        versionSortingOption => versionSortingOption.value === 'latest-build'
      )
    });
  }

  static async getInitialProps({ query: { appSlug }, store }: PageContext) {
    await store.dispatch(fetchAppVersionList(appSlug as string) as any);

    return { appSlug };
  }

  versionSortOptionWithValueSelected(value: string) {
    this.setState({
      selectedVersionSortingOption: this.versionSortingOptions.find(
        versionSortingOption => versionSortingOption.value === value
      )
    });
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
          <Flex direction="horizontal" alignChildrenVertical="end" gap="x2">
            <Flex grow shrink>
              <Text letterSpacing="x1" size="x5" weight="bold">
                Version History
              </Text>
              <Divider color="gray-2" direction="horizontal" margin="x2" />
            </Flex>
            {this.state.selectedVersionSortingOption && (
              <Dropdown
                width={168}
                elevation="x1"
                fullWidth={false}
                onChange={versionSortingOptionValue =>
                  this.versionSortOptionWithValueSelected(versionSortingOptionValue)
                }
                options={this.versionSortingOptions}
                selected={this.state.selectedVersionSortingOption.value}
              >
                {this.state.selectedVersionSortingOption.text}
              </Dropdown>
            )}
          </Flex>

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

import formatDate from 'date-fns/format';
import { Flex, Base, Text, Divider, Dropdown } from '@bitrise/bitkit';
import css from '../style.scss';
import AppSummary from '@/components/AppSummary';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import EmptyPage from '@/components/EmptyPage';
import { AppVersion } from '@/models';
import { Fragment } from 'react';

type Props = {
  emptyPage: boolean;
  latestAppVersion: AppVersion | null;
  versionSortingOptions: Array<{
    text: string;
    value: string;
  }>;
  versionSortOptionWithValueSelected: any;
  selectedVersionSortingOption?: {
    text: string;
    value: string;
  };
  groupedAppVersionList: Array<{
    groupName: string;
    appVersions: AppVersion[];
  }>;
};

export default ({
  emptyPage,
  latestAppVersion,
  versionSortingOptions,
  versionSortOptionWithValueSelected,
  selectedVersionSortingOption,
  groupedAppVersionList
}: Props) => (
  <Flex direction="vertical" className={css.wrapper}>
    {emptyPage ? (
      <EmptyPage />
    ) : (
      <Flex direction="vertical" alignChildrenHorizontal="middle" padding="x16">
        <Base width="100%">
          {latestAppVersion && (
            <AppSummary
              detailsPagePath={`/${latestAppVersion.id}/details`}
              title={`${latestAppVersion.appName} v${latestAppVersion.version} (${latestAppVersion.buildNumber})`}
              description={latestAppVersion.description}
              note={`Updated on ${formatDate(latestAppVersion.lastUpdate, 'MMMM D, YYYY')}`}
              iconUrl={latestAppVersion.iconUrl}
              platformIconUrl="/static/icon-apple.svg"
            />
          )}
          <Base className={css.sectionHeadingWrapper}>
            <Flex direction="horizontal" alignChildrenVertical="end" gap="x2">
              <Flex grow shrink>
                <Text letterSpacing="x1" size="x5" weight="bold">
                  Version History
                </Text>
                <Divider color="gray-2" direction="horizontal" margin="x2" />
              </Flex>
              {selectedVersionSortingOption && (
                <Dropdown
                  width={168}
                  elevation="x1"
                  fullWidth={false}
                  onChange={versionSortingOptionValue => versionSortOptionWithValueSelected(versionSortingOptionValue)}
                  options={versionSortingOptions}
                  selected={selectedVersionSortingOption.value}
                >
                  {selectedVersionSortingOption.text}
                </Dropdown>
              )}
            </Flex>

            {groupedAppVersionList &&
              groupedAppVersionList.map((appVersionListItem, i) => (
                <Fragment key={i}>
                  {selectedVersionSortingOption && selectedVersionSortingOption.value === 'latest-version' && (
                    <Text className={css.majorVersionHeading} size="x4" weight="bold" color="gray-6">
                      v.{appVersionListItem.groupName}
                    </Text>
                  )}
                  {appVersionListItem.appVersions.map((appVersion, j) => (
                    <VersionListPageItem
                      key={`${i}-${j}`}
                      detailsPagePath={`/apps/${appVersion.appSlug}/versions/${appVersion.id}/details`}
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

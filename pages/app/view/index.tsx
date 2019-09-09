import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import { Flex, Base, Text, Divider, Dropdown } from '@bitrise/bitkit';

import AppSummary from '@/components/AppSummary';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import { AppVersion, Platform } from '@/models';
import { mediaQuery } from '@/utils/media';
import PlatformSelector from '@/components/PlatformSelector';

import css from '../style.scss';

type Props = {
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
  isCrossPlatform: boolean;
  selectedPlatform?: Platform;
  onSelectPlatform: (platform: Platform) => void;
  startColor?: string;
  endColor?: string;
};

export default ({
  latestAppVersion,
  versionSortingOptions,
  versionSortOptionWithValueSelected,
  selectedVersionSortingOption,
  groupedAppVersionList,
  isCrossPlatform,
  selectedPlatform,
  onSelectPlatform,
  startColor,
  endColor
}: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Flex direction="vertical" className={css.wrapper}>
      {isCrossPlatform && (
        <Flex direction="horizontal" padding="x4" alignChildren="middle">
          <PlatformSelector platform={selectedPlatform} onClick={onSelectPlatform} />
        </Flex>
      )}
      <Flex
        direction="vertical"
        alignChildrenHorizontal="middle"
        padding={isDesktop && !isCrossPlatform ? 'x16' : 'x4'}
      >
        <Base width="100%" maxWidth={960}>
          {latestAppVersion && (
            <AppSummary
              detailsPagePath={`/apps/${latestAppVersion.appSlug}/versions/${latestAppVersion.id}/details`}
              detailsPagePathHref={`/version?appSlug=${latestAppVersion.appSlug}&versionId=${latestAppVersion.id}`}
              title={`${latestAppVersion.appName} v${latestAppVersion.version} (${latestAppVersion.buildNumber})`}
              description={latestAppVersion.commitMessage}
              note={`Updated on ${formatDate(latestAppVersion.lastUpdate, 'MMMM D, YYYY')}`}
              iconUrl={latestAppVersion.iconUrl}
              platform={latestAppVersion.platform}
              startColor={startColor}
              endColor={endColor}
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
                      detailsPagePathHref={`/version?appSlug=${appVersion.appSlug}&versionId=${appVersion.id}`}
                      platform={appVersion.platform}
                      title={`${appVersion.appName} (${appVersion.buildNumber})`}
                      description={appVersion.commitMessage}
                      note={`Updated on ${formatDate(appVersion.lastUpdate, 'MMMM D, YYYY, HH:mm')}`}
                    />
                  ))}
                </Fragment>
              ))}
          </Base>
        </Base>
      </Flex>
      <Base paddingVertical="x6">
        <Footer />
      </Base>
    </Flex>
  );
};

import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import { Flex, Base, Text, Divider, Dropdown, Notification } from '@bitrise/bitkit';

import AppSummary from '@/components/AppSummary';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import { AppVersion, Platform } from '@/models';
import { mediaQuery } from '@/utils/media';
import PlatformSelector from '@/components/PlatformSelector';
import MagicTag from '@/components/Tag/MagicTag';
import s from '@/utils/s';

import css from '../style.scss';

export type Props = {
  latestAppVersion: AppVersion;
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
  productFlavours: string[];
  selectedProductFlavour?: string;
  selectProductFalvour: (flavour: string) => void;
  warnings: string[];
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
  endColor,
  productFlavours,
  selectedProductFlavour,
  selectProductFalvour,
  warnings
}: Props) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  return (
    <Flex direction="vertical" className={css.wrapper}>
      {isCrossPlatform && (
        <Flex direction="horizontal" padding={isTablet ? 'x4' : 'x0'} alignChildren="middle">
          <PlatformSelector platform={selectedPlatform} onClick={onSelectPlatform} />
        </Flex>
      )}

      <Flex
        direction="vertical"
        alignChildrenHorizontal="middle"
        paddingHorizontal={isDesktop ? 'x16' : 'x4'}
        paddingVertical={isDesktop && !isCrossPlatform ? 'x16' : 'x0'}
      >
        <Base width="100%" maxWidth={960}>
          {warnings.length > 0 && (
            <Base margin="x4">
              {warnings.map((warning, idx) => (
                <Notification type="warning" key={idx}>
                  {warning}
                </Notification>
              ))}
            </Base>
          )}
          {productFlavours.length > 0 && (
            <Flex
              wrap
              direction={isTablet ? 'horizontal' : 'vertical'}
              shrink
              gap="x2"
              margin="x4"
              paddingHorizontal="x1"
            >
              {productFlavours.map((f, idx) => (
                <Flex key={idx}>
                  <MagicTag large selected={f === selectedProductFlavour} onClick={() => selectProductFalvour(f)}>
                    {f}
                  </MagicTag>
                </Flex>
              ))}
            </Flex>
          )}
          <AppSummary
            detailsPagePath={`/apps/${latestAppVersion.appSlug}/versions/${latestAppVersion.id}/details`}
            detailsPagePathHref={`/version?appSlug=${latestAppVersion.appSlug}&versionId=${latestAppVersion.id}`}
            title={`(${latestAppVersion.buildNumber}) v${latestAppVersion.version} ${latestAppVersion.appName}`}
            description={latestAppVersion.commitMessage}
            note={
              isTablet
                ? `Updated on ${formatDate(latestAppVersion.lastUpdate, 'MMMM D, HH:mm')}`
                : formatDate(latestAppVersion.lastUpdate, 'MMM D, HH:mm')
            }
            iconUrl={latestAppVersion.iconUrl}
            platform={latestAppVersion.platform}
            startColor={startColor}
            endColor={endColor}
            productFlavour={latestAppVersion.productFlavour}
          />
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
                      title={`(${appVersion.buildNumber}) ${appVersion.appName}`}
                      description={appVersion.commitMessage}
                      descriptionPlaceholder={s`No commit message`}
                      note={`Updated on ${formatDate(appVersion.lastUpdate, 'MMMM D, HH:mm')}`}
                      productFlavour={appVersion.productFlavour}
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

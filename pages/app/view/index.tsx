import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import { Flex, Base, Text, Divider, Dropdown, Notification, variables } from '@bitrise/bitkit';

import AppSummary from '@/components/AppSummary';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';
import { AppVersion, Platform } from '@/models';
import { mediaQuery } from '@/utils/media';
import PlatformSelector from '@/components/PlatformSelector';
import s from '@/utils/s';

import css from '../style.scss';

const { sizeX2 } = variables;

export type Props = {
  latestAppVersion: AppVersion;
  iconUrl: string;
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
  iconUrl,
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
  const hasProductFlavours = productFlavours.length > 0;
  const useMobileFilters = !isTablet && hasProductFlavours;

  return (
    <Flex direction="vertical" grow margin="x2">
      {isCrossPlatform && (
        <Flex direction="horizontal" padding={isTablet ? 'x3' : 'x0'} alignChildren="middle">
          <PlatformSelector platform={selectedPlatform} onClick={onSelectPlatform} />
        </Flex>
      )}

      <Flex
        direction="vertical"
        alignChildrenHorizontal="middle"
        paddingHorizontal={isDesktop ? 'x16' : 'x4'}
        paddingVertical={isDesktop && !isCrossPlatform ? 'x16' : 'x0'}
        grow
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
            iconUrl={iconUrl}
            platform={latestAppVersion.platform}
            startColor={startColor}
            endColor={endColor}
            productFlavour={latestAppVersion.productFlavour}
          />
          <Base className={css.sectionHeadingWrapper}>
            <Flex direction={useMobileFilters ? 'vertical' : 'horizontal'} alignChildrenVertical="end" gap="x4">
              <Flex grow shrink>
                <Text letterSpacing="x1" size="x5" weight="bold">
                  Version History {hasProductFlavours && 'by Flavor'}
                </Text>
                {!useMobileFilters && <Divider color="gray-2" direction="horizontal" margin="x2" />}
              </Flex>

              <Flex direction="horizontal" gap="x4">
                {hasProductFlavours && (
                  <Dropdown
                    width={useMobileFilters ? `calc(50% - ${sizeX2}px)` : 168}
                    elevation="x1"
                    onChange={value => selectProductFalvour(value)}
                    options={productFlavours.map(value => ({ text: value, value }))}
                    selected={selectedProductFlavour}
                  >
                    {selectedProductFlavour}
                  </Dropdown>
                )}
                {selectedVersionSortingOption && (
                  <Dropdown
                    width={useMobileFilters ? `calc(50% - ${sizeX2}px)` : 168}
                    elevation="x1"
                    onChange={versionSortingOptionValue =>
                      versionSortOptionWithValueSelected(versionSortingOptionValue)
                    }
                    options={versionSortingOptions}
                    selected={selectedVersionSortingOption.value}
                  >
                    {selectedVersionSortingOption.text}
                  </Dropdown>
                )}
              </Flex>
              {useMobileFilters && <Divider color="gray-2" direction="horizontal" margin="x2" />}
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
                      title={`(${appVersion.buildNumber}) v${latestAppVersion.version} ${appVersion.appName}`}
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

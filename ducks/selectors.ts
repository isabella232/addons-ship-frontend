import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

import { RootState } from '@/store';
import { AppVersionEvent, AppVersion, Platform } from '@/models';

export const getAppVersionsByPlatform = (appVersionList: AppVersion[], platform: Platform): AppVersion[] =>
  appVersionList.filter(({ platform: _platform }) => _platform === platform);

export const getAppVersionsByVersion = ({ appVersionList }: RootState) =>
  appVersionList
    ? map(groupBy(appVersionList, 'version'), (appVersions, version) => ({
        appVersions: sortBy(appVersions, ({ buildNumber }: AppVersion) => -buildNumber),
        groupName: version
      }))
    : null;

export const getPlatformAppVersionsByVersion = ({ appVersionList }: RootState, platform: Platform) =>
  appVersionList
    ? getAppVersionsByVersion({
        appVersionList: getAppVersionsByPlatform(appVersionList, platform)
      } as RootState)
    : null;

export const getAppVersionsByBuildNumber = ({ appVersionList }: RootState) =>
  appVersionList
    ? map(groupBy(appVersionList, 'buildNumber'), (appVersions, buildNumber) => ({
        appVersions,
        groupName: buildNumber
      })).reverse()
    : null;

export const getPlatformAppVersionsByBuildNumber = ({ appVersionList }: RootState, platform: Platform) =>
  appVersionList
    ? getAppVersionsByBuildNumber({
        appVersionList: getAppVersionsByPlatform(appVersionList, platform)
      } as RootState)
    : null;

export const orderedAppVersionEvents = (events: AppVersionEvent[]) =>
  [...events].sort(({ createdAtTimestamp: c1 }, { createdAtTimestamp: c2 }) => c2 - c1);

export const isCrossPlatform = ({ appVersionList }: RootState): boolean => {
  if (!appVersionList) {
    return false;
  }

  let hasAndroid = false,
    hasIOS = false;
  appVersionList.forEach(({ platform }) => {
    if (platform === 'android') {
      hasAndroid = true;
    }

    if (platform === 'ios') {
      hasIOS = true;
    }
  });

  return hasAndroid && hasIOS;
};

export const getVersionFlavors = ({ appVersionList }: RootState): string[] => {
  if (!appVersionList) {
    return [];
  }

  return uniq(
    appVersionList.reduce(
      (flavors: string[], { productFlavor }) => (productFlavor ? [...flavors, productFlavor] : flavors),
      []
    )
  );
};

import { map, groupBy } from 'lodash';
import { RootState } from '@/store';

export const getAppVersionsByVersion = ({appVersionList}: RootState) =>
  appVersionList ? map(groupBy(appVersionList, 'version'), (appVersions, version) => ({
    appVersions: appVersions,
    groupName: version
  })) : null;

export const getAppVersionsByBuildNumber = ({appVersionList}: RootState) =>
  appVersionList ? map(groupBy(appVersionList, 'buildNumber'), (appVersions, buildNumber) => ({
    appVersions: appVersions,
    groupName: buildNumber
  })).reverse() : null;

import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

import { RootState } from '@/store';
import { AppVersionEvent, AppVersion } from '@/models';

export const getAppVersionsByVersion = ({ appVersionList }: RootState) =>
  appVersionList
    ? map(groupBy(appVersionList, 'version'), (appVersions, version) => ({
        appVersions: sortBy(appVersions, ({ buildNumber }: AppVersion) => -buildNumber),
        groupName: version
      }))
    : null;

export const getAppVersionsByBuildNumber = ({ appVersionList }: RootState) =>
  appVersionList
    ? map(groupBy(appVersionList, 'buildNumber'), (appVersions, buildNumber) => ({
        appVersions,
        groupName: buildNumber
      })).reverse()
    : null;

export const orderedAppVersionEvents = (events: AppVersionEvent[]) =>
  [...events].sort(({ createdAtTimestamp: c1 }, { createdAtTimestamp: c2 }) => c2 - c1);

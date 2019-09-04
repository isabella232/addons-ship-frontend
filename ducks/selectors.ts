import map from 'lodash/map';
import groupBy from 'lodash/groupBy';

import { RootState } from '@/store';
import { AppVersionEvent } from '@/models';

export const getAppVersionsByVersion = ({ appVersionList }: RootState) =>
  appVersionList
    ? map(groupBy(appVersionList, 'version'), (appVersions, version) => ({
        appVersions,
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
  events.sort(({ createdAt: c1 }, { createdAt: c2 }) => {
    switch (typeof c1) {
      case 'string': {
        c1 = new Date(c1);
      }
      case 'object': {
        c1 = c1.getTime();
      }
    }
    switch (typeof c2) {
      case 'string': {
        c2 = new Date(c2);
      }
      case 'object': {
        c2 = c2.getTime();
      }
    }

    return c2 - c1;
  });

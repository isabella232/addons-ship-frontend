import {
  getAppVersionsByVersion,
  getAppVersionsByBuildNumber,
  orderedAppVersionEvents,
  isCrossPlatform,
  getPlatformAppVersionsByVersion,
  getPlatformAppVersionsByBuildNumber
} from './selectors';
import { RootState } from '@/store';
import { mockAppVersions } from '@/mocks';
import { AppVersion, AppVersionEvent } from '@/models';

describe('getAppVersionsByVersion', () => {
  it('returns null', () => {
    expect(getAppVersionsByVersion({ appVersionList: null } as any)).toBeNull();
  });

  it('groups app versions by version', () => {
    const groupedAppVersions = getAppVersionsByVersion({ appVersionList: mockAppVersions } as RootState) as {
      groupName: string;
      appVersions: AppVersion[];
    }[];

    expect(groupedAppVersions).toMatchSnapshot();
  });

  it('versions are ordered by build number inside version groups', () => {
    const appVersions = [
      {
        version: '1.0',
        buildNumber: 3
      },
      {
        version: '1.0',
        buildNumber: 9
      },
      {
        version: '1.0',
        buildNumber: 6
      },
      {
        version: '2.0',
        buildNumber: 16
      }
    ] as AppVersion[];

    const groupped = getAppVersionsByVersion({ appVersionList: appVersions } as RootState);

    expect(groupped).toEqual([
      {
        groupName: '1.0',
        appVersions: [
          {
            version: '1.0',
            buildNumber: 9
          },
          {
            version: '1.0',
            buildNumber: 6
          },
          {
            version: '1.0',
            buildNumber: 3
          }
        ]
      },
      {
        groupName: '2.0',
        appVersions: [
          {
            version: '2.0',
            buildNumber: 16
          }
        ]
      }
    ]);
  });
});

describe('getPlatformAppVersionsByVersion', () => {
  it('selects versions by platfrom, groupped by versions', () => {
    const appVersionList = [
      {
        version: '1.0',
        buildNumber: 3,
        platform: 'ios'
      },
      {
        version: '1.0',
        buildNumber: 9,
        platform: 'ios'
      },
      {
        version: '1.0',
        buildNumber: 6,
        platform: 'android'
      },
      {
        version: '2.0',
        buildNumber: 16,
        platform: 'android'
      }
    ] as AppVersion[];

    const versions = getPlatformAppVersionsByVersion({ appVersionList } as RootState, 'android');

    expect(versions).toMatchSnapshot();
  });

  it('handles null', () => {
    expect(getPlatformAppVersionsByVersion({ appVersionList: null } as RootState, 'ios')).toBeNull();
  });
});

describe('getPlatformAppVersionsByBuildNumber', () => {
  it('selects versions by platfrom, groupped by build number', () => {
    const appVersionList = [
      {
        version: '1.0',
        buildNumber: 3,
        platform: 'ios'
      },
      {
        version: '1.0',
        buildNumber: 9,
        platform: 'ios'
      },
      {
        version: '1.0',
        buildNumber: 6,
        platform: 'android'
      },
      {
        version: '2.0',
        buildNumber: 16,
        platform: 'android'
      }
    ] as AppVersion[];

    const versions = getPlatformAppVersionsByBuildNumber({ appVersionList } as RootState, 'android');

    expect(versions).toMatchSnapshot();
  });

  it('handles null', () => {
    expect(getPlatformAppVersionsByBuildNumber({ appVersionList: null } as RootState, 'ios')).toBeNull();
  });
});

describe('getAppVersionsByBuildNumber', () => {
  it('returns null', () => {
    expect(getAppVersionsByBuildNumber({ appVersionList: null } as any)).toBeNull();
  });

  it('groups app versions by build number', () => {
    const groupedAppVersions = getAppVersionsByBuildNumber({ appVersionList: mockAppVersions } as RootState) as {
      groupName: string;
      appVersions: AppVersion[];
    }[];

    expect(groupedAppVersions).toMatchSnapshot();
  });
});

describe('orderedAppVersionEvents', () => {
  it('orders events in descending creation time', () => {
    const events = ([
      { createdAtTimestamp: new Date('2019-07-08').getTime() },
      { createdAtTimestamp: new Date('2019-06-20').getTime() },
      { createdAtTimestamp: new Date('2019-08-01').getTime() }
    ] as unknown) as AppVersionEvent[];

    expect(orderedAppVersionEvents(events)).toMatchSnapshot();
  });
});

describe('isCrossPlatform', () => {
  const androidVersions = [
      {
        id: 'version-1',
        platform: 'android'
      },
      {
        id: 'version-2',
        platform: 'android'
      }
    ] as AppVersion[],
    iosVersions = [
      {
        id: 'version-3',
        platform: 'ios'
      },
      {
        id: 'version-4',
        platform: 'ios'
      }
    ] as AppVersion[];

  it('returns false', () => {
    expect(isCrossPlatform({ appVersionList: null } as RootState)).toBe(false);

    expect(isCrossPlatform({ appVersionList: androidVersions } as RootState)).toBe(false);
    expect(isCrossPlatform({ appVersionList: iosVersions } as RootState)).toBe(false);
  });

  it('detects cross platform apps', () => {
    expect(isCrossPlatform({ appVersionList: [...iosVersions, ...androidVersions] } as RootState)).toBe(true);
  });
});

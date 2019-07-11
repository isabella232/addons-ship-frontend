import { getAppVersionsByVersion, getAppVersionsByBuildNumber, orderedAppVersionEvents } from './selectors';
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
      { createdAt: new Date('2019-07-08') },
      { createdAt: new Date('2019-06-20') },
      { createdAt: new Date('2019-08-01') }
    ] as unknown) as AppVersionEvent[];

    expect(orderedAppVersionEvents(events)).toMatchSnapshot();
  });
});

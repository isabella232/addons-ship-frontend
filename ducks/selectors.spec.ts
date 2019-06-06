import { getAppVersionsByVersion, getAppVersionsByBuildNumber } from './selectors';
import { RootState } from '@/store';
import { mockAppVersions } from '@/mocks';
import { AppVersion } from '@/models';

describe('getAppVersionsByVersion', () => {
  let groupedAppVersions: any;

  beforeAll(() => {
    groupedAppVersions = getAppVersionsByVersion({ appVersionList: mockAppVersions } as RootState);
  });

  it('groups app versions by version', () => {
    expect(groupedAppVersions.length).toEqual(2);

    expect(groupedAppVersions[0].groupName).toEqual('1.0.3');
    expect(groupedAppVersions[1].groupName).toEqual('1.0.2');

    expect(groupedAppVersions[0].appVersions.length).toEqual(3);
    expect(groupedAppVersions[1].appVersions.length).toEqual(2);
  });
});

describe('getAppVersionsByBuildNumber', () => {
  let groupedAppVersions: any;

  beforeAll(() => {
    groupedAppVersions = getAppVersionsByBuildNumber({ appVersionList: mockAppVersions } as RootState);
  });

  it('groups app versions by build number', () => {
    expect(groupedAppVersions.length).toEqual(5);

    expect(groupedAppVersions[0].groupName).toEqual('32');
    expect(groupedAppVersions[1].groupName).toEqual('31');
    expect(groupedAppVersions[2].groupName).toEqual('30');
    expect(groupedAppVersions[3].groupName).toEqual('29');
    expect(groupedAppVersions[4].groupName).toEqual('28');

    expect(groupedAppVersions[0].appVersions.length).toEqual(1);
    expect(groupedAppVersions[1].appVersions.length).toEqual(1);
    expect(groupedAppVersions[2].appVersions.length).toEqual(1);
    expect(groupedAppVersions[3].appVersions.length).toEqual(1);
    expect(groupedAppVersions[4].appVersions.length).toEqual(1);
  });
});

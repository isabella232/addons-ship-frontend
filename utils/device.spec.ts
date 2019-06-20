import * as ReactDeviceDetect from 'react-device-detect';

import { isAndroid, isIOS, osVersion, mobileModel } from './device';

describe('isAndroid', () => {
  it('returns same as ReactDeviceDetect', () => {
    expect(isAndroid()).toEqual(ReactDeviceDetect.isAndroid);
  });
});

describe('isIOS', () => {
  it('returns same as ReactDeviceDetect', () => {
    expect(isIOS()).toEqual(ReactDeviceDetect.isIOS);
  });
});

describe('osVersion', () => {
  it('returns same as ReactDeviceDetect', () => {
    expect(osVersion()).toEqual(ReactDeviceDetect.osVersion);
  });
});

describe('mobileModel', () => {
  it('returns same as ReactDeviceDetect', () => {
    expect(mobileModel()).toEqual(ReactDeviceDetect.mobileModel);
  });
});

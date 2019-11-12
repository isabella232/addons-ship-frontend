import * as ReactDeviceDetect from 'react-device-detect';

import { isAndroid, isIOS, osVersion, mobileModel, deviceInfo } from './device';

describe('device utils', () => {
  test('isAndroid returns same as ReactDeviceDetect', () => {
    expect(isAndroid()).toEqual(ReactDeviceDetect.isAndroid);
  });

  test('isIOS returns same as ReactDeviceDetect', () => {
    expect(isIOS()).toEqual(ReactDeviceDetect.isIOS);
  });

  test('osVersion returns same as ReactDeviceDetect', () => {
    expect(osVersion()).toEqual(ReactDeviceDetect.osVersion);
  });

  test('mobileModel returns same as ReactDeviceDetect', () => {
    expect(mobileModel()).toEqual(ReactDeviceDetect.mobileModel);
  });

  test('deviceInfo', () => {
    const expectToHaveProperties = (obj: object, ...props: string[]) =>
      props.forEach(prop => expect(obj).toHaveProperty(prop));

    const info = deviceInfo();

    expectToHaveProperties(
      info,
      'deviceType',
      'osName',
      'osVersion',
      'mobileVendor',
      'mobileModel',
      'browserName',
      'browserVersion',
      'isAndroid',
      'isIOS',
      'isBrowser'
    );
  });
});

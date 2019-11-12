import * as ReactDeviceDetect from 'react-device-detect';
import * as CompareVersions from 'compare-versions';

export const isAndroid = () => ReactDeviceDetect.isAndroid;
export const isIOS = () => ReactDeviceDetect.isIOS;
export const osVersion = () => ReactDeviceDetect.osVersion;
export const mobileModel = () => ReactDeviceDetect.mobileModel;
export const deviceInfo = () => ({
  deviceType: ReactDeviceDetect.deviceType || 'unknown',
  osName: ReactDeviceDetect.osName,
  osVersion: ReactDeviceDetect.osVersion,
  mobileVendor: ReactDeviceDetect.mobileVendor,
  mobileModel: ReactDeviceDetect.mobileModel,
  browserName: ReactDeviceDetect.browserName,
  browserVersion: ReactDeviceDetect.browserVersion,
  isAndroid: ReactDeviceDetect.isAndroid,
  isIOS: ReactDeviceDetect.isIOS,
  isBrowser: ReactDeviceDetect.isBrowser
});
export const compareVersions = (firstVersion: string, secondVersion: string) =>
  CompareVersions(firstVersion, secondVersion);

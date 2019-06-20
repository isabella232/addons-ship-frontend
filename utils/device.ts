import * as ReactDeviceDetect from 'react-device-detect';
import * as CompareVersions from 'compare-versions';

export const isAndroid = () => ReactDeviceDetect.isAndroid;
export const isIOS = () => ReactDeviceDetect.isIOS;
export const osVersion = () => ReactDeviceDetect.osVersion;
export const mobileModel = () => ReactDeviceDetect.mobileModel;
export const compareVersions = (firstVersion: string, secondVersion: string) => CompareVersions(firstVersion, secondVersion)

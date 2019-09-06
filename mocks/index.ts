import { AppVersion, AppVersionEvent, AppVersionEventStatus } from '@/models';
import { ScreenshotResponse } from '@/models/uploadable';
import { Settings } from '@/models/settings';
import { TestDevice } from '@/models/test-device';
import { App } from '@/models/app';

export const mockAppVersions: AppVersion[] = [
  {
    id: '123',
    appSlug: 'app-slug-123',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 32,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    bundleId: 'bundle-id',
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
    screenshotDatas: []
  },
  {
    id: '456',
    appSlug: 'app-slug-456',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 31,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    bundleId: 'bundle-id',
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
    screenshotDatas: []
  },
  {
    id: '789',
    appSlug: 'app-slug-789',
    version: '1.0.3',
    platform: 'ios',
    buildNumber: 30,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    bundleId: 'bundle-id',
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
    screenshotDatas: []
  },
  {
    id: '135',
    appSlug: 'app-slug-135',
    version: '1.0.2',
    platform: 'ios',
    buildNumber: 29,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    bundleId: 'bundle-id',
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
    screenshotDatas: []
  },
  {
    id: '246',
    appSlug: 'app-slug-246',
    version: '1.0.2',
    platform: 'ios',
    buildNumber: 28,
    buildSlug: '13245ads',
    lastUpdate: new Date('2018-09-22T12:42:31Z'),
    description: 'Some semi-long description',
    whatsNew: 'Some longer whats-new',
    minimumOs: '10.2',
    minimumSdk: 'dunno',
    packageName: 'com.package.name',
    bundleId: 'bundle-id',
    supportedDeviceTypes: ['iphone', 'ipad'],
    distributionType: 'development',
    iconUrl: 'http://placekitten.com/160/160',
    appName: 'Standup Timer',
    promotionalText: 'Promotional Text',
    keywords: 'Keywords',
    reviewNotes: 'Review Notes',
    supportUrl: 'https://bitrise.io/support',
    marketingUrl: 'https://bitrise.io/marketing',
    scheme: 'piramid',
    publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
    screenshotDatas: []
  }
];

export const mockAppVersion = mockAppVersions[0];
export const mockAppVersionWithoutPublicPage = {
  id: '123',
  appSlug: 'app-slug-123',
  version: '1.0.3',
  platform: 'ios',
  buildNumber: 32,
  buildSlug: '13245ads',
  lastUpdate: new Date('2018-09-22T12:42:31Z'),
  description: 'Some semi-long description',
  whatsNew: 'Some longer whats-new',
  minimumOs: '10.2',
  minimumSdk: 'dunno',
  packageName: 'com.package.name',
  bundleId: 'bundle-id',
  supportedDeviceTypes: ['iphone', 'ipad'],
  distributionType: 'development',
  iconUrl: 'http://placekitten.com/160/160',
  appName: 'Standup Timer',
  promotionalText: 'Promotional Text',
  keywords: 'Keywords',
  reviewNotes: 'Review Notes',
  supportUrl: 'https://bitrise.io/support',
  marketingUrl: 'https://bitrise.io/marketing',
  scheme: 'piramid',
  publicInstallPageURL: undefined,
  screenshotDatas: []
};

export const mockAndroidAppVersion = {
  id: '123',
  appSlug: 'app-slug-123',
  version: '1.0.3',
  platform: 'android',
  buildNumber: 32,
  buildSlug: '13245ads',
  lastUpdate: new Date('2018-09-22T12:42:31Z'),
  shortDescription: 'Some short description',
  description: 'Some semi-long description',
  whatsNew: 'Some longer whats-new',
  versionCode: '165161631',
  minimumSdk: '26',
  packageName: 'com.package.name',
  supportedDeviceTypes: ['phone', 'tablet', 'android-tv', 'wear-os'],
  iconUrl: 'http://placekitten.com/160/160',
  appName: 'Standup Timer',
  supportUrl: 'https://bitrise.io/support',
  marketingUrl: 'https://bitrise.io/marketing',
  module: 'Celeste-config',
  variant: 'Fennek',
  buildType: 'Celeste-config',
  publicInstallPageURL: 'https://bitrise.io/app/8b334705d8e78276',
  screenshotDatas: []
};

export const mockTestDevices: TestDevice[] = [
  { deviceId: 'some-device-id-01', deviceType: 'ios', owner: 'test-user-1' },
  { deviceId: 'some-device-id-02', deviceType: 'android', owner: 'test-user-1' },
  { deviceId: 'some-device-id-03', deviceType: 'ios', owner: 'test-user-2' }
];

const provProfiles = [
  { name: 'abcdefghijkl1234567', slug: 'prov-profile-1' },
  { name: 'abcdefghijkl12345671566', slug: 'prov-profile-2' }
];
const certificates = [
  { name: 'iPhone Developer: John Doe (ABCD1234)', slug: 'cert-1' },
  { name: 'iPhone Developer: John Doe (ABCD5678)', slug: 'cert-2' }
];
const keystoreFiles = [
  { name: 'abcdefghijkl1234567', slug: 'keystore-1' },
  { name: 'abcdefghijkl12345671566', slug: 'keystore-2' }
];
const serviceAccountJsonFiles = [
  { name: 'abcdefghijkl1234567', slug: 'service-accoun-1' },
  { name: 'abcdefghijkl12345671566', slug: 'service-accoun-2' }
];

export const mockSettings: Settings = {
  projectType: 'other',
  iosWorkflow: 'All',
  androidWorkflow: 'All',
  iosSettings: {
    appleDeveloperAccountEmail: 'Fill',
    appSku: 'Fill',
    appSpecificPassword: 'Fill',
    selectedAppStoreProvisioningProfile: provProfiles[0].slug,
    selectedCodeSigningIdentity: certificates[1].slug,
    includeBitCode: true
  },
  androidSettings: {
    track: 'Release',
    selectedKeystoreFile: keystoreFiles[0].slug,
    selectedServiceAccount: serviceAccountJsonFiles[1].slug
  },
  provProfiles,
  certificates,
  keystoreFiles,
  serviceAccountJsonFiles
};

export const mockFinishedAppVersionEvent: AppVersionEvent = {
  id: '1234',
  status: AppVersionEventStatus.Success,
  text: 'Event finished successfully!',
  createdAtTimestamp: new Date('2018-09-20T12:42:31Z').getTime(),
  createdAt: new Date('2018-09-20T12:42:31Z'),
  updatedAtTimestamp: new Date('2018-09-21T12:42:31Z').getTime(),
  updatedAt: new Date('2018-09-21T12:42:31Z'),
  logDownloadUrl: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg'
};

export const mockInProgressAppVersionEvent: AppVersionEvent = {
  id: '1234',
  status: AppVersionEventStatus.InProgress,
  text: 'Doing something...',
  createdAtTimestamp: new Date('2018-09-22T12:42:31Z').getTime(),
  createdAt: new Date('2018-09-22T12:42:31Z'),
  updatedAtTimestamp: new Date('2018-09-25T12:42:31Z').getTime(),
  updatedAt: new Date('2018-09-25T12:42:31Z'),
  logDownloadUrl: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg'
};

export const mockFailedAppVersionEvent: AppVersionEvent = {
  id: '1234',
  status: AppVersionEventStatus.Failed,
  text: 'An error occured.',
  createdAtTimestamp: new Date('2018-09-26T12:42:31Z').getTime(),
  createdAt: new Date('2018-09-26T12:42:31Z'),
  updatedAtTimestamp: new Date('2018-09-27T12:42:31Z').getTime(),
  updatedAt: new Date('2018-09-27T12:42:31Z'),
  logDownloadUrl: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg'
};

export const mockAppVersionEvents: AppVersionEvent[] = [
  mockFinishedAppVersionEvent,
  mockInProgressAppVersionEvent,
  mockFailedAppVersionEvent
];

export const mockApp: App = {
  appSlug: 'test-app-slug-1',
  title: 'Awesome app',
  avatarUrl:
    'https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/repositories/0dbc45647ce84cb9/avatar/avatar.png',
  plan: 'gold',
  projectType: 'other'
};

export const mockUploadedScreenshotResponse: ScreenshotResponse = {
  createdAt: new Date('2018-09-26T12:42:31Z'),
  deviceType: 'iPhone 6.5”',
  downloadUrl: 'https://www.bitrise.io/assets/svg/logo-bitrise.svg',
  filename: 'screenshot-1.jpg',
  filesize: 1000,
  id: 'test-id-1',
  screenSize: '1024x768',
  updatedAt: new Date('2018-09-27T12:42:31Z'),
  uploaded: true
};

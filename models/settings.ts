export const AppSettingsPageTabs = ['general', 'notifications'];

export type AppSettingsPageQuery = {
  appSlug: string;
  selectedTab?: typeof AppSettingsPageTabs[number];
};

export type IosSettings = {
  artifactExposingWorkflows: string;
  appleDeveloperAccountEmail: string;
  appSku: string;
  appSpecificPassword: string;
  selectedProvProfile: any;
  selectedCertificate: any;
};

export type AndroidSettings = {
  artifactExposingWorkflows: string;
  track: string;
  selectedKeystoreFile: any;
  selectedServiceAccountJsonFile: any;
};

export type ProvProfile = { name: string };
export type Certificate = { name: string };
export type KeystoreFile = { name: string };
export type ServiceAccountJsonFile = { name: string };

export type Settings = {
  iosSettings?: IosSettings;
  androidSettings?: AndroidSettings;
  provProfiles?: ProvProfile[];
  certificates?: Certificate[];
  keystoreFiles?: KeystoreFile[];
  serviceAccountJsonFiles?: ServiceAccountJsonFile[];
  projectType:
    | 'xamarin'
    | 'ios'
    | 'osx'
    | 'macos'
    | 'android'
    | 'cordova'
    | 'ionic'
    | 'react-native'
    | 'flutter'
    | 'other';
};

export type AppContact = {
  id: string;
  email: string;
  isConfirmed: boolean;
  notificationPreferences: {
    newVersion: boolean;
    successfulPublish: boolean;
    failedPublish: boolean;
  };
  isMarkedForDelete?: boolean;
};

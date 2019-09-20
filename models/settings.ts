import { ProjectType } from './app';

export const AppSettingsPageTabs = ['general', 'notifications'];

export type AppSettingsPageQuery = {
  appSlug: string;
  selectedTab?: typeof AppSettingsPageTabs[number];
};

export type IosSettings = {
  appleDeveloperAccountEmail: string;
  appSku: string;
  appSpecificPassword: string;
  selectedAppStoreProvisioningProfile: string;
  selectedCodeSigningIdentity: string;
  includeBitCode: boolean;
};

export type AndroidSettings = {
  track: string;
  module: string;
  selectedKeystoreFile: string;
  selectedServiceAccount: string;
};

export type CodeSigningFile = { name: string; slug: string };
export interface Certificate extends CodeSigningFile {}
export interface ProvProfile extends CodeSigningFile {}
export interface KeystoreFile extends CodeSigningFile {}
export interface ServiceAccountJsonFile extends CodeSigningFile {}

export type Settings = {
  iosWorkflow: string;
  androidWorkflow: string;
  iosSettings?: IosSettings;
  androidSettings?: AndroidSettings;
  provProfiles?: ProvProfile[];
  certificates?: Certificate[];
  keystoreFiles?: KeystoreFile[];
  serviceAccountJsonFiles?: ServiceAccountJsonFile[];
  projectType?: ProjectType;
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
  isMarkedForUpdate?: boolean;
  confirmedAt?: string;
};

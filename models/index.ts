import { NextContext } from 'next';
import { Store } from 'redux';
import { Request } from 'express';

export type AppVersionProps = {
  appSlug: string;
  versionId: string;
};

export const AppVersionPageTabs = ['details', 'devices', 'test', 'activity'];
export const AppSettingsPageTabs = ['general'];
export const MaximumNumberOfCertificates = 30;

export type AppVersionPageQuery = AppVersionProps & {
  isPublic?: string;
  selectedTab?: typeof AppVersionPageTabs[number];
};

export type AppSettingsPageQuery = AppVersionProps & {
  selectedTab?: typeof AppSettingsPageTabs[number];
};

export type AppPageQuery = {
  appSlug: string;
};

export type AppVersion = {
  id: number | string;
  appSlug: string;
  version: string;
  platform: string;
  buildNumber: number;
  buildSlug: string;
  lastUpdate: Date;
  shortDescription?: string;
  description: string;
  whatsNew: string;
  versionCode?: string;
  minimumOs?: string;
  minimumSdk?: string;
  packageName?: string;
  certificateExpires: Date;
  bundleId?: string;
  size: number;
  supportedDeviceTypes: string[];
  distributionType?: string;
  iconUrl: string;
  appName: string;
  promotionalText?: string;
  keywords?: string;
  reviewNotes?: string;
  supportUrl?: string;
  marketingUrl?: string;
  scheme?: string;
  configuration?: string;
  module?: string;
  variant?: string;
  buildType?: string;
  publicInstallPageURL?: string;
};

export class ProvProfile {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class Certificate {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class KeystoreFile {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class ServiceAccountJsonFile {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

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

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

export type Platform = 'ios' | 'android';

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
  versionCode?: string,
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
  module?: string,
  variant?: string,
  buildType?: string,
  publicInstallPageURL?: string;
};

export type ProvProfile = {
  name: string;
}

export type Certificate = {
  name: string;
}

export type KeystoreFile = {
  name: string;
}

export type ServiceAccountJsonFile = {
  name: string;
}

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

export type Platform = 'ios' | 'android';

import { NextContext } from 'next';
import { Store } from 'redux';
import { Request } from 'express';

export type AppVersionProps = {
  appSlug: string;
  versionId: string;
};

export const AppVersionPageTabs = ['details', 'devices', 'test', 'activity'];

export type AppVersionPageQuery = AppVersionProps & {
  isPublic?: string;
  selectedTab?: typeof AppVersionPageTabs[number];
};

export type AppPageQuery = {
  appSlug: string;
};

export type AppVersion = {
  id: number;
  appSlug: string;
  version: string;
  platform: string;
  buildNumber: number;
  buildSlug: string;
  lastUpdate: Date;
  description: string;
  whatsNew: string;
  minimumOs: string;
  minimumSdk: string;
  packageName: string;
  certificateExpires: Date;
  bundleId: string;
  size: number;
  supportedDeviceTypes: string[];
  distributionType: string;
  iconUrl: string;
  appName: string;
  promotionalText: string;
  keywords: string;
  reviewNotes: string;
  supportUrl: string;
  marketingUrl: string;
  scheme: string;
  configuration: string;
  publicInstallPageURL?: string;
};

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

export type Platform = 'ios' | 'android';

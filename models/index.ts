import { NextContext } from 'next';
import { Store } from 'redux';

export type VersionPageQuery = {
  appSlug: string;
  versionId: string;
  isPublic?: string;
};

export type AppVersion = {
  id: number;
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
};

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
}

import { NextContext } from 'next';
import { Store } from 'redux';
import { Request } from 'express';

export type AppVersionProps = {
  appSlug: string;
  versionId: string;
};

export const AppVersionPageTabs = ['details', 'devices', 'qa', 'activity'];

export const MaximumNumberOfCertificates = 30;

export type AppVersionPageQuery = AppVersionProps & {
  isPublic?: string;
  selectedTab?: typeof AppVersionPageTabs[number];
};

export type AppPageQuery = {
  appSlug: string;
};

export type AppVersion = {
  id: string;
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
  screenshotDatas: ScreenshotResponse[];
};

export type ScreenshotResponse = {
  createdAt: Date;
  deviceType: string;
  downloadUrl: string;
  filename: string;
  filesize: number;
  id: string;
  screenSize: string;
  updatedAt: Date;
  uploaded: boolean;
};

export class Screenshot {
  constructor(id: string, name: string, content: any, size?: number, deviceType?: string) {
    this.id = id;
    this.name = name;
    if (typeof content === 'string') {
      this.src = content;
    } else {
      this.file = content;
    }
    this.size = size || 0;
    this.deviceType = deviceType;
  }

  id: string;
  name: string;
  src?: string;
  file?: any;
  size?: number;
  deviceType?: string;

  type(): 'uploaded' | 'pending' {
    return this.src ? 'uploaded' : 'pending';
  }

  url() {
    if (this.src) {
      return this.src as string;
    }

    return URL.createObjectURL(this.file);
  }
}

export type AppVersionEvent = {
  id: string;
  status: 'in-progress' | 'finished' | 'failed';
  text: string;
  createdAt: number | Date;
  updatedAt: number | Date;
  logDownloadUrl: string;
};

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

export type Platform = 'ios' | 'android';

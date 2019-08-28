import { NextContext } from 'next';
import { Store } from 'redux';
import { Request } from 'express';

import { ScreenshotResponse, UploadableResponse } from './uploadable';

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
  featureGraphicData?: UploadableResponse;
};

export class FeatureGraphic {
  constructor(id: string, name: string, content: string | File, size?: number) {
    this.id = id;
    this.name = name;
    this.size = size || 0;
    if (typeof content === 'string') {
      this.src = content;
    } else {
      this.file = content;
    }
  }

  id: string;
  name: string;
  src?: string;
  file?: any;
  size?: number;

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

export class Screenshot extends FeatureGraphic {
  deviceType?: string;

  constructor(id: string, name: string, content: any, size?: number, deviceType?: string) {
    super(id, name, content, size);

    this.deviceType = deviceType;
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

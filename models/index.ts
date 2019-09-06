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
  bundleId?: string;
  supportedDeviceTypes: string[];
  distributionType?: DistributionType;
  iconUrl: string;
  appName: string;
  promotionalText?: string;
  keywords?: string;
  reviewNotes?: string;
  supportUrl?: string;
  marketingUrl?: string;
  scheme?: string;
  module?: string;
  variant?: string;
  buildType?: string;
  publicInstallPageURL?: string;
  screenshotDatas: ScreenshotResponse[];
  featureGraphicData?: UploadableResponse;
};

class ImageAsset {
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

export class FeatureGraphic extends ImageAsset {}

export class Screenshot extends ImageAsset {
  deviceType?: string;

  constructor(id: string, name: string, content: any, size?: number, deviceType?: string) {
    super(id, name, content, size);

    this.deviceType = deviceType;
  }
}

export type AppVersionEvent = {
  id: string;
  status: AppVersionEventStatus;
  text: string;
  createdAtTimestamp: number;
  createdAt: Date;
  updatedAtTimestamp: number | null;
  updatedAt: Date | null;
  logDownloadUrl: string;
};

export enum AppVersionEventStatus {
  InProgress = 'in_progress',
  Failed = 'failed',
  Success = 'success'
}

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

export type Platform = 'ios' | 'android';

export type DistributionType = 'app-store' | 'development' | 'enterprise' | 'ad-hoc';

import { NextContext } from "next";
import { Store } from "redux";
import { Request } from "express";
import { string } from "prop-types";

export type AppVersionProps = {
  appSlug: string;
  versionId: string;
};

export const AppVersionPageTabs = ["details", "devices", "test", "activity"];

export type AppVersionPageQuery = AppVersionProps & {
  isPublic?: string;
  selectedTab?: typeof AppVersionPageTabs[number];
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
  publicInstallPageURL: string;
};

export interface PageContext extends NextContext {
  store: Store;
  isServer: boolean;
  req: Request;
}

import { AppVersion } from "@/models";
import { TestDevice } from "@/models/test-device";

export const mockAppVersion: AppVersion = {
  id: 123,
  version: "1.0.3",
  platform: "ios",
  buildNumber: 32,
  buildSlug: "13245ads",
  lastUpdate: new Date("2018-09-22T12:42:31Z"),
  description: "Some semi-long description",
  whatsNew: "Some longer whats-new",
  minimumOs: "10.2",
  minimumSdk: "dunno",
  packageName: "com.package.name",
  certificateExpires: new Date("2018-09-22T12:42:31Z"),
  bundleId: "bundle-id",
  size: 4567034,
  supportedDeviceTypes: ["iphone", "ipad"],
  distributionType: "development",
  iconUrl: "http://placekitten.com/160/160",
  appName: "Standup Timer",
  promotionalText: "Promotional Text",
  keywords: "Keywords",
  reviewNotes: "Review Notes",
  supportUrl: "https://bitrise.io/support",
  marketingUrl: "https://bitrise.io/marketing",
  scheme: "piramid",
  configuration: "canary",
  publicInstallPageURL: "https://bitrise.io/app/8b334705d8e78276"
};

export const mockTestDevices: TestDevice[] = [
  { deviceId: "some-device-id-01", deviceType: "ios", owner: "test-user-1" },
  {
    deviceId: "some-device-id-02",
    deviceType: "android",
    owner: "test-user-1"
  },
  { deviceId: "some-device-id-03", deviceType: "ios", owner: "test-user-2" }
];

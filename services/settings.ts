import { AppVersion, IosSettings, AndroidSettings } from '@/models';

export class SettingsService {
  constructor() {}

  isComplete = (
    appVersion: AppVersion,
    { iosSettings, androidSettings }: { iosSettings: IosSettings; androidSettings: AndroidSettings }
  ) => {
    switch (appVersion.platform) {
      case 'ios': {
        return !!(
          iosSettings.artifactExposingWorkflows &&
          iosSettings.appleDeveloperAccountEmail &&
          iosSettings.appSku &&
          iosSettings.appSpecificPassword &&
          iosSettings.selectedProvProfile &&
          iosSettings.selectedCertificate
        );
      }
      case 'android': {
        return !!(
          androidSettings.artifactExposingWorkflows &&
          androidSettings.track &&
          androidSettings.selectedKeystoreFile &&
          androidSettings.selectedServiceAccountJsonFile
        );
      }
    }

    return false;
  };
}

export default new SettingsService();

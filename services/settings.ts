import { AppVersion, IosSettings, AndroidSettings } from '@/models';

export class SettingsService {
  constructor() {}

  isComplete = (
    appVersion: AppVersion,
    { iosSettings, androidSettings }: { iosSettings: IosSettings; androidSettings: AndroidSettings }
  ) => {
    switch (appVersion.platform) {
      case 'ios': {
        return ![
          'artifactExposingWorkflows',
          'appleDeveloperAccountEmail',
          'appSku',
          'appSpecificPassword',
          'selectedProvProfile',
          'selectedCertificate'
        ].find(key => !iosSettings[key]);
      }
      case 'android': {
        return ![
          'artifactExposingWorkflows',
          'track',
          'selectedKeystoreFile',
          'selectedServiceAccountJsonFile'
        ].find(key => !androidSettings[key]);
      }
    }

    return true;
  };
}

export default new SettingsService();

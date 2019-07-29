import { AppVersion } from '@/models';
import { IosSettings, AndroidSettings } from '@/models/settings';

export class SettingsService {
  constructor() {}

  isComplete = (
    appVersion: AppVersion,
    { iosSettings, androidSettings }: { iosSettings: IosSettings; androidSettings: AndroidSettings }
  ) => {
    switch (appVersion.platform) {
      case 'ios': {
        return ![
          'appleDeveloperAccountEmail',
          'appSku',
          'appSpecificPassword',
          'selectedAppStoreProvisioningProfile',
          'selectedCodeSigningIdentity',
          'includeBitCode'
        ].find(key => !iosSettings[key]);
      }
      case 'android': {
        return !['track', 'selectedKeystoreFile', 'selectedServiceAccount'].find(key => !androidSettings[key]);
      }
    }

    return true;
  };
}

export default new SettingsService();

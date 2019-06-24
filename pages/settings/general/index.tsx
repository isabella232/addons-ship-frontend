import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import {
  MaximumNumberOfCertificates,
  AppVersion,
  ProvProfile,
  Certificate,
  KeystoreFile,
  ServiceAccountJsonFile,
  IosSettings,
  AndroidSettings
} from '@/models';

import View from './view';

type Props = {
  appVersion: AppVersion;
};

type State = {
  showTooltips: boolean;
  iosSettings: IosSettings;
  savedIosSettings: IosSettings;
  androidSettings: AndroidSettings;
  savedAndroidSettings: AndroidSettings;
  provProfiles: ProvProfile[];
  certificates: Certificate[];
  keystoreFiles: KeystoreFile[];
  serviceAccountJsonFiles: ServiceAccountJsonFile[];
};

export class General extends Component<Props> {
  state: State = {
    showTooltips: false,
    iosSettings: {
      artifactExposingWorkflows: '',
      appleDeveloperAccountEmail: '',
      appSku: '',
      appSpecificPassword: '',
      selectedProvProfile: null,
      selectedCertificate: null
    },
    savedIosSettings: {
      artifactExposingWorkflows: '',
      appleDeveloperAccountEmail: '',
      appSku: '',
      appSpecificPassword: '',
      selectedProvProfile: null,
      selectedCertificate: null
    },
    androidSettings: {
      artifactExposingWorkflows: '',
      track: '',
      selectedKeystoreFile: null,
      selectedServiceAccountJsonFile: null
    },
    savedAndroidSettings: {
      artifactExposingWorkflows: '',
      track: '',
      selectedKeystoreFile: null,
      selectedServiceAccountJsonFile: null
    },
    provProfiles: [],
    certificates: [],
    keystoreFiles: [],
    serviceAccountJsonFiles: []
  };

  componentDidMount() {
    const provProfiles = [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }];
    const certificates = [
      { name: 'iPhone Developer: John Doe (ABCD12345678)' },
      { name: 'iPhone Developer: John Doe (ABCD12345678)' }
    ];
    const keystoreFiles = [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }];
    const serviceAccountJsonFiles = [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }];

    this.setState({
      showTooltips: true,
      provProfiles: provProfiles,
      certificates: certificates,
      keystoreFiles: keystoreFiles,
      serviceAccountJsonFiles: serviceAccountJsonFiles
    });

    this.setState({
      iosSettings: {
        artifactExposingWorkflows: 'All',
        appleDeveloperAccountEmail: 'Fill',
        appSku: 'Fill',
        appSpecificPassword: 'Fill',
        selectedProvProfile: provProfiles[0],
        selectedCertificate: certificates[1]
      },
      savedIosSettings: {
        artifactExposingWorkflows: 'All',
        appleDeveloperAccountEmail: 'Fill',
        appSku: 'Fill',
        appSpecificPassword: 'Fill',
        selectedProvProfile: provProfiles[0],
        selectedCertificate: certificates[1]
      },
      androidSettings: {
        artifactExposingWorkflows: 'All',
        track: 'Release',
        selectedKeystoreFile: keystoreFiles[0],
        selectedServiceAccountJsonFile: serviceAccountJsonFiles[1]
      },
      savedAndroidSettings: {
        artifactExposingWorkflows: 'All',
        track: 'Release',
        selectedKeystoreFile: keystoreFiles[0],
        selectedServiceAccountJsonFile: serviceAccountJsonFiles[1]
      }
    });
  }

  onSettingsPropertyChange = (settings: 'iosSettings' | 'androidSettings', settingsProperty: string, value: string) => {
    let updatedSettings = {};
    updatedSettings[settings] = { ...this.state[settings] };
    updatedSettings[settings][settingsProperty] = value;
    this.setState(updatedSettings);
  };

  onSelectedFileChange = (
    type: 'ProvProfile' | 'Certificate' | 'KeystoreFile' | 'ServiceAccountJsonFile',
    file: ProvProfile | Certificate | KeystoreFile | ServiceAccountJsonFile
  ) => {
    if (type === 'ProvProfile') {
      this.setState({ iosSettings: { ...this.state.iosSettings, selectedProvProfile: file } });
    } else if (type === 'Certificate') {
      this.setState({ iosSettings: { ...this.state.iosSettings, selectedCertificate: file } });
    } else if (type === 'KeystoreFile') {
      this.setState({ androidSettings: { ...this.state.androidSettings, selectedKeystoreFile: file } });
    } else if (type === 'ServiceAccountJsonFile') {
      this.setState({ androidSettings: { ...this.state.androidSettings, selectedServiceAccountJsonFile: file } });
    }
  };

  onCancel = () => {
    this.setState({ iosSettings: this.state.savedIosSettings });
    this.setState({ androidSettings: this.state.savedAndroidSettings });
  };

  onSave = () => {};

  render() {
    const { appVersion } = this.props;
    const {
      showTooltips,
      iosSettings,
      androidSettings,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles
    } = this.state;

    const viewProps = {
      maximumNumberOfCertificates: MaximumNumberOfCertificates,
      appVersion,
      showTooltips,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles,
      iosSettings,
      androidSettings,
      onSettingsPropertyChange: this.onSettingsPropertyChange,
      onSelectedFileChange: this.onSelectedFileChange,
      onCancel: this.onCancel,
      onSave: this.onSave
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });

export default connect(mapStateToProps)(General as any);

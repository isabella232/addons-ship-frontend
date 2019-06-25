import { Component } from 'react';
import { connect } from 'react-redux';
import { get, isEqual } from 'lodash';

import { RootState } from '@/store';
import {
  MaximumNumberOfCertificates,
  AppVersion,
  ProvProfile,
  Certificate,
  KeystoreFile,
  ServiceAccountJsonFile,
  IosSettings,
  AndroidSettings,
  Settings
} from '@/models';

import View from './view';
import { updateSettings } from '@/ducks/settings';

type Props = {
  appVersion: AppVersion;
  settings: Settings;
  updateSettings: typeof updateSettings;
};

type State = {
  showTooltips: boolean;
  iosSettings: IosSettings;
  androidSettings: AndroidSettings;
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
    androidSettings: {
      artifactExposingWorkflows: '',
      track: '',
      selectedKeystoreFile: null,
      selectedServiceAccountJsonFile: null
    }
  };

  componentDidMount() {
    this.setState({
      showTooltips: true
    });

    this.configureSettingsFromProps();
  }

  configureSettingsFromProps() {
    const selectedProvProfile = get(this.props.settings, 'provProfiles', []).find(provProfile =>
      isEqual(get(this.props, 'settings.iosSettings.selectedProvProfile', undefined), provProfile)
    );
    const selectedCertificate = get(this.props.settings, 'certificates', []).find(certificate =>
      isEqual(get(this.props, 'settings.iosSettings.selectedCertificate', undefined), certificate)
    );
    const selectedKeystoreFile = get(this.props.settings, 'keystoreFiles', []).find(keystoreFile =>
      isEqual(get(this.props, 'settings.androidSettings.selectedKeystoreFile', undefined), keystoreFile)
    );
    const selectedServiceAccountJsonFile = get(this.props.settings, 'serviceAccountJsonFiles', []).find(
      serviceAccountJsonFile =>
        isEqual(
          get(this.props, 'settings.androidSettings.selectedServiceAccountJsonFile', undefined),
          serviceAccountJsonFile
        )
    );

    this.setState({
      iosSettings: {
        artifactExposingWorkflows: get(this.props, 'settings.iosSettings.artifactExposingWorkflows', undefined),
        appleDeveloperAccountEmail: get(this.props, 'settings.iosSettings.appleDeveloperAccountEmail', undefined),
        appSku: get(this.props, 'settings.iosSettings.appSku', undefined),
        appSpecificPassword: get(this.props, 'settings.iosSettings.appSpecificPassword', undefined),
        selectedProvProfile: selectedProvProfile,
        selectedCertificate: selectedCertificate
      },
      androidSettings: {
        artifactExposingWorkflows: get(this.props, 'settings.androidSettings.artifactExposingWorkflows', undefined),
        track: get(this.props, 'settings.androidSettings.track', undefined),
        selectedKeystoreFile: selectedKeystoreFile,
        selectedServiceAccountJsonFile: selectedServiceAccountJsonFile
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
    this.configureSettingsFromProps();
  };

  onSave = () => {
    const { updateSettings } = this.props;
    const { provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles } = this.props.settings;
    const { iosSettings, androidSettings } = this.state;

    updateSettings({
      iosSettings,
      androidSettings,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles
    } as Settings);
  };

  render() {
    const {
      appVersion,
      settings: { provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles }
    } = this.props;
    const { showTooltips, iosSettings, androidSettings } = this.state;

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

const mapStateToProps = ({ appVersion, settings }: RootState) => ({ appVersion, settings });
const mapDispatchToProps = {
  updateSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General as any);

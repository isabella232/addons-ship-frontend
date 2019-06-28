import { Component } from 'react';
import { connect } from 'react-redux';
import { get, find } from 'lodash';

import { RootState } from '@/store';
import {
  MaximumNumberOfCertificates,
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
  settings: Settings;
  updateSettings: typeof updateSettings;
};

export type State = {
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
    const { settings } = this.props;
    const {
      iosSettings,
      androidSettings,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles
    } = settings;
    const selectedProvProfile = find(provProfiles, get(iosSettings, 'selectedProvProfile'));
    const selectedCertificate = find(certificates, get(iosSettings, 'selectedCertificate'));
    const selectedKeystoreFile = find(keystoreFiles, get(androidSettings, 'selectedKeystoreFile'));
    const selectedServiceAccountJsonFile = find(
      serviceAccountJsonFiles,
      get(androidSettings, 'selectedServiceAccountJsonFile')
    );

    this.setState({
      iosSettings: {
        artifactExposingWorkflows: get(iosSettings, 'artifactExposingWorkflows'),
        appleDeveloperAccountEmail: get(iosSettings, 'appleDeveloperAccountEmail'),
        appSku: get(iosSettings, 'appSku'),
        appSpecificPassword: get(iosSettings, 'appSpecificPassword'),
        selectedProvProfile,
        selectedCertificate
      },
      androidSettings: {
        artifactExposingWorkflows: get(androidSettings, 'artifactExposingWorkflows'),
        track: get(androidSettings, 'track'),
        selectedKeystoreFile,
        selectedServiceAccountJsonFile
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
    switch (type) {
      case 'ProvProfile': {
        this.setState({ iosSettings: { ...this.state.iosSettings, selectedProvProfile: file } });
        break;
      }
      case 'Certificate': {
        this.setState({ iosSettings: { ...this.state.iosSettings, selectedCertificate: file } });
        break;
      }
      case 'KeystoreFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedKeystoreFile: file } });
        break;
      }
      case 'ServiceAccountJsonFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedServiceAccountJsonFile: file } });
        break;
      }
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
      settings: { provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles }
    } = this.props;
    const { showTooltips, iosSettings, androidSettings } = this.state;

    const viewProps = {
      maximumNumberOfCertificates: MaximumNumberOfCertificates,
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

const mapStateToProps = ({ settings }: RootState) => ({ settings });
const mapDispatchToProps = {
  updateSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(General as any);

import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { MaximumNumberOfCertificates, Platform } from '@/models';
import {
  ProvProfile,
  Certificate,
  KeystoreFile,
  ServiceAccountJsonFile,
  IosSettings,
  AndroidSettings,
  Settings
} from '@/models/settings';
import { updateSettings } from '@/ducks/settings';

import View from './view';

type Props = {
  appSlug: string;
  settings: Settings;
  updateSettings: typeof updateSettings;
};

export type State = {
  hasMounted: boolean;
  hasIosSettings: boolean;
  hasAndroidSettings: boolean;
  iosSettings: IosSettings;
  androidSettings: AndroidSettings;
  iosWorkflow: string;
  androidWorkflow: string;
};

export class General extends Component<Props> {
  state: State = {
    iosWorkflow: '',
    androidWorkflow: '',
    hasIosSettings: false,
    hasAndroidSettings: false,
    hasMounted: false,
    iosSettings: {
      appleDeveloperAccountEmail: '',
      appSku: '',
      appSpecificPassword: '',
      selectedAppStoreProvisioningProfile: '',
      selectedCodeSigningIdentity: '',
      includeBitCode: true
    },
    androidSettings: {
      track: '',
      selectedKeystoreFile: '',
      selectedServiceAccount: ''
    }
  };

  componentDidMount() {
    this.setState({
      hasMounted: true
    });

    this.configureSettingsFromProps();
  }

  configureSettingsFromProps() {
    const {
      settings: { iosWorkflow, androidWorkflow, iosSettings, androidSettings, projectType }
    } = this.props;

    let hasIosSettings = false,
      hasAndroidSettings = false;
    switch (projectType) {
      case 'ios':
        hasIosSettings = true;
        break;
      case 'android':
        hasAndroidSettings = true;
        break;
      default:
        hasIosSettings = true;
        hasAndroidSettings = true;
    }

    this.setState({
      hasIosSettings,
      hasAndroidSettings,
      iosWorkflow,
      androidWorkflow,
      iosSettings,
      androidSettings
    });
  }

  onSettingsPropertyChange = (key: 'iosSettings' | 'androidSettings', settingsProperty: string, value: string) => {
    this.setState({
      [key]: {
        ...this.state[key],
        [settingsProperty]: value
      }
    });
  };

  onWorkflowChange = (platform: Platform, workflow: string) => {
    if (platform === 'android') {
      this.setState({ androidWorkflow: workflow });
    } else if (platform === 'ios') {
      this.setState({ iosWorkflow: workflow });
    }
  };

  onSelectedFileChange = (
    type: 'ProvProfile' | 'Certificate' | 'KeystoreFile' | 'ServiceAccountJsonFile',
    { name }: ProvProfile | Certificate | KeystoreFile | ServiceAccountJsonFile
  ) => {
    switch (type) {
      case 'ProvProfile': {
        this.setState({ iosSettings: { ...this.state.iosSettings, selectedAppStoreProvisioningProfile: name } });
        break;
      }
      case 'Certificate': {
        this.setState({ iosSettings: { ...this.state.iosSettings, selectedCodeSigningIdentity: name } });
        break;
      }
      case 'KeystoreFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedKeystoreFile: name } });
        break;
      }
      case 'ServiceAccountJsonFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedServiceAccount: name } });
        break;
      }
    }
  };

  onCancel = () => {
    this.configureSettingsFromProps();
  };

  onSave = () => {
    const { appSlug, updateSettings } = this.props;
    const { iosWorkflow, androidWorkflow, iosSettings, androidSettings } = this.state;

    updateSettings(appSlug, { iosWorkflow, androidWorkflow, iosSettings, androidSettings } as Settings);
  };

  render() {
    const {
      appSlug,
      settings: { provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles }
    } = this.props;

    const viewProps = {
      appSlug,
      ...this.state,
      maximumNumberOfCertificates: MaximumNumberOfCertificates,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles,
      onSettingsPropertyChange: this.onSettingsPropertyChange,
      onSelectedFileChange: this.onSelectedFileChange,
      onWorkflowChange: this.onWorkflowChange,
      onCancel: this.onCancel,
      onSave: this.onSave
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ settings: { settings } }: RootState) => ({ settings });
const mapDispatchToProps = {
  updateSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(General);

import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { MaximumNumberOfCertificates, Platform } from '@/models';
import {
  Certificate,
  KeystoreFile,
  ServiceAccountJsonFile,
  IosSettings,
  AndroidSettings,
  Settings
} from '@/models/settings';
import { updateSettings, fetchSettings } from '@/ducks/settings';

import View from './view';
import some from 'lodash/some';
import isEqual from 'lodash/isEqual';

type Props = {
  appSlug: string;
  settings: Settings;
  updateSettings: typeof updateSettings;
  fetchSettings: typeof fetchSettings;
  hasLoaded: boolean;
  isSaving?: boolean;
};

export type State = {
  hasMounted: boolean;
  hasModifications: boolean;
  hasIosSettings: boolean;
  hasAndroidSettings: boolean;
  iosSettings: IosSettings;
  androidSettings: AndroidSettings;
  iosWorkflow: string;
  androidWorkflow: string;
};

export class General extends Component<Props> {
  static displayName = 'GeneralSettings';
  state: State = {
    iosWorkflow: '',
    androidWorkflow: '',
    hasIosSettings: false,
    hasAndroidSettings: false,
    hasMounted: false,
    hasModifications: false,
    iosSettings: {
      appleDeveloperAccountEmail: '',
      appSku: '',
      appSpecificPassword: '',
      selectedAppStoreProvisioningProfiles: [],
      selectedCodeSigningIdentity: '',
      includeBitCode: true
    },
    androidSettings: {
      track: '',
      selectedKeystoreFile: '',
      selectedServiceAccount: '',
      module: ''
    }
  };

  componentDidMount() {
    const { appSlug, fetchSettings, hasLoaded } = this.props;
    this.setState({
      hasMounted: true
    });

    if (hasLoaded) {
      this.configureSettingsFromProps();
    }

    fetchSettings(appSlug);
  }

  componentDidUpdate({ hasLoaded, isSaving }: Props) {
    if ((!hasLoaded && this.props.hasLoaded) || (isSaving && !this.props.isSaving)) {
      this.configureSettingsFromProps();
    }

    if (this.props.hasLoaded) {
      this.updateHasModifications();
    }
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

  updateHasModifications = () => {
    let hasModifications = false;

    if (
      some(
        ['iosSettings', 'androidSettings'],
        (platformSettingsKey: string) =>
          !isEqual(this.state[platformSettingsKey], this.props.settings[platformSettingsKey])
      )
    ) {
      hasModifications = true;
    }

    if (this.state.iosWorkflow !== this.props.settings.iosWorkflow) {
      hasModifications = true;
    }
    if (this.state.androidWorkflow !== this.props.settings.androidWorkflow) {
      hasModifications = true;
    }

    if (this.state.hasModifications !== hasModifications) {
      this.setState({ hasModifications });
    }
  };

  onSelectedFileChange = (
    type: 'Certificate' | 'KeystoreFile' | 'ServiceAccountJsonFile',
    { slug }: Certificate | KeystoreFile | ServiceAccountJsonFile
  ) => {
    switch (type) {
      case 'Certificate': {
        this.setState({ iosSettings: { ...this.state.iosSettings, selectedCodeSigningIdentity: slug } });
        break;
      }
      case 'KeystoreFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedKeystoreFile: slug } });
        break;
      }
      case 'ServiceAccountJsonFile': {
        this.setState({ androidSettings: { ...this.state.androidSettings, selectedServiceAccount: slug } });
        break;
      }
    }
  };

  toggleProvProfile = (slug: string) => {
    const {
      iosSettings: { selectedAppStoreProvisioningProfiles: prevProvProfiles }
    } = this.state;

    let selectedAppStoreProvisioningProfiles;

    if (prevProvProfiles.includes(slug)) {
      selectedAppStoreProvisioningProfiles = prevProvProfiles.filter(_slug => _slug !== slug);
    } else {
      selectedAppStoreProvisioningProfiles = prevProvProfiles.concat(slug);
    }

    this.setState({ iosSettings: { ...this.state.iosSettings, selectedAppStoreProvisioningProfiles } });
  };

  onCancel = () => {
    this.configureSettingsFromProps();
  };

  onSave = () => {
    const { appSlug, updateSettings } = this.props;
    const { iosWorkflow, androidWorkflow, iosSettings, androidSettings } = this.state;

    updateSettings(appSlug, { iosWorkflow, androidWorkflow, iosSettings, androidSettings } as Settings);

    this.setState({ hasModifications: false });
  };

  render() {
    const {
      appSlug,
      settings: { provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles },
      hasLoaded,
      isSaving
    } = this.props;

    const { hasModifications } = this.state;

    const viewProps = {
      appSlug,
      hasLoaded,
      ...this.state,
      maximumNumberOfCertificates: MaximumNumberOfCertificates,
      provProfiles,
      certificates,
      keystoreFiles,
      serviceAccountJsonFiles,
      onSettingsPropertyChange: this.onSettingsPropertyChange,
      onSelectedFileChange: this.onSelectedFileChange,
      onWorkflowChange: this.onWorkflowChange,
      onCancel: hasModifications ? this.onCancel : undefined,
      onSave: hasModifications ? this.onSave : undefined,
      toggleProvProfile: this.toggleProvProfile,
      isSaving
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ settings: { settings, isSavingSettings } }: RootState) => ({
  settings,
  isSaving: isSavingSettings,
  hasLoaded: !!settings.iosSettings || !!settings.androidSettings
});
const mapDispatchToProps = {
  updateSettings,
  fetchSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(General);

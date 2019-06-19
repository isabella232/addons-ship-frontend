import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { MaximumNumberOfCertificates, AppVersion, ProvProfile, Certificate, KeystoreFile, ServiceAccountJsonFile } from '@/models';

import View from './view';

type Props = {
  appVersion: AppVersion;
  provProfiles: ProvProfile[];
  certificates: Certificate[];
  keystoreFiles: KeystoreFile[];
  serviceAccountJsonFiles: ServiceAccountJsonFile[];
};

type State = {
  showTooltips: boolean;
  iosSettings: {
    artifactExposingWorkflows: string;
    appleDeveloperAccountEmail: string;
    appSku: string;
    appSpecificPassword: string;
    selectedProvProfile: any;
    selectedCertificate: any;
  };
  androidSettings: {
    artifactExposingWorkflows: string;
    track: string;
    selectedKeystoreFile: any;
    selectedServiceAccountJsonFile: any;
  };
};

export class General extends Component<Props> {
  static defaultProps = {
    provProfiles: [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }],
    certificates: [
      { name: 'iPhone Developer: John Doe (ABCD12345678)' },
      { name: 'iPhone Developer: John Doe (ABCD12345678)' }
    ],
    keystoreFiles: [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }],
    serviceAccountJsonFiles: [{ name: 'abcdefghijkl1234567' }, { name: 'abcdefghijkl12345671566' }]
  };

  state: State = {
    showTooltips: false,
    iosSettings: {
      artifactExposingWorkflows: 'All',
      appleDeveloperAccountEmail: 'Fill',
      appSku: 'Fill',
      appSpecificPassword: 'Fill',
      selectedProvProfile: this.props.provProfiles[0],
      selectedCertificate: this.props.certificates[1]
    },
    androidSettings: {
      artifactExposingWorkflows: 'All',
      track: 'Release',
      selectedKeystoreFile: this.props.keystoreFiles[0],
      selectedServiceAccountJsonFile: this.props.serviceAccountJsonFiles[1]
    }
  };

  componentDidMount() {
    this.setState({ showTooltips: true });
  }

  render() {
    const { appVersion, provProfiles, certificates, keystoreFiles, serviceAccountJsonFiles } = this.props;
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
      androidSettings
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });

export default connect(mapStateToProps)(General as any);

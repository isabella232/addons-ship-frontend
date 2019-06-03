import { Component } from 'react';
import { connect } from 'react-redux';

import { AppVersion } from '@/models';
import { RootState } from '@/store';
import { updateAppVersion } from '@/ducks/appVersion';

import View from './view';

type Props = {
  appVersion: AppVersion;
  updateAppVersion: (appVersion: AppVersion) => Promise<void>;
};

type State = {
  showTooltips: boolean;
  updatedAppVersion: AppVersion | null;
};

export class AppVersionDetails extends Component<Props, State> {
  state: State = {
    showTooltips: false,
    updatedAppVersion: null
  };

  componentDidMount() {
    const { appVersion } = this.props;

    this.setState({ showTooltips: true, updatedAppVersion: appVersion });
  }

  onChange = (key: string, newValue: string) => {
    const { appVersion } = this.props;

    const updatedAppVersion = {
      ...appVersion,
      [key]: newValue
    };

    this.setState({ updatedAppVersion });
  };

  onSave = () => {
    const { updateAppVersion } = this.props;
    const { updatedAppVersion } = this.state;

    updateAppVersion(updatedAppVersion as AppVersion);
  };

  render() {
    const { appVersion } = this.props;
    const { showTooltips } = this.state;

    const viewProps = {
      appVersion,
      showTooltips,
      onChange: this.onChange,
      onSave: this.onSave
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });
const mapDispatchToProps = {
  updateAppVersion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppVersionDetails as any);

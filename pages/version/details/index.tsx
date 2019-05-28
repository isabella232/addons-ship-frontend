import { Component } from 'react';
import { connect } from 'react-redux';

import { AppVersion } from '@/models';
import { RootState } from '@/store';
import View from './view/index';

type Props = {
  appVersion: AppVersion;
};

type State = {
  showTooltips: boolean;
};

export class AppVersionDetails extends Component<Props, State> {
  state: State = {
    showTooltips: false
  };

  componentDidMount() {
    this.setState({ showTooltips: true });
  }

  render() {
    const { appVersion } = this.props;
    const { showTooltips } = this.state;

    const viewProps = {
      appVersion,
      showTooltips
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });

export default connect(mapStateToProps)(AppVersionDetails as any);

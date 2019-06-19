import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { AppVersion } from '@/models';

import View from './view';

type GeneralProps = {
  appVersion: AppVersion;
};

type GeneralState = {
  showTooltips: boolean;
};

export class General extends Component<GeneralProps> {
  state: GeneralState = {
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

export default connect(mapStateToProps)(General as any);

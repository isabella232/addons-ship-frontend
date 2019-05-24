import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import View from './view';

type Props = {
  devices: any[];
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
    const viewProps = {
      devices: ['iphone 5', 'nexus 5']
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });

export default connect(mapStateToProps)(AppVersionDetails as any);

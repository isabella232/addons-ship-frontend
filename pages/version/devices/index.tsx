import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { TestDevice } from '@/models/test-device';
import View from './view';

type Props = {
  testDevices: TestDevice[];
};

export class AppVersionDetails extends Component<Props> {
  render() {
    const { testDevices } = this.props;

    const viewProps = {
      devices: testDevices
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ testDevices }: RootState) => ({ testDevices });

export default connect(mapStateToProps)(AppVersionDetails as any);

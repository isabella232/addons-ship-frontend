import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { TestDevice } from '@/models/test-device';
import View from './view';
import { App } from '@/models/app';

type Props = {
  app: App;
  testDevices: TestDevice[];
};

export class AppVersionDevices extends Component<Props> {
  render() {
    const { app, testDevices } = this.props;

    const viewProps = {
      projectType: app.projectType,
      devices: testDevices
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ app, testDevices }: RootState) => ({ app, testDevices });

export default connect(mapStateToProps)(AppVersionDevices as any);

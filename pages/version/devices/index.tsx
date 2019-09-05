import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { TestDevice } from '@/models/test-device';
import View from './view';
import { App } from '@/models/app';
import { Text } from '@bitrise/bitkit';

import { fetchTestDevices } from '@/ducks/testDevices';

type Props = {
  app: App;
  fetchTestDevices: typeof fetchTestDevices;
  testDevices: TestDevice[];
  isLoading?: boolean;
};

export class AppVersionDevices extends Component<Props> {
  componentDidMount() {
    const { app, fetchTestDevices } = this.props;

    fetchTestDevices(app.appSlug);
  }

  render() {
    const { app, testDevices, isLoading } = this.props;

    const viewProps = {
      projectType: app.projectType,
      devices: testDevices
    };

    if (isLoading) {
      return <Text>Loading devices...</Text>;
    }

    return <View {...viewProps} />;
  }
}

const mapStateToProps = (rootState: RootState) => ({
  app: rootState.app,
  testDevices: rootState.testDevices,
  isLoading: rootState.testDevices.length === 0
});

const mapDispatchToProps = {
  fetchTestDevices
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppVersionDevices as any);

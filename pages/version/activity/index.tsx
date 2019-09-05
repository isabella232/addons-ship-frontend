import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { orderedAppVersionEvents } from '@/ducks/selectors';
import { AppVersionEvent, AppVersion } from '@/models';
import { pollPublishStatus } from '@/ducks/appVersion';

import View from './view';

export type Props = {
  versionId: string;
  appVersion: AppVersion | null;
  appVersionEvents: AppVersionEvent[];
  startPollPublishStatus: typeof pollPublishStatus.start;
  cancelPollPublishStatus: typeof pollPublishStatus.cancel;
};

export class Activity extends Component<Props> {
  componentDidMount() {
    const { versionId, appVersion, startPollPublishStatus } = this.props;

    if (appVersion && appVersion.id === versionId) {
      startPollPublishStatus(appVersion);
    }
  }

  componentWillUnmount() {
    const { cancelPollPublishStatus } = this.props;

    cancelPollPublishStatus();
  }

  render() {
    const { appVersionEvents } = this.props;
    const viewProps = {
      appVersionEvents
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion: { appVersion, events } }: RootState) => ({
  appVersionEvents: orderedAppVersionEvents(events),
  appVersion
});

const mapDispatchToProps = {
  startPollPublishStatus: pollPublishStatus.start,
  cancelPollPublishStatus: pollPublishStatus.cancel
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);

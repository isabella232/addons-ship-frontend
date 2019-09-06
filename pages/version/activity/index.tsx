import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import { orderedAppVersionEvents } from '@/ducks/selectors';
import { AppVersionEvent, AppVersion } from '@/models';
import { pollPublishStatus } from '@/ducks/appVersion';
import { fetchAppVersionEvents } from '@/ducks/appVersion';

import View from './view';

export type Props = {
  appSlug: string;
  versionId: string;
  appVersionEvents: AppVersionEvent[];
  startPollPublishStatus: typeof pollPublishStatus.start;
  cancelPollPublishStatus: typeof pollPublishStatus.cancel;
  fetchAppVersionEvents: typeof fetchAppVersionEvents;
  isLoading: boolean;
};

export class Activity extends Component<Props> {
  componentDidMount() {
    const { appSlug, versionId, startPollPublishStatus } = this.props;

    startPollPublishStatus({ appSlug, id: versionId } as AppVersion);
    fetchAppVersionEvents(appSlug, versionId);
  }

  componentWillUnmount() {
    const { cancelPollPublishStatus } = this.props;

    cancelPollPublishStatus();
  }

  render() {
    const { appVersionEvents, isLoading } = this.props;
    const viewProps = {
      appVersionEvents,
      isLoading
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion: { events, isLoadingEvents } }: RootState) => ({
  appVersionEvents: orderedAppVersionEvents(events),
  isLoading: isLoadingEvents
});

const mapDispatchToProps = {
  startPollPublishStatus: pollPublishStatus.start,
  cancelPollPublishStatus: pollPublishStatus.cancel,
  fetchAppVersionEvents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(Activity);

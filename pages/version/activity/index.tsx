import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import View from './view';
import { orderedAppVersionEvents } from '@/ducks/selectors';
import { AppVersionEvent } from '@/models';

type Props = {
  appVersionEvents: AppVersionEvent[];
};

export class Activity extends Component<Props> {
  render() {
    const { appVersionEvents } = this.props;
    const viewProps = {
      appVersionEvents
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion: { events } }: RootState) => ({
  appVersionEvents: orderedAppVersionEvents(events)
});

export default connect(mapStateToProps)(Activity as any);

import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';
import View from './view';

type Props = {};

export class AppVersionActivity extends Component<Props> {
  render() {
    const viewProps = {};

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({  }: RootState) => ({});

export default connect(mapStateToProps)(AppVersionActivity as any);

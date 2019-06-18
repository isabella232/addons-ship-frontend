import { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '@/store';

type Props = {};

export class General extends Component<Props> {
  render() {
    return <div>general</div>;
  }
}

const mapStateToProps = ({ testDevices }: RootState) => ({ testDevices });

export default connect(mapStateToProps)(General as any);

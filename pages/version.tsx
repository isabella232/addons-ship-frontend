import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { VersionPageQuery, PageContext } from '@/models';
import { RootState } from '@/store';
import { fetchAppVersion } from '@/ducks/appVersion';

interface VersionPageProps extends VersionPageQuery {}

type VersionPageState = {};

class VersionPage extends Component<VersionPageProps, VersionPageState> {
  state: VersionPageState = {};

  static async getInitialProps({ query: { appSlug, versionId, isPublic }, store }: PageContext) {
    await store.dispatch(fetchAppVersion(appSlug as string, versionId as string) as any);

    return { appSlug, versionId, isPublic };
  }

  render() {
    const { appSlug, versionId, isPublic } = this.props;

    return (
      <div>
        <h1>Welcome to Ship Add-on's version page!</h1>
        <ul>
          <li>appSlug: {appSlug}</li>
          <li>versionId: {versionId}</li>
          <li>isPublic: {isPublic ? 'yes' : 'no'}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });
const mapDispatchToProps = (_dispatch: Dispatch) => ({
  fetchAppVersion
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VersionPage);

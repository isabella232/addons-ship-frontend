import { Component } from 'react';
import { NextContext } from 'next';

import { VersionPageQuery } from '@/models';

interface VersionPageProps extends VersionPageQuery {}

type VersionPageState = {};

class VersionPage extends Component<VersionPageProps, VersionPageState> {
  state: VersionPageState = {};

  static getInitialProps({ query: { appSlug, versionId, isPublic } }: NextContext) {
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

export default VersionPage;

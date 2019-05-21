import { Component, Fragment } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

import { NextDocumentContext } from 'next/document';

type VersionPageProps = {};

type VersionPageState = {};

class VersionPage extends Component<VersionPageProps, VersionPageState> {
  state: VersionPageState = {};

  render() {
    const {} = this.props;

    return (
      <h1>Welcome to Ship Add-on's version page!</h1>
    );
  }
}

export default VersionPage;
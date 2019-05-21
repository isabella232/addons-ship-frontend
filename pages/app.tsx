import { Component, Fragment } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

import { NextDocumentContext } from 'next/document';

type AppPageProps = {};

type AppPageState = {};

interface Context extends NextDocumentContext {
  store: Store;
  isServer: boolean;
}

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {};

  render() {
    const {} = this.props;

    return (
      <h1>Welcome to Ship Add-on's app page!</h1>
    );
  }
}

export default AppPage;
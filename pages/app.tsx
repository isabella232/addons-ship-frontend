import { Component } from 'react';
import { Store } from 'redux';
import { NextDocumentContext } from 'next/document';
import { Base } from '@bitrise/bitkit';

import PlatformSelector from '@/components/PlatformSelector';
import { Platform } from '@/models';

type AppPageProps = {};

type AppPageState = {
  platform: Platform;
};

interface Context extends NextDocumentContext {
  store: Store;
  isServer: boolean;
}

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {
    platform: 'ios'
  };

  render() {
    const {} = this.props;
    const { platform } = this.state;

    return (
      <Base paddingVertical="x12">
        <PlatformSelector platform={platform} onClick={platform => this.setState({ platform })} />
      </Base>
    );
  }
}

export default AppPage;

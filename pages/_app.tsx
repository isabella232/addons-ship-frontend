import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import makeStore from '../store';

import '@/assets/style/index.scss';

interface ShipAppProps extends DefaultAppIProps {
  store: Store;
  appSlug: string;
  appName: string;
}

class ShipApp extends App<ShipAppProps> {
  static async getInitialProps({ Component, ctx }: NextAppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps, appSlug: 'my-super-app', appName: 'My Super App' };
  }

  componentDidMount() {
    const { Beam } = require('@bitrise/beam');
    const { appSlug, appName } = this.props;

    Beam.init({
      app_name: appName,
      app_slug: appSlug
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ShipApp);

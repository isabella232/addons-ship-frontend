import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { NextContext } from 'next';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import nookies from 'nookies';
import { ProgressBitbot, Base } from '@bitrise/bitkit';

import makeStore from '../store';
import { setToken } from '@/ducks/auth';

import '@/assets/style/index.scss';

interface ShipAppProps extends DefaultAppIProps {
  store: Store;
  appSlug: string;
  appName: string;
  token: string;
}

interface Context extends NextContext {
  store: Store;
}

interface AppContext extends NextAppContext {
  ctx: Context;
}

class ShipApp extends App<ShipAppProps> {
  state = {
    ready: false
  };
  static async getInitialProps({ Component, ctx }: AppContext) {
    let { 'auth-token': token } = nookies.get(ctx);
    token = token || 'test-api-token-1';

    // Set the token on the server side
    await ctx.store.dispatch(setToken(token) as any);

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps, appSlug: 'my-super-app', appName: 'My Super App', token };
  }

  async componentDidMount() {
    const { token, store } = this.props;

    // Set token on the client side too
    await store.dispatch(setToken(token) as any);

    this.setState({ ready: true });
    const { Beam } = require('@bitrise/beam');
    const { appSlug, appName } = this.props;

    Beam.init({
      app_name: appName,
      app_slug: appSlug
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const { ready } = this.state;

    if (!ready) {
      return (
        <Base absolute="center">
          <ProgressBitbot content="Docking Ship..." color="grape-3" />
        </Base>
      );
    }

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

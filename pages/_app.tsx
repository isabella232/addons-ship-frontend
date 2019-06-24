import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import nookies from 'nookies';

import makeStore from '../store';

import '@/assets/style/index.scss';
import { NextContext } from 'next';
import { setToken } from '@/ducks/auth';

interface ShipAppProps extends DefaultAppIProps {
  store: Store;
  appSlug: string;
  appName: string;
}

interface Context extends NextContext {
  store: Store;
}

interface AppContext extends NextAppContext {
  ctx: Context;
}

class ShipApp extends App<ShipAppProps> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const { 'auth-token': token } = nookies.get(ctx);
    await ctx.store.dispatch(setToken(token || 'test-api-token-1'));

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

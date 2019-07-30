import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import nookies from 'nookies';
import { ProgressBitbot, Base, Notification, Text } from '@bitrise/bitkit';

import { setToken } from '@/ducks/auth';
import Header from '@/components/Header';
import { PageContext } from '@/models';
import { fetchApp } from '@/ducks/app';

import '@/assets/style/index.scss';
import makeStore from '../store';

export interface ShipAppProps extends DefaultAppIProps {
  store: Store;
  appSlug: string;
  token: string;
  settingsOnboardingSeen: boolean;
}

interface AppContext extends NextAppContext {
  ctx: PageContext;
}

export class ShipApp extends App<ShipAppProps> {
  state = {
    ready: false
  };

  static async getInitialProps({ Component, ctx }: AppContext) {
    let { 'auth-token': token, 'settings-onboarding-seen': settingsOnboardingSeen } = nookies.get(ctx);
    token = token || 'test-api-token-1';
    settingsOnboardingSeen = settingsOnboardingSeen || 'false';

    const { appSlug } = ctx.query;

    // Set the token on the server side
    if (ctx.isServer) {
      await ctx.store.dispatch(setToken(token) as any);
    }

    if (appSlug) {
      await ctx.store.dispatch(fetchApp(appSlug as string) as any);
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {
      pageProps,
      appSlug,
      token,
      settingsOnboardingSeen: settingsOnboardingSeen === 'true'
    };
  }

  async componentDidMount() {
    const { token, store, settingsOnboardingSeen } = this.props;

    // Set token on the client side too
    await store.dispatch(setToken(token) as any);

    this.setState({ ready: true });

    if (!settingsOnboardingSeen) {
      nookies.set(undefined, 'settings-onboarding-seen', 'true', {
        maxAge: 1000 * 24 * 60 * 60,
        path: '/'
      });
    }
  }

  render() {
    const { Component, pageProps, store, settingsOnboardingSeen } = this.props;
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
          <Header shouldShowSettingsOnboarding={!settingsOnboardingSeen} />
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ShipApp);

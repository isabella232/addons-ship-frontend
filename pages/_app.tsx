import App, { Container, NextAppContext, DefaultAppIProps } from 'next/app';
import Router from 'next/router';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import nookies from 'nookies';
import { ProgressBitbot, Base } from '@bitrise/bitkit';

import { setToken } from '@/ducks/auth';
import Header from '@/components/Header';
import { PageContext } from '@/models';
import { fetchApp } from '@/ducks/app';
import { analyticsConfig } from '@/config';
import { initializeSegment } from '@/utils/analytics';

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
    const cookies = nookies.get(ctx);

    let { appSlug, token } = ctx.query;
    if (token) {
      nookies.set(ctx, 'auth-token', token as string, {
        maxAge: 1000 * 24 * 60 * 60,
        path: '/'
      });
    }
    token = token || cookies['auth-token'] || 'test-api-token-1';

    let { 'settings-onboarding-seen': settingsOnboardingSeen } = cookies;
    settingsOnboardingSeen = settingsOnboardingSeen || 'false';

    // Set the token on the server side
    if (ctx.isServer) {
      await ctx.store.dispatch(setToken(token as string) as any);
    }

    if (appSlug) {
      await ctx.store.dispatch(fetchApp(appSlug as string) as any);
    } else {
      console.log('No app slug provided');
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {
      pageProps,
      appSlug,
      token,
      settingsOnboardingSeen: settingsOnboardingSeen === 'true'
    };
  }

  handleRouteChange = (_url: string) => {
    const { appSlug, Component } = this.props;
    const pageName = Component.displayName;

    if (window.analytics) {
      window.analytics.page({ addonId: 'addons-ship', appSlug, pageName });
    }
  };

  async componentDidMount() {
    const { token, store, settingsOnboardingSeen } = this.props;

    if (analyticsConfig.segmentWriteKey) {
      initializeSegment(analyticsConfig.segmentWriteKey);
      Router.events.on('routeChangeComplete', this.handleRouteChange);
    }

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

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange);
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

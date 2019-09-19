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
import makeStore, { RootState } from '../../store';
import AppContent from './content';

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

    let { appSlug } = ctx.query;
    const tokenKey = `token-${appSlug}`;
    const token = cookies[tokenKey];

    let { 'settings-onboarding-seen': settingsOnboardingSeen } = cookies;
    settingsOnboardingSeen = settingsOnboardingSeen || 'false';

    // Set the token on the server side
    if (ctx.isServer) {
      await ctx.store.dispatch(setToken(token as string) as any);
    }

    if (appSlug) {
      const {
        app: { app }
      } = ctx.store.getState() as RootState;
      if (!app) {
        await ctx.store.dispatch(fetchApp(appSlug as string) as any);
      }
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

  handleRouteChange = (_url?: string) => {
    const { appSlug, Component } = this.props;
    const pageName = Component.displayName;

    /* istanbul ignore next */
    if (window.analytics) {
      window.analytics.page({ addonId: 'addons-ship', appSlug, pageName });
    }
  };

  async componentDidMount() {
    const { token, store, settingsOnboardingSeen } = this.props;

    if (analyticsConfig.segmentWriteKey) {
      initializeSegment(analyticsConfig.segmentWriteKey);
      this.handleRouteChange();
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
    const { Component, pageProps, store, settingsOnboardingSeen, appSlug } = this.props;
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
          <AppContent appSlug={appSlug}>
            <Header shouldShowSettingsOnboarding={!settingsOnboardingSeen} />
            <Component {...pageProps} />
          </AppContent>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(ShipApp);

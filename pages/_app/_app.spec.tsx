jest.mock('nookies');
jest.mock('@/ducks/auth');
jest.mock('@/ducks/app');
jest.mock('@/utils/analytics');
jest.mock('@/utils/device');

import { AppProps } from 'next/app';
import { RouterProps } from 'next/router';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import configureMockStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import nookies from 'nookies';

import { setToken } from '@/ducks/auth';
import { fetchApp } from '@/ducks/app';
import { initializeSegment } from '@/utils/analytics';
import { deviceInfo } from '@/utils/device';

import { ShipApp, ShipAppProps } from '.';
import { PageContext } from '@/models';

describe('ShipApp', () => {
  let store: MockStoreEnhanced, defaultProps: ShipAppProps & AppProps;
  const setTokenAction = { type: 'MOCK_AUTH_SET_TOKEN' },
    getAppAction = { type: 'MOCK_APP_GET' };

  beforeEach(() => {
    const mockStoreCreator: MockStoreCreator = configureMockStore([thunk]);
    store = mockStoreCreator({
      app: {}
    });

    (nookies.set as jest.Mock).mockReset();

    defaultProps = {
      store,
      appSlug: 'an-app-slug',
      token: 'auth-token',
      settingsOnboardingSeen: false,
      pageProps: {},
      Component: () => <h1>Ship Add-on</h1>,
      router: {} as RouterProps
    };

    ((setToken as any) as jest.Mock).mockReturnValue(setTokenAction);
    ((fetchApp as any) as jest.Mock).mockReturnValue(getAppAction);

    nookies.get = jest.fn().mockImplementation(() => ({}));
  });

  it('renders without errors', () => {
    const tree = shallowToJson(shallow(<ShipApp {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  describe('getInitialProps', () => {
    let spy: jest.SpyInstance;
    const Component = () => <h1>Ship Add-on</h1>;
    Component.getInitialProps = () => ({ page: 'props' });

    let ctx: PageContext;

    beforeEach(() => {
      spy = jest.spyOn(store, 'dispatch');
      ctx = ({
        store,
        isServer: true,
        query: { appSlug: 'an-app-slug', token: 'a-token-from-query' }
      } as any) as PageContext;
    });

    test('on the server', async () => {
      const result = await ShipApp.getInitialProps({ Component, ctx, router: {} as RouterProps });

      expect(result).toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(setTokenAction);
      expect(spy).toHaveBeenCalledWith(getAppAction);
    });

    test('on the client', async () => {
      const result = await ShipApp.getInitialProps({
        Component,
        ctx: { ...ctx, isServer: false },
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
      expect(spy).not.toHaveBeenCalledWith(setTokenAction);
      expect(spy).toHaveBeenCalledWith(getAppAction);
    });

    test('when settings onboarding has already been seen', async () => {
      nookies.get = jest.fn().mockImplementation(() => ({
        'settings-onboarding-seen': 'true'
      }));

      const result = await ShipApp.getInitialProps({
        Component,
        ctx: { ...ctx, isServer: false },
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
    });

    test('when token is included in app-specific cookie', async () => {
      nookies.get = jest.fn().mockImplementation(() => ({
        'token-an-app-slug': 'a-token-from-cookie'
      }));

      const result = await ShipApp.getInitialProps({
        Component,
        ctx: { ...ctx, query: { appSlug: 'an-app-slug' } },
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
    });

    test('when token is not included in app-specific cookie', async () => {
      nookies.set = jest.fn().mockImplementation(() => {});

      const result = await ShipApp.getInitialProps({
        Component,
        ctx: { ...ctx, query: { appSlug: 'an-app-slug' } },
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
    });

    test('when no app slug is present', async () => {
      const result = await ShipApp.getInitialProps({
        Component,
        ctx: { ...ctx, query: {} },
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
      expect(spy).toHaveBeenCalledWith(setTokenAction);
      expect(spy).not.toHaveBeenCalledWith(getAppAction);
    });

    test('when the Component has no getInitialProps method', async () => {
      const result = await ShipApp.getInitialProps({
        Component: () => <h1>Ship Add-on</h1>,
        ctx,
        router: {} as RouterProps
      });

      expect(result).toMatchSnapshot();
    });
  });

  test('componentDidMount', async () => {
    const spy = jest.spyOn(store, 'dispatch');
    const wrapper = await shallow(<ShipApp {...defaultProps} />);

    expect(spy).toHaveBeenCalledWith(setTokenAction);
    expect(store.getActions()).toMatchSnapshot();
    expect(wrapper.state()).toMatchSnapshot();
  });

  describe('analytics', () => {
    it('initializes Segment tracking', () => {
      shallow(<ShipApp {...defaultProps} />);

      expect(initializeSegment).toHaveBeenCalled();
    });

    it('track pageviews on route change', () => {
      const mockDevice: any = {
        it: 'does',
        not: 'matter'
      };
      (deviceInfo as jest.Mock).mockReturnValueOnce(mockDevice);

      const pageEvt = jest.fn(),
        appSlug = 'some-app-slug',
        Component = () => <h1>Hello</h1>;
      Component.displayName = 'Whatever';
      Object.defineProperty(window, 'analytics', { value: { page: pageEvt } });

      const wrapper = shallow(<ShipApp {...defaultProps} appSlug={appSlug} Component={Component as any} />);

      (wrapper.instance() as ShipApp).handleRouteChange('some-url');
      expect(pageEvt).toHaveBeenCalledWith({
        addonId: 'addons-ship',
        appSlug,
        pageName: Component.displayName,
        device: mockDevice
      });
    });
  });
});

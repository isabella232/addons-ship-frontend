jest.mock('@/utils/media');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()]),
  useEffect: jest.fn((fn: Function) => fn())
}));
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  events: {
    on: jest.fn(),
    off: jest.fn()
  },
  useRouter: jest.fn(() => ({ route: '' }))
}));
jest.mock(
  'popper.js',
  () =>
    class {
      constructor() {
        return {
          scheduleUpdate: jest.fn(),
          update: jest.fn()
        };
      }
    }
);

import React, { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AddonBeam, Link } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';
import { mockApp, mockAppVersion } from '@/mocks';

import { Header, Props } from '.';

describe('Header', () => {
  const defaultProps: Props = { app: mockApp, appVersion: mockAppVersion, shouldShowSettingsOnboarding: false };

  describe('on desktop', () => {
    beforeEach(() => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([true]);
    });

    it('renders correctly', () => {
      const tree = shallowToJson(shallow(<Header {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });

    it('renders correctly when no app is defined', () => {
      const tree = shallowToJson(shallow(<Header {...defaultProps} app={undefined} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('on mobile', () => {
    beforeEach(() => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([false]);
    });

    it('renders correctly on mobile', () => {
      const tree = shallowToJson(shallow(<Header {...defaultProps}>My app</Header>));
      expect(tree).toMatchSnapshot();
    });

    it('opens the hamburger menu', () => {
      const setHamburgerIconActive = jest.fn();
      (useState as jest.Mock).mockReturnValueOnce([false, setHamburgerIconActive]);

      const wrapper = shallow(<Header {...defaultProps}>My app</Header>);
      (wrapper.find(AddonBeam).props() as any).onHamburgerIconClick();

      expect(setHamburgerIconActive).toHaveBeenCalledWith(true);
    });

    it('renders correctly when no app is defined', () => {
      const tree = shallowToJson(shallow(<Header {...defaultProps} app={undefined} />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('routes', () => {
    const routes = ['/settings', '/version', '/app'];

    routes.forEach(route => {
      test(`${route} for desktop`, () => {
        (useRouter as jest.Mock).mockReturnValueOnce({ route });
        (mediaQuery as jest.Mock).mockReturnValueOnce([true]);
        const tree = shallowToJson(shallow(<Header {...defaultProps} />));
        expect(tree).toMatchSnapshot();
      });

      test(`${route} for mobile`, () => {
        (useRouter as jest.Mock).mockReturnValueOnce({ route });
        (mediaQuery as jest.Mock).mockReturnValueOnce([false]);
        const tree = shallowToJson(shallow(<Header {...defaultProps} />));
        expect(tree).toMatchSnapshot();
      });
    });
  });

  test('handleRouteChange', async () => {
    const setHamburgerIconActive = jest.fn();
    (useState as jest.Mock).mockReturnValueOnce([true, setHamburgerIconActive]);
    let handler;
    (Router.events.on as jest.Mock).mockImplementationOnce((event, _handler) => {
      console.log('Router.events.on', { event, _handler });
      handler = _handler;
    });

    await shallow(<Header {...defaultProps} />);
    expect(typeof handler).toBe('function');

    // @ts-ignore
    await handler();

    expect(setHamburgerIconActive).toHaveBeenCalledWith(false);
  });

  describe('when settings onboarding should be shown', () => {
    beforeEach(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('shows the notification', () => {
      const tree = shallowToJson(shallow(<Header {...defaultProps} shouldShowSettingsOnboarding />));
      expect(tree).toMatchSnapshot();
    });

    it('hides notification on close button selection', async () => {
      // Needed for the tooltip
      (global as any).document.createRange = () => ({
        setStart: () => {},
        setEnd: () => {},
        commonAncestorContainer: {
          nodeName: 'BODY',
          ownerDocument: document
        }
      });

      const setSettingsOnboardingNotificationVisible = jest.fn();
      (useState as jest.Mock).mockReturnValue([true, setSettingsOnboardingNotificationVisible]);

      const tree = await mount(<Header {...defaultProps} shouldShowSettingsOnboarding />);
      (tree.find(Link).props() as any).onClick();

      expect(setSettingsOnboardingNotificationVisible).toHaveBeenCalledWith(false);
    });
  });
});

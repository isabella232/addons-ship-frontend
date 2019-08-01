jest.mock('@/utils/media');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()])
}));
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ route: '' }))
}));

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { AddonBeam, Notification } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';
import { mockApp, mockAppVersion } from '@/mocks';

import { Header, Props } from '.';

describe('Header', () => {
  const defaultProps: Props = { app: mockApp, appVersion: mockAppVersion, shouldShowSettingsOnboarding: false };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([true]);

    const tree = shallowToJson(shallow(<Header {...defaultProps}>My app</Header>));
    expect(tree).toMatchSnapshot();
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
      (tree.find(Notification).props() as any).onRemove();

      expect(setSettingsOnboardingNotificationVisible).toHaveBeenCalledWith(false);
    });
  });
});

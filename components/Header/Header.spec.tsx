jest.mock('@/utils/media');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()])
}));

import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AddonBeam, Notification } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';
import { mockApp } from '@/mocks';

import { Header, Props } from '.';

describe('Header', () => {
  const defaultProps: Props = { app: mockApp, shouldShowSettingsOnboarding: false };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([true]);

    const tree = toJSON(shallow(<Header {...defaultProps}>My app</Header>));
    expect(tree).toMatchSnapshot();
  });

  describe('on mobile', () => {
    beforeEach(() => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([false]);
    });

    it('renders correctly on mobile', () => {
      const tree = toJSON(shallow(<Header {...defaultProps}>My app</Header>));
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

  describe('when settings onboarding should be shown', () => {
    beforeEach(() => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([true]);
    });

    it('shows the notification', () => {
      const tree = toJSON(shallow(<Header {...defaultProps} shouldShowSettingsOnboarding={true}>My app</Header>));
      expect(tree).toMatchSnapshot();
    });

    it('hides notification on close button selection', async () => {
      const setSettingsOnboardingNotificationVisible = jest.fn();
      (useState as jest.Mock).mockReturnValue([true, setSettingsOnboardingNotificationVisible]);

      const tree = await mount(<Header {...defaultProps} shouldShowSettingsOnboarding={true}>My app</Header>);
      (tree.find(Notification).props() as any).onRemove();

      expect(setSettingsOnboardingNotificationVisible).toHaveBeenCalledWith(false);
    });
  })
});

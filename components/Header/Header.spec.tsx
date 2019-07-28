jest.mock('@/utils/media');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()])
}));

import React, { useState } from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AddonBeam } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';
import { mockApp } from '@/mocks';

import { Header, Props } from '.';

describe('Header', () => {
  const defaultProps: Props = { app: mockApp };

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
});

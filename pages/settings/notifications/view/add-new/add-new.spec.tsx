jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()])
}));

import React, { useState } from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Input, Button } from '@bitrise/bitkit';

import AddNew, { Props } from '.';

describe('NotificationSettings View AddNew', () => {
  const defaultProps: Props = {
    onAddEmail: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<AddNew {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('updates the email value', () => {
    const setEmail = jest.fn();
    (useState as jest.Mock).mockReturnValueOnce(['', setEmail]);

    const email = 'new@email.value';

    const wrapper = shallow(<AddNew {...defaultProps} />);

    wrapper.find(Input).simulate('change', { target: { value: email } });

    expect(setEmail).toHaveBeenCalledWith(email);
  });

  it('calls onAddEmail', () => {
    const email = 'new@email.value';
    (useState as jest.Mock).mockReturnValueOnce([email, jest.fn()]);
    const onAddEmail = jest.fn();

    const wrapper = shallow(<AddNew onAddEmail={onAddEmail} />);
    wrapper.find(Button).simulate('click');

    expect(onAddEmail).toHaveBeenCalledWith(email);
  });
});

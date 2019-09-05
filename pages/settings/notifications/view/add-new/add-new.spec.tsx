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
    email: 'old@email.value',
    isAddingEmail: false,
    onEmailChange: jest.fn(),
    onAddEmail: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<AddNew {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('shows adding in progress', () => {
    const tree = shallowToJson(shallow(<AddNew {...defaultProps} isAddingEmail={true} />));

    expect(tree).toMatchSnapshot();
  });

  it('updates the email value', () => {
    const onEmailChange = jest.fn();

    const email = 'new@email.value';

    const wrapper = shallow(<AddNew {...defaultProps} onEmailChange={onEmailChange} />);
    wrapper.find(Input).simulate('change', { target: { value: email } });

    expect(onEmailChange).toHaveBeenCalledWith(email);
  });

  it('calls onAddEmail', () => {
    const onAddEmail = jest.fn();

    const email = 'new@email.value';

    const wrapper = shallow(<AddNew {...defaultProps} onAddEmail={onAddEmail} email={email} />);
    const preventDefault = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(onAddEmail).toHaveBeenCalledWith(email);
  });
});

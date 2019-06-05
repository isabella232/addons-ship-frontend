// const mockUseStateSet = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(input => [input, jest.fn()]),
  useRef: jest.fn(),
  useLayoutEffect: jest.fn(),
  useEffect: jest.fn()
}));

import React, { useRef, useState, useLayoutEffect } from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

// import { asMock } from '@/utils';

import SmallTabs from './';

describe('SmallTabs', () => {
  const items = [
    {
      key: 'item-1',
      value: 'Item 1'
    },
    {
      key: 'item-2',
      value: 'Item 2'
    }
  ];

  let mockGetBoundingClientRect = jest.fn();

  beforeEach(() => {
    (useRef as jest.Mock).mockImplementation(() => ({
      current: { getBoundingClientRect: mockGetBoundingClientRect }
    }));
  });

  afterEach(() => {
    mockGetBoundingClientRect.mockRestore();
    (useLayoutEffect as jest.Mock).mockRestore();
  });

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<SmallTabs items={items} selected={items[0].key} onSelect={jest.fn()} />));

    expect(tree).toMatchSnapshot();
  });

  it('calculates useLayoutEffect contents', () => {
    mockGetBoundingClientRect.mockReturnValueOnce({ right: 0 });
    (useLayoutEffect as jest.Mock).mockImplementationOnce(fn => fn());

    <SmallTabs items={items} selected={items[0].key} onSelect={jest.fn()} />;
  });

  it('shows a dropdown if any menu item is not visible', () => {
    (useState as jest.Mock)
      .mockImplementationOnce(() => [false, jest.fn()]) // isOpen
      .mockImplementationOnce(() => [true, jest.fn()]); // hasOwerflow

    const tree = shallowToJson(shallow(<SmallTabs items={items} selected={items[0].key} onSelect={jest.fn()} />));

    expect(tree).toMatchSnapshot();
  });

  test('onSelect', () => {
    const onSelect = jest.fn();
    const wrap = shallow(<SmallTabs items={items} selected={items[0].key} onSelect={onSelect} />);

    wrap
      .find('.item')
      .last()
      .simulate('click');

    expect(onSelect).toHaveBeenCalledWith('item-2');
  });

  test('dropdown onSelect', () => {
    const onSelect = jest.fn();
    (useState as jest.Mock)
      .mockImplementationOnce(() => [true, jest.fn()]) // isOpen
      .mockImplementationOnce(() => [true, jest.fn()]); // hasOwerflow

    const wrap = mount(<SmallTabs items={items} selected={items[0].key} onSelect={onSelect} />);

    wrap
      .find('DropdownMenuItem')
      .last()
      .simulate('click', {
        nativeEvent: {
          stopImmediatePropagation: jest.fn()
        }
      });

    expect(onSelect).toHaveBeenCalledWith('item-2');
  });

  test.todo(
    'onClose'
    // , () => {
    //   const setOpen = jest.fn();
    //   (useState as jest.Mock).mockImplementationOnce(() => [true, setOpen]); // isOpen

    //   const wrap = shallow(<SmallTabs items={items} selected={items[0].key} onSelect={jest.fn()} />);

    //   wrap.first().simulate('click'); // clickout

    //   expect(setOpen).toHaveBeenCalledWith(false);
    // }
  );
});

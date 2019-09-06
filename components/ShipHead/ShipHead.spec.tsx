import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { App } from '@/models/app';

import { ShipHead } from '.';

describe('ShipHead', () => {
  test('When app is loaded', () => {
    const tree = shallowToJson(shallow(<ShipHead app={{ title: 'An app title' } as App}>Subpage</ShipHead>));
    expect(tree).toMatchSnapshot();
  });

  test('When app is not present', () => {
    const tree = shallowToJson(shallow(<ShipHead app={null}>Subpage</ShipHead>));
    expect(tree).toMatchSnapshot();
  });
});

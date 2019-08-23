jest.mock('@/utils/media');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { mediaQuery } from '@/utils/media';

import Error404 from './Error404';

describe('Error404', () => {
  describe('renders ok', () => {
    test('on desktop', () => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);

      const tree = shallowToJson(shallow(<Error404 />));
      expect(tree).toMatchSnapshot();
    });

    test('on mobile', () => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);

      const tree = shallowToJson(shallow(<Error404 />));
      expect(tree).toMatchSnapshot();
    });
  });
});

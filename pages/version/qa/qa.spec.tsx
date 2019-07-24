jest.mock('@/utils/media');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { mediaQuery } from '@/utils/media';

import QA from '.';

describe('QA tab', () => {
  describe('it renders without errors', () => {
    test('on mobile', () => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);

      const tree = shallowToJson(shallow(<QA />));

      expect(tree).toMatchSnapshot();
    });

    test('on desktop', () => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);

      const tree = shallowToJson(shallow(<QA />));

      expect(tree).toMatchSnapshot();
    });
  });
});

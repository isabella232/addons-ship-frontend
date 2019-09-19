jest.mock('@/utils/media');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { mediaQuery } from '@/utils/media';

import Error404 from './Error404';

describe('Error404', () => {
  beforeEach(() => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
  });

  describe('renders ok', () => {
    test('on desktop', () => {
      const tree = shallowToJson(shallow(<Error404 />));
      expect(tree).toMatchSnapshot();
    });

    test('on mobile', () => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([false]);

      const tree = shallowToJson(shallow(<Error404 />));
      expect(tree).toMatchSnapshot();
    });
  });

  test('with app slug', () => {
    const tree = shallowToJson(shallow(<Error404 appSlug="an-app-slug" />));
    expect(tree).toMatchSnapshot();
  });
});

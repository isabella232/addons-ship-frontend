jest.mock('@/utils/media');

import { mediaQuery } from '@/utils/media';

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import EmptyPage from '.';

describe('EmptyPage', () => {
  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([true]);
    const tree = toJSON(shallow(<EmptyPage />));
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly on mobile', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([false]);
    const tree = toJSON(shallow(<EmptyPage />));
    expect(tree).toMatchSnapshot();
  });
});

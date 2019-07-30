jest.mock('@/utils/media');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { mediaQuery } from '@/utils/media';

import PageTitle from '.';

describe('PageTitle', () => {
  beforeEach(() => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
  });

  it('renders without errors', () => {
    const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType="whatever" />));

    expect(tree).toMatchSnapshot();
  });

  it('renders without errors in smaller', () => {
    const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType="whatever" smaller />));

    expect(tree).toMatchSnapshot();
  });

  it('renders without errors on mobile', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([false]);

    const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType="whatever" />));

    expect(tree).toMatchSnapshot();
  });

  const projectTypes = ['android', 'ios', 'cordova', 'ionic', 'react', 'xamarin', 'settings'];

  projectTypes.forEach(type =>
    test(`with ${type} project type`, () => {
      const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType={type} />));

      expect(tree).toMatchSnapshot();
    })
  );
});

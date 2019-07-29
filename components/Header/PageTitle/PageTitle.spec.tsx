import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PageTitle from '.';

describe('PageTitle', () => {
  it('renders without errors', () => {
    const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType="whatever" />));

    expect(tree).toMatchSnapshot();
  });

  it('renders without errors in smaller', () => {
    const tree = shallowToJson(shallow(<PageTitle title="Some title" projectType="whatever" smaller />));

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

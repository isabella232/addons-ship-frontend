import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Squircle from '.';

describe('Squircle', () => {
  it('renders without issues', () => {
    const tree = shallowToJson(shallow(<Squircle src="img.url" />));
    expect(tree).toMatchSnapshot();
  });
});

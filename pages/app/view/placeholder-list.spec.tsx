import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import PlaceholderList from './placeholder-list';

describe('PlaceholderList', () => {
  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<PlaceholderList />));
    expect(tree).toMatchSnapshot();
  });
});

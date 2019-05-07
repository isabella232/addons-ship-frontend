import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Title from '.';

describe('Title', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<Title>Some title</Title>));
    expect(tree).toMatchSnapshot();
  });
});

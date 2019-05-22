import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import SectionHeading from '.';

describe('SectionHeading', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<SectionHeading>My app</SectionHeading>));
    expect(tree).toMatchSnapshot();
  });
});

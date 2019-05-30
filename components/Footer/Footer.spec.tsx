import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Footer from '.';

describe('Footer', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<Footer />));
    expect(tree).toMatchSnapshot();
  });
});

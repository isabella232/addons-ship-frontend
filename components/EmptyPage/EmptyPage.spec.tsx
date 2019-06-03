import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import EmptyPage from '.';

describe('EmptyPage', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<EmptyPage />));
    expect(tree).toMatchSnapshot();
  });
});

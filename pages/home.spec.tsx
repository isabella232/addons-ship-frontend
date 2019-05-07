import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Home from './home';

it('renders correctly', () => {
  const tree = toJSON(shallow(<Home />));
  expect(tree).toMatchSnapshot();
});

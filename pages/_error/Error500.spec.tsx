import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Error500 from './Error500';

describe('Error500', () => {
  it('renders ok', () => {
    const tree = shallowToJson(shallow(<Error500 />));
    expect(tree).toMatchSnapshot();
  });
});

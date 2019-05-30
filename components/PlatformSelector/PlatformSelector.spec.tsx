import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import PlatformSelector from '.';

describe('PlatformSelector', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<PlatformSelector platform="ios" onClick={() => {}} />));
    expect(tree).toMatchSnapshot();
  });
});

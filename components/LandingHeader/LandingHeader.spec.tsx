import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import LandingHeader from '.';

describe('LandingHeader', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<LandingHeader iconUrl='https://www.bitrise.io/assets/svg/logo-bitrise.svg'>My app</LandingHeader>));
    expect(tree).toMatchSnapshot();
  });
});

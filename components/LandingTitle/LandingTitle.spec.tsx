import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import LandingTitle from '.';

describe('LandingTitle', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<LandingTitle iconUrl='https://www.bitrise.io/assets/svg/logo-bitrise.svg'>My app</LandingTitle>));
    expect(tree).toMatchSnapshot();
  });
});

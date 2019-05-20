import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Header from '.';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<Header iconUrl='https://www.bitrise.io/assets/svg/logo-bitrise.svg'>My app</Header>));
    expect(tree).toMatchSnapshot();
  });
});

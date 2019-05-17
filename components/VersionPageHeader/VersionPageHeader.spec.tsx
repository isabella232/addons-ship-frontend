import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import VersionPageHeader from '.';

describe('VersionPageHeader', () => {
  it('renders correctly', () => {
    const tree = toJSON(shallow(<VersionPageHeader appName='My app' versionIconUrl='https://www.bitrise.io/assets/svg/logo-bitrise.svg'>My app version 1.0</VersionPageHeader>));
    expect(tree).toMatchSnapshot();
  });
});

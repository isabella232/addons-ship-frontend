import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { VersionPage } from './';

it('renders correctly', () => {
  const tree = toJSON(shallow(<VersionPage appVersion={mockAppVersion} appSlug="some-app" versionId="a-version-id" />));
  expect(tree).toMatchSnapshot();
});

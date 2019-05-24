import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { VersionPage } from './';

it('renders correctly', () => {
  const tree = toJSON(
    shallow(
      <VersionPage appVersion={mockAppVersion} appSlug="some-app" versionId="a-version-id" pagePath="some/path" />
    )
  );
  expect(tree).toMatchSnapshot();
});

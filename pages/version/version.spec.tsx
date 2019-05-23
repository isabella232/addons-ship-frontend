import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { AppVersion } from '@/models';
import { VersionPage } from './';

const mockAppVersion: AppVersion = {
  id: 123,
  version: '1.0.3',
  platform: 'ios',
  buildNumber: '32',
  buildSlug: '13245ads',
  lastUpdate: new Date('2018-09-22T12:42:31Z'),
  description: 'Some semi-long description',
  whatsNew: 'Some longer whats-new',
  minimumOs: '10.2',
  minimumSdk: 'dunno',
  packageName: 'com.package.name',
  certificateExpires: new Date('2018-09-22T12:42:31Z'),
  bundleId: 'bundle-id',
  size: 4567034,
  supportedDeviceTypes: ['iphone', 'ipad'],
  distributionType: 'development',
  iconUrl: 'http://placekitten.com/160/160',
  appName: 'Standup Timer',
  promotionalText: 'Promotional Text',
  keywords: 'Keywords',
  reviewNotes: 'Review Notes',
  supportUrl: 'https://bitrise.io/support',
  marketingUrl: 'https://bitrise.io/marketing',
  scheme: 'piramid',
  configuration: 'canary'
};

it('renders correctly', () => {
  const tree = toJSON(shallow(<VersionPage appVersion={mockAppVersion} appSlug="some-app" versionId="a-version-id" />));
  expect(tree).toMatchSnapshot();
});

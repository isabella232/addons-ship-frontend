jest.mock('@/ducks/settings');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { AppSettingsPageTabs } from '@/models/settings';

import { SettingsPage } from './';

describe('Settings', () => {
  describe('renders tabs correctly', () => {
    [...AppSettingsPageTabs, 'other'].forEach(tab => {
      test(tab, () => {
        const tree = shallowToJson(shallow(<SettingsPage selectedTab={tab} appSlug="some-app" />));
        expect(tree).toMatchSnapshot();
      });
    });
  });
});

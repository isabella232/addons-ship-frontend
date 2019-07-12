jest.mock('@/ducks/settings');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { fetchSettings } from '@/ducks/settings';
import { AppSettingsPageTabs } from '@/models/settings';

import { SettingsPage } from './';

describe('Settings', () => {
  describe('renders tabs correctly', () => {
    [...AppSettingsPageTabs, 'other'].forEach(tab => {
      test(tab, () => {
        const tree = shallowToJson(shallow(<SettingsPage selectedTab={tab} appSlug="some-app" pagePath="some/path" />));
        expect(tree).toMatchSnapshot();
      });
    });
  });

  describe('dispatches the proper actions', () => {
    const req = { path: 'some/path' };

    it('dispatches fetchSettings', async () => {
      await SettingsPage.getInitialProps({ query: {}, req, store: { dispatch: jest.fn() } } as any);

      expect(fetchSettings).toHaveBeenCalled();
    });
  });
});

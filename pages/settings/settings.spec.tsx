jest.mock('@/ducks/settings');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { listAppContacts } from '@/ducks/settings';
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

  describe('dispatches the proper actions', () => {
    it('dispatches listAppContacts', async () => {
      await SettingsPage.getInitialProps({
        query: { selectedTab: 'notifications' },
        store: { dispatch: jest.fn() }
      } as any);

      expect(listAppContacts).toHaveBeenCalled();
    });
  });
});

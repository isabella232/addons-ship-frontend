import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Toggle } from '@bitrise/bitkit';

import ContactList, { Props } from '.';

describe('NotificationSettings View ContactList', () => {
  const defaultProps: Props = {
    appContacts: [
      {
        email: 'bit.bot@bitrise.io',
        isConfirmed: true,
        notificationPreferences: {
          newVersion: true,
          successfulPublish: true,
          failedPublish: true
        }
      },
      {
        email: 'purr.request@bitrise.io',
        isConfirmed: false,
        notificationPreferences: {
          newVersion: false,
          successfulPublish: false,
          failedPublish: true
        }
      }
    ],
    onNotificationPreferenceChanged: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<ContactList {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  describe('onNotificationPreferenceChanged', () => {
    const preferenceKeys = ['newVersion', 'successfulPublish', 'failedPublish'];
    let wrapper: ShallowWrapper;
    const onNotificationPreferenceChanged = jest.fn();
    const appContacts = [
      {
        email: 'purr.request@bitrise.io',
        isConfirmed: false,
        notificationPreferences: {
          newVersion: false,
          successfulPublish: false,
          failedPublish: true
        }
      }
    ];

    beforeEach(() => {
      wrapper = shallow(
        <ContactList appContacts={appContacts} onNotificationPreferenceChanged={onNotificationPreferenceChanged} />
      );
      onNotificationPreferenceChanged.mockReset();
    });

    preferenceKeys.forEach((key, idx) => {
      it(`triggers onNotificationPreferenceChanged correctly for ${key}`, () => {
        const current = appContacts[0].notificationPreferences[key];
        wrapper
          .find(Toggle)
          .at(idx)
          .simulate('change');

        expect(onNotificationPreferenceChanged).toHaveBeenCalledWith(appContacts[0].email, key, !current);
      });
    });
  });
});

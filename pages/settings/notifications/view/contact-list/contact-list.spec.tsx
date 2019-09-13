jest.mock('@/utils/media');

import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { Toggle } from '@bitrise/bitkit';
import { mediaQuery } from '@/utils/media';

import ContactList, { Props } from '.';

describe('NotificationSettings View ContactList', () => {
  beforeAll(() => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
  });

  const defaultProps: Props = {
    appContacts: [
      {
        id: 'bit.bot',
        email: 'bit.bot@bitrise.io',
        isConfirmed: true,
        notificationPreferences: {
          newVersion: true,
          successfulPublish: true,
          failedPublish: true
        }
      },
      {
        id: 'purr.request',
        email: 'purr.request@bitrise.io',
        isConfirmed: false,
        notificationPreferences: {
          newVersion: false,
          successfulPublish: false,
          failedPublish: true
        }
      },
      {
        id: 'ninja',
        email: 'ninja@bitrise.io',
        isConfirmed: true,
        isMarkedForDelete: true,
        notificationPreferences: {
          newVersion: false,
          successfulPublish: false,
          failedPublish: true
        }
      }
    ],
    onNotificationPreferenceChanged: jest.fn(),
    onDeleteContact: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<ContactList {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly on mobile', () => {
    (mediaQuery as jest.Mock).mockReturnValueOnce([false]);
    const tree = shallowToJson(shallow(<ContactList {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  describe('onNotificationPreferenceChanged', () => {
    const preferenceKeys = ['newVersion', 'successfulPublish', 'failedPublish'];
    let wrapper: ShallowWrapper;
    const onNotificationPreferenceChanged = jest.fn();
    const appContacts = [
      {
        id: 'purr.request',
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
        <ContactList
          {...defaultProps}
          appContacts={appContacts}
          onNotificationPreferenceChanged={onNotificationPreferenceChanged}
        />
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

  test('onDeleteContact', () => {
    const onDeleteContact = jest.fn();
    const wrapper = shallow(<ContactList {...defaultProps} onDeleteContact={onDeleteContact} />);

    const { appContacts } = defaultProps;

    wrapper
      .find('.delete')
      .at(1)
      .simulate('click');

    expect(onDeleteContact).toHaveBeenCalledWith(appContacts[1].email);
  });
});

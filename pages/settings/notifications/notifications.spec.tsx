import { shallow, ShallowWrapper } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { AppContact } from '@/models/settings';

import { NotificationSettings } from '.';

describe('NotificationSettings', () => {
  const defaultProps = {
    appSlug: 'some-app',
    appContacts: [
      {
        id: 'bit-bot',
        email: 'bit.bot@bitrise.io',
        isConfirmed: true,
        notificationPreferences: {
          newVersion: true,
          successfulPublish: true,
          failedPublish: true
        }
      },
      {
        id: 'purr-req',
        email: 'purr.request@bitrise.io',
        isConfirmed: false,
        notificationPreferences: {
          newVersion: false,
          successfulPublish: false,
          failedPublish: true
        }
      }
    ],
    addAppContact: jest.fn() as any,
    updateAppContact: jest.fn() as any,
    deleteAppContact: jest.fn() as any
  };

  beforeEach(() => {
    const { addAppContact, updateAppContact, deleteAppContact } = defaultProps;

    ([addAppContact, updateAppContact, deleteAppContact] as jest.Mock[]).forEach(mock => mock.mockReset());
  });

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<NotificationSettings {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  test('componentDidUpdate', () => {
    const { appContacts } = defaultProps;
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    wrapper.setProps({ appContacts: [...appContacts, { email: ' doesnt@matt.er' }] });

    const { state } = wrapper.instance();

    expect(state).toMatchSnapshot();
  });

  it('sets the email', () => {
    const { addAppContact, appSlug } = defaultProps,
      email = 'whatever@email.com';
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onAddEmail(email);

    expect(addAppContact).toHaveBeenCalledWith(appSlug, email);
  });

  it('does not addAppContact with an empty email', () => {
    const { addAppContact } = defaultProps;
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onAddEmail('');

    expect(addAppContact).not.toHaveBeenCalled();
  });

  it('does not addAppContact if the email is already in the list', () => {
    const {
      appContacts: [{ email }],
      addAppContact
    } = defaultProps;
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onAddEmail(email);

    expect(wrapper.state('error')).not.toBeUndefined();
    expect(addAppContact).not.toHaveBeenCalled();
  });

  test('onNotificationPreferenceChanged', () => {
    const { appContacts } = defaultProps;

    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onNotificationPreferenceChanged(
      appContacts[0].email,
      'successfulPublish',
      false
    );

    expect(wrapper.state('updatedAppContacts')).toMatchSnapshot();
    expect(wrapper.state('hasModifications')).toBe(true);
  });

  test('onDeleteContact', () => {
    const { appContacts } = defaultProps;

    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onDeleteContact(appContacts[0].email);

    expect(wrapper.state('updatedAppContacts')).toMatchSnapshot();
    expect(wrapper.state('hasModifications')).toBe(true);
  });

  describe('onSave', () => {
    let updateAppContact: jest.Mock,
      deleteAppContact: jest.Mock,
      appContacts: AppContact[],
      appSlug: string,
      wrapper: ShallowWrapper;

    beforeEach(() => {
      ({ updateAppContact, deleteAppContact, appContacts, appSlug } = defaultProps);

      wrapper = shallow(<NotificationSettings {...defaultProps} />);
    });

    it('should not call updateAppContact, deleteAppContact without modifications', () => {
      (wrapper.instance() as NotificationSettings).onSave();

      expect(updateAppContact).not.toHaveBeenCalled();
      expect(deleteAppContact).not.toHaveBeenCalled();
    });

    it('should call updateAppContact', () => {
      const [appContact] = appContacts;
      (wrapper.instance() as NotificationSettings).onNotificationPreferenceChanged(
        appContact.email,
        'successfulPublish',
        false
      );

      (wrapper.instance() as NotificationSettings).onSave();

      expect(updateAppContact).toHaveBeenCalledWith(appSlug, {
        ...appContact,
        notificationPreferences: { ...appContact.notificationPreferences, successfulPublish: false }
      });
    });

    it('should call deleteAppContact', () => {
      const [appContact] = appContacts;

      (wrapper.instance() as NotificationSettings).onDeleteContact(appContact.email);
      (wrapper.instance() as NotificationSettings).onSave();

      expect(deleteAppContact).toHaveBeenCalledWith(appSlug, appContact);
    });
  });

  test('onCancel', () => {
    const { appContacts } = defaultProps;

    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onNotificationPreferenceChanged(
      appContacts[0].email,
      'successfulPublish',
      false
    );

    expect(wrapper.state('updatedAppContacts')).toMatchSnapshot();
    expect(wrapper.state('hasModifications')).toBe(true);

    (wrapper.instance() as NotificationSettings).onCancel();

    expect(wrapper.state('updatedAppContacts')).toEqual(appContacts);
    expect(wrapper.state('hasModifications')).toBe(false);
  });
});

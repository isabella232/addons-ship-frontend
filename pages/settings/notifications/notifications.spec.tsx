import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { NotificationSettings } from '.';

describe('NotificationSettings', () => {
  const defaultProps = {
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
    ]
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<NotificationSettings {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('sets the email', () => {
    const spy = jest.spyOn(global.console, 'log');
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    const email = 'whatever@email.com';
    (wrapper.instance() as NotificationSettings).onAddEmail(email);

    expect(spy).toHaveBeenCalledWith('onAddEmail', email);
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

  test('onSave', () => {
    const spy = jest.spyOn(global.console, 'log');
    const wrapper = shallow(<NotificationSettings {...defaultProps} />);

    (wrapper.instance() as NotificationSettings).onSave();

    expect(spy).toHaveBeenCalledWith('onSave');
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

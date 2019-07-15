import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { NotificationSettings } from '.';

describe('NotificationSettings', () => {
  const defaultProps = {
    appSlug: 'some-app',
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
    addAppContact: jest.fn() as any
  };

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

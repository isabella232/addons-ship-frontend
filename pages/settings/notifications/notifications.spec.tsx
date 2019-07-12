import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NotificationSettings from '.';

describe('NotificationSettings', () => {
  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<NotificationSettings />));

    expect(tree).toMatchSnapshot();
  });

  it('sets the email', () => {
    const spy = jest.spyOn(global.console, 'log');
    const wrapper = shallow(<NotificationSettings />);

    const email = 'whatever@email.com';
    (wrapper.instance() as NotificationSettings).onAddEmail(email);

    expect(spy).toHaveBeenCalledWith('onAddEmail', email);
  });

  test('onNotificationPreferenceChanged', () => {
    const appContacts = [
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
    ];

    const wrapper = shallow(<NotificationSettings />);

    wrapper.setState({ appContacts });

    (wrapper.instance() as NotificationSettings).onNotificationPreferenceChanged(
      appContacts[0].email,
      'successfulPublish',
      false
    );

    expect(wrapper.state('appContacts')).toMatchSnapshot();
  });
});

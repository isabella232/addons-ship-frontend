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
});

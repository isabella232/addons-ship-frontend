import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import View, { Props } from '.';

describe('NotificationSettings View', () => {
  const defaultProps: Props = {
    onAddEmail: jest.fn(),
    appContacts: [],
    onNotificationPreferenceChanged: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });
});

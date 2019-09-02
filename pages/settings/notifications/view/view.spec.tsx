import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import View, { Props } from '.';

describe('NotificationSettings View', () => {
  const defaultProps: Props = {
    onAddEmail: jest.fn(),
    onCancel: jest.fn(),
    onDeleteContact: jest.fn(),
    appContacts: [],
    onNotificationPreferenceChanged: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} error="Something went wrong" />));

    expect(tree).toMatchSnapshot();
  });

  it('has an enabled save button', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} onSave={jest.fn()} />));

    expect(tree).toMatchSnapshot();
  });
});

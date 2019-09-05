import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import View, { Props } from '.';

describe('NotificationSettings View', () => {
  const defaultProps: Props = {
    hasLoaded: true,
    isSaving: false,
    isAddingEmail: false,
    email: '',
    onAddEmail: jest.fn(),
    onCancel: jest.fn(),
    onDeleteContact: jest.fn(),
    appContacts: [],
    onNotificationPreferenceChanged: jest.fn(),
    onEmailChange: jest.fn()
  };

  it('renders correctly', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} />));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly while loading', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} hasLoaded={false} />));

    expect(tree).toMatchSnapshot();
  });

  it('renders correctly while saving', () => {
    const tree = shallowToJson(shallow(<View {...defaultProps} isSaving />));

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

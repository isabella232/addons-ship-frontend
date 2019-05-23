import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import AppSummary from '.';

describe('AppSummary', () => {
  it('renders correctly', () => {
    const tree = toJSON(
      shallow(
        <AppSummary
          title="My app v1.1.0 (28)"
          description="This is a short description about my app. It is a good app. End of description."
          note="Updated on January 29, 2008"
          iconUrl="/static/icon-flutter.svg"
          platformIconUrl="/static/icon-apple.svg"
        />
      )
    );
    expect(tree).toMatchSnapshot();
  });
});

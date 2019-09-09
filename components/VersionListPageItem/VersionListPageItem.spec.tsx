import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import VersionListPageItem from '.';

describe('VersionListPageItem', () => {
  it('renders correctly', () => {
    const component = shallow(
      <VersionListPageItem
        detailsPagePath="/v1-1-0/details"
        detailsPagePathHref="/v1-1-0/details"
        platform="ios"
        title="My app v1.1.0 (28)"
        description="This is a short description about my 1. app. It is a good app. End of description."
        note="Updated on January 1, 2008"
      />
    );
    expect(toJSON(component)).toMatchSnapshot();
  });

  it('renders correctly for android', () => {
    const component = shallow(
      <VersionListPageItem
        detailsPagePath="/v1-1-0/details"
        detailsPagePathHref="/v1-1-0/details"
        platform="android"
        title="My app v1.1.0 (28)"
        description="This is a short description about my 1. app. It is a good app. End of description."
        note="Updated on January 1, 2008"
        productFlavour="banana"
      />
    );
    expect(toJSON(component)).toMatchSnapshot();
  });

  it('shows more description', () => {
    const component = shallow(
      <VersionListPageItem
        detailsPagePath="/v1-1-0/details"
        detailsPagePathHref="/v1-1-0/details"
        platform="ios"
        title="My app v1.1.0 (28)"
        description="This is a short description about my 1. app. It is a good app. End of description."
        note="Updated on January 1, 2008"
      />
    );

    const button = component.find('.descriptionWrapper');
    button.simulate('click');

    expect(toJSON(component)).toMatchSnapshot();
  });
});

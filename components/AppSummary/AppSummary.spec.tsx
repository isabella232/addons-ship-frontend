jest.mock('@/utils/media');

import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { mediaQuery } from '@/utils/media';

import AppSummary from '.';

describe('AppSummary', () => {
  describe('renders correctly', () => {
    const factory = () => (
      <AppSummary
        platform="ios"
        title="My app v1.1.0 (28)"
        description="This is a short description about my app. It is a good app. End of description."
        note="Updated on January 29, 2008"
        iconUrl="/static/icon-flutter.svg"
        detailsPagePath="/details"
        detailsPagePathHref="/details"
      />
    );

    test('on desktop', () => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([true, true]);
      const tree = shallowToJson(shallow(factory()));
      expect(tree).toMatchSnapshot();
    });

    test('on tablet', () => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([true, false]);
      const tree = shallowToJson(shallow(factory()));
      expect(tree).toMatchSnapshot();
    });

    test('on mobile', () => {
      (mediaQuery as jest.Mock).mockReturnValueOnce([false, false]);
      const tree = shallowToJson(shallow(factory()));
      expect(tree).toMatchSnapshot();
    });
  });
});

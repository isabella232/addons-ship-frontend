jest.mock('@/utils/media');
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import { mediaQuery } from '@/utils/media';

import View, { Props as ViewProps, NotificationSetting } from '.';

describe('Confirm Email View', () => {
  const defaultProps: ViewProps = {
    appSlug: 'test-app-slug-1',
    appIconUrl: 'some-img.url',
    appTitle: 'Super App',
    platform: 'ios',
    notificationPreferences: {
      failedPublish: true,
      newVersion: true,
      successfulPublish: false
    }
  };

  describe('it renders without errors', () => {
    test('on desktop', () => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);

      const tree = shallowToJson(shallow(<View {...defaultProps} />));

      expect(tree).toMatchSnapshot();
    });

    test('on mobile', () => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);

      const tree = shallowToJson(shallow(<View {...defaultProps} />));

      expect(tree).toMatchSnapshot();
    });
  });

  describe('NotificationSetting', () => {
    const cases = [{ isEnabled: true, label: "when it's on" }, { isEnabled: false, label: "when it's off" }];

    cases.forEach(({ isEnabled, label }) =>
      test(label, () => {
        const tree = shallowToJson(shallow(<NotificationSetting isEnabled={isEnabled}>{label}</NotificationSetting>));

        expect(tree).toMatchSnapshot();
      })
    );
  });
});

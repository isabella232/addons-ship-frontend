jest.mock('@/utils/media');

import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { mockAppVersion } from '@/mocks';
import { mediaQuery } from '@/utils/media';

import DetailsView from './view';
import { AppVersionDetails, State } from './';
import Dropzone from '@/components/Dropzone';

describe('AppVersionDetailsView', () => {
  const defaultProps = {
    appVersion: mockAppVersion,
    showTooltips: true,
    selectedDeviceIdForScreenshots: 'x',
    availableDevices: [
      { key: 'iphone65', value: 'iPhone 6.5”' },
      { key: 'iphone58', value: 'iPhone 5.8”' },
      { key: 'iphone55', value: 'iPhone 5.5”' },
      { key: 'iphone47', value: 'iPhone 4.7”' }
    ],
    onScreenshotAdded: jest.fn(),
    removeScreenshot: jest.fn(),
    onDeviceSelected: jest.fn()
  };
  it('renders the details view correctly for desktop', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);

    const tree = toJSON(mount(<DetailsView {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the details view correctly for mobile', () => {
    (mediaQuery as jest.Mock).mockReturnValue([false]);
    const tree = toJSON(mount(<DetailsView {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });
});

describe('AppVersionDetails', () => {
  const defaultProps = {
    appVersion: mockAppVersion,
    updateAppVersion: jest.fn()
  };

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('triggers a save', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const mockUpdateAppVersion = jest.fn();
    const tree = mount(<AppVersionDetails {...defaultProps} updateAppVersion={mockUpdateAppVersion} />);

    tree
      .find('button')
      .first()
      .simulate('click');

    expect(mockUpdateAppVersion).toHaveBeenCalled();
  });

  it('triggers a state update when a form item is modified', () => {
    const tree = mount(<AppVersionDetails {...defaultProps} />);

    const key = 'description',
      value = 'Such description! wow';

    tree.find('form').simulate('change', { target: { name: key, value } });
    expect(tree.state('updatedAppVersion')).toEqual({
      ...mockAppVersion,
      [key]: value
    });
  });

  it('appends a screenshot', async () => {
    // This test logs a false positive error regarding act(...)
    console.error = () => {};

    (global as any).URL.createObjectURL = jest.fn();
    const wrap = mount(<AppVersionDetails {...defaultProps} />);

    const files = [new File([], 'file.png')];

    await wrap
      .find(Dropzone)
      .find('input[type="file"]')
      .simulate('change', {
        preventDefault: () => {},
        persist: () => {},
        target: { files }
      });

    expect(wrap.state('screenshotList')).toMatchSnapshot();
  });

  describe('Component methods', () => {
    const wrap = shallow(<AppVersionDetails {...defaultProps} />);
    const deviceId = 'iphone65',
      otherDeviceId = 'other-iphone65',
      screenshot = new File([], 'image.png');

    // prettier-ignore
    const screenshotList = {
    [deviceId]: { deviceName: 'iPhone 6.5”', screenshots: [screenshot]},
    [otherDeviceId]: { deviceName: 'iPhone 6.5”', screenshots: [screenshot]},
  };

    beforeEach(() => {
      wrap.setState({ screenshotList, selectedDeviceIdForScreenshots: deviceId });
    });

    it('removes a screenshot', () => {
      expect((wrap.state() as State).screenshotList.iphone65.screenshots).toHaveLength(1);

      (wrap.instance() as AppVersionDetails).removeScreenshot(deviceId, screenshot);

      expect((wrap.state() as State).screenshotList.iphone65.screenshots).toHaveLength(0);
    });

    it('onDeviceSelected', () => {
      (wrap.instance() as AppVersionDetails).onDeviceSelected(otherDeviceId);

      expect(wrap.state('selectedDeviceIdForScreenshots')).toBe(otherDeviceId);
    });
  });
});

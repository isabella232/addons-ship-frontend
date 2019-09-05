jest.mock('@/utils/media');
jest.mock('@/utils/device');
jest.mock('@/ducks/appVersion');
jest.mock('@/services/settings');

import { shallow, mount, ShallowWrapper } from 'enzyme';
import toJSON, { shallowToJson, mountToJson } from 'enzyme-to-json';

import { mockAppVersion, mockAppVersionWithoutPublicPage, mockAndroidAppVersion, mockSettings } from '@/mocks';
import { mediaQuery } from '@/utils/media';
import { isAndroid, osVersion, mobileModel, compareVersions } from '@/utils/device';
import settingService from '@/services/settings';
import Dropzone from '@/components/Dropzone';
import { AppVersionEvent, Screenshot, FeatureGraphic, AppVersion, AppVersionEventStatus } from '@/models';

import DetailsView, { Props as AppVersionDetailsViewProps } from './view';
import { AppVersionDetails, State, Props as AppVersionDetailsProps } from './';

describe('AppVersionDetailsView', () => {
  const defaultProps: AppVersionDetailsViewProps = {
    appVersion: mockAppVersion,
    hasMounted: true,
    selectedDeviceIdForScreenshots: 'iphone65',
    availableDevices: [
      { key: 'iphone65', value: 'iPhone 6.5”', isMarked: false },
      { key: 'iphone58', value: 'iPhone 5.8”', isMarked: false },
      { key: 'iphone55', value: 'iPhone 5.5”', isMarked: false },
      { key: 'iphone47', value: 'iPhone 4.7”', isMarked: false }
    ],
    onScreenshotAdded: jest.fn(),
    removeScreenshot: jest.fn(),
    onDeviceSelected: jest.fn(),
    onFeatureGraphicAdded: jest.fn(),
    removeFeatureGraphic: jest.fn(),
    shouldEnableInstall: true,
    readyForPublish: true,
    isPublishInProgress: false,
    publishTarget: 'App Store Connect',
    settingsPath: '/path',
    activityPath: '/path',
    latestEventStatus: null,
    isSaving: false
  };

  beforeAll(() => {
    (compareVersions as jest.Mock).mockReturnValue(0);
    (settingService.isComplete as jest.Mock).mockReturnValue(true);
  });

  describe('when viewed on desktop', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(mount(<DetailsView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });

    describe('when public install page is not enabled', () => {
      it('renders the details view with disabled sidebar', () => {
        const tree = toJSON(mount(<DetailsView {...defaultProps} appVersion={mockAppVersionWithoutPublicPage} />));
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when not ready for publish', () => {
      it('renders the details view with warning, and the publish button disabled', () => {
        const tree = toJSON(mount(<DetailsView {...defaultProps} readyForPublish={false} />));
        expect(tree).toMatchSnapshot();
      });
    });

    describe('when publish is in progress', () => {
      it('renders the details view with notification, and the publish button disabled', () => {
        const tree = toJSON(
          mount(
            <DetailsView {...defaultProps} latestEventStatus={AppVersionEventStatus.InProgress} isPublishInProgress />
          )
        );
        expect(tree).toMatchSnapshot();
      });
    });

    test('when publish has finished successfully', () => {
      const tree = shallowToJson(
        shallow(<DetailsView {...defaultProps} latestEventStatus={AppVersionEventStatus.Finished} />)
      );

      expect(tree).toMatchSnapshot();
    });

    test('when publish has failed', () => {
      const tree = shallowToJson(
        shallow(<DetailsView {...defaultProps} latestEventStatus={AppVersionEventStatus.Failed} />)
      );

      expect(tree).toMatchSnapshot();
    });

    describe('when Publish button is selected', () => {
      it('calls publish method', () => {
        const mockPublish = jest.fn() as any;
        const tree = mount(<DetailsView {...defaultProps} onPublish={mockPublish} />);

        tree
          .find('button')
          .findWhere(button => button.text() === 'Publish')
          .first()
          .simulate('click');

        expect(mockPublish).toHaveBeenCalled();
      });
    });

    test('while saving', () => {
      const tree = mountToJson(mount(<DetailsView {...defaultProps} isSaving />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when viewed on mobile', () => {
    beforeAll(() => {
      (mediaQuery as jest.Mock).mockReturnValue([false]);
    });

    it('renders the details view correctly', () => {
      const tree = toJSON(mount(<DetailsView {...defaultProps} />));
      expect(tree).toMatchSnapshot();
    });

    test('while saving', () => {
      const tree = mountToJson(mount(<DetailsView {...defaultProps} isSaving />));
      expect(tree).toMatchSnapshot();
    });
  });

  describe('when an Android app version is viewed', () => {
    it('renders with Android version correctly', () => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
      const tree = toJSON(
        mount(<DetailsView {...defaultProps} appVersion={mockAndroidAppVersion} publishTarget="Google Play Store" />)
      );
      expect(tree).toMatchSnapshot();
    });
  });
});

describe('AppVersionDetails', () => {
  const defaultProps: AppVersionDetailsProps = {
    appSlug: 'an-app-slug',
    versionId: '123',
    appVersion: mockAppVersion,
    settings: mockSettings,
    fetchSettings: jest.fn() as any,
    updateAppVersion: jest.fn() as any,
    uploadScreenshots: jest.fn() as any,
    deleteScreenshot: jest.fn() as any,
    uploadFeatureGraphic: jest.fn() as any,
    deleteFeatureGraphic: jest.fn() as any,
    publishAppVersion: jest.fn() as any,
    startPollPublishStatus: jest.fn() as any,
    cancelPollPublishStatus: jest.fn() as any,
    appVersionEvents: [],
    isSaving: false
  };

  beforeEach(() => {
    const {
      fetchSettings,
      updateAppVersion,
      uploadScreenshots,
      deleteScreenshot,
      uploadFeatureGraphic,
      deleteFeatureGraphic,
      publishAppVersion,
      startPollPublishStatus,
      cancelPollPublishStatus
    } = defaultProps;

    (([
      fetchSettings,
      updateAppVersion,
      uploadScreenshots,
      deleteScreenshot,
      uploadFeatureGraphic,
      deleteFeatureGraphic,
      publishAppVersion,
      startPollPublishStatus,
      cancelPollPublishStatus
    ] as any) as jest.Mock[]).forEach(mock => mock.mockReset());
  });

  it('renders correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} />));
    expect(tree).toMatchSnapshot();
  });

  it('renders the loading state correctly', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={null} />));
    expect(tree).toMatchSnapshot();
  });

  it('disables install button when there is no public install page', () => {
    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAppVersionWithoutPublicPage} />));
    expect(tree).toMatchSnapshot();
  });

  it('disables install button when device is from different platform', () => {
    (isAndroid as jest.Mock).mockReturnValue(false);

    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />));
    expect(tree).toMatchSnapshot();
  });

  it('disables install button when device is from a lower version', () => {
    (isAndroid as jest.Mock).mockReturnValue(true);
    (osVersion as jest.Mock).mockReturnValue('1.0.2');

    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />));
    expect(tree).toMatchSnapshot();
  });

  it('disables install button when device is not supported', () => {
    (isAndroid as jest.Mock).mockReturnValue(true);
    (osVersion as jest.Mock).mockReturnValue('1.0.3');
    (mobileModel as jest.Mock).mockReturnValue('iphone');

    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />));
    expect(tree).toMatchSnapshot();
  });

  it('enables install button when there is public install page, device is same platform, same version, supported', () => {
    (isAndroid as jest.Mock).mockReturnValue(true);
    (osVersion as jest.Mock).mockReturnValue('1.0.3');
    (mobileModel as jest.Mock).mockReturnValue('phone');

    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />));
    expect(tree).toMatchSnapshot();
  });

  it('enables install button when there is public install page, device is same platform, newer version, supported', () => {
    (isAndroid as jest.Mock).mockReturnValue(true);
    (osVersion as jest.Mock).mockReturnValue('1.0.4');
    (mobileModel as jest.Mock).mockReturnValue('phone');

    const tree = toJSON(shallow(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />));
    expect(tree).toMatchSnapshot();
  });

  it('triggers a save', () => {
    (mediaQuery as jest.Mock).mockReturnValue([true]);
    const mockUpdateAppVersion = jest.fn() as any;
    const mockUploadScreenshots = jest.fn() as any;
    const wrap = mount(
      <AppVersionDetails
        {...defaultProps}
        updateAppVersion={mockUpdateAppVersion}
        uploadScreenshots={mockUploadScreenshots}
      />
    );

    const spy = jest.spyOn(wrap.instance() as AppVersionDetails, 'onSave');
    wrap.instance().forceUpdate();

    wrap
      .find('button')
      .first()
      .simulate('click');

    expect(mockUpdateAppVersion).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  describe('when publish is selected', () => {
    it('triggers publish, updates then resets state', async () => {
      (mediaQuery as jest.Mock).mockReturnValue([true]);
      const mockPublishAppVersion = jest.fn() as any;
      const { startPollPublishStatus } = defaultProps;
      const wrap = shallow(<AppVersionDetails {...defaultProps} publishAppVersion={mockPublishAppVersion} />);
      const onPublish = (wrap.instance() as AppVersionDetails).onPublish();

      await onPublish;

      expect(mockPublishAppVersion).toHaveBeenCalled();
      expect(startPollPublishStatus).toHaveBeenCalled();
    });

    test('without a loaded appVersion', () => {
      const { publishAppVersion } = defaultProps;

      const wrap = shallow(<AppVersionDetails {...defaultProps} appVersion={null} />);
      (wrap.instance() as AppVersionDetails).onPublish();

      expect(publishAppVersion).not.toHaveBeenCalled();
    });
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

  it('appends a feature graphic for Android apps', async () => {
    // This test logs a false positive error regarding act(...)
    console.error = () => {};

    (global as any).URL.createObjectURL = jest.fn();
    const wrap = mount(<AppVersionDetails {...defaultProps} appVersion={mockAndroidAppVersion} />);

    const files = [new File([], 'file.png')];

    await wrap
      .find(Dropzone)
      .last()
      .find('input[type="file"]')
      .simulate('change', {
        preventDefault: () => {},
        persist: () => {},
        target: { files }
      });

    expect(wrap.state('featureGraphic')).toMatchSnapshot();
  });

  describe('Component methods', () => {
    let wrap: ShallowWrapper;
    const deviceId = 'iphone65',
      otherDeviceId = 'other-iphone65',
      screenshot = new Screenshot('screenshot-id', 'image.png', new File([], 'image.png'), 1000, 'iPhone 6.5”');

    beforeEach(() => {
      // prettier-ignore
      const screenshotList = {
        [deviceId]: { deviceName: 'iPhone 6.5”', screenshots: [screenshot]},
        [otherDeviceId]: { deviceName: 'iPhone 5.8”', screenshots: [new Screenshot('screenshot-2', 'image2.png', new File([], 'image2.jpg'))]},
        'device-without-screenshots': { deviceName: 'whatever', screenshots: null }
      };
      wrap = shallow(<AppVersionDetails {...defaultProps} />);

      wrap.setState({
        screenshotList,
        featureGraphic: undefined,
        selectedDeviceIdForScreenshots: deviceId,
        screenshotIdsToDelete: []
      });
    });

    describe('removeScreenshot', () => {
      it('removes a new screenshot', () => {
        expect((wrap.state() as State).screenshotList.iphone65.screenshots).toHaveLength(1);

        (wrap.instance() as AppVersionDetails).removeScreenshot(deviceId, screenshot);

        expect((wrap.state() as State).screenshotList.iphone65.screenshots).toHaveLength(0);
      });

      it('removes an already uploaded screenshot from the preview, and marks it for delete', () => {
        const screenshotId = 'screenshot-id',
          screenshot = new Screenshot(screenshotId, 'image.png', 'some.url', 1000, 'iPhone 6.5”'),
          screenshotList = {
            [deviceId]: { deviceName: 'iPhone 6.5”', screenshots: [screenshot] }
          };

        wrap.setState({ screenshotList });

        (wrap.instance() as AppVersionDetails).removeScreenshot(deviceId, screenshot);

        expect((wrap.state() as State).screenshotIdsToDelete).toEqual([screenshotId]);
      });
    });

    it('removes feature graphic', () => {
      wrap.setState({ featureGraphic: new FeatureGraphic('some-id', 'img.jpg', 'some.url') });
      expect((wrap.state() as State).featureGraphic).not.toBeUndefined();

      (wrap.instance() as AppVersionDetails).removeFeatureGraphic();

      expect((wrap.state() as State).featureGraphic).toBeUndefined();
    });

    test('onDeviceSelected', () => {
      (wrap.instance() as AppVersionDetails).onDeviceSelected(otherDeviceId);

      expect(wrap.state('selectedDeviceIdForScreenshots')).toBe(otherDeviceId);
    });

    test('getUploadableScreenshots', () => {
      const uploadableScreenshots = (wrap.instance() as AppVersionDetails).getUploadableScreenshots();
      expect(uploadableScreenshots).toMatchSnapshot();
    });

    describe('onSave', () => {
      it('calls update and uploads', () => {
        const { updateAppVersion, uploadScreenshots, deleteScreenshot } = defaultProps;
        (wrap.instance() as AppVersionDetails).onSave();

        expect(updateAppVersion).toHaveBeenCalled();
        expect(uploadScreenshots).toHaveBeenCalled();
        expect(deleteScreenshot).not.toHaveBeenCalled();
      });

      it('uploads screenshots if there are new ones', () => {
        const { uploadScreenshots } = defaultProps;

        (wrap.instance() as AppVersionDetails).onScreenshotAdded(deviceId, [new File([], 'whatever.jpg')]);
        (wrap.instance() as AppVersionDetails).onSave();
        expect(uploadScreenshots).toHaveBeenCalled();
      });

      it('deletes sscreenshots', () => {
        const { deleteScreenshot, appVersion } = defaultProps,
          { appSlug, id } = appVersion as AppVersion,
          screenshotId = 'screenshot-to-delete';
        wrap.setState({ screenshotIdsToDelete: [screenshotId] });
        (wrap.instance() as AppVersionDetails).onSave();

        expect(deleteScreenshot).toHaveBeenCalledWith(appSlug, id, screenshotId);
      });

      it('deletes the feature graphic', () => {
        const { deleteFeatureGraphic, appVersion } = defaultProps,
          { appSlug, id } = appVersion as AppVersion;

        wrap.setState({ isFeatureGraphicMarkedForDelete: true });

        (wrap.instance() as AppVersionDetails).onSave();

        expect(deleteFeatureGraphic).toHaveBeenCalledWith(appSlug, id);
      });

      test('without a loaded appVersion', () => {
        const { updateAppVersion } = defaultProps;

        const wrap = shallow(<AppVersionDetails {...defaultProps} appVersion={null} />);
        (wrap.instance() as AppVersionDetails).onSave();

        expect(updateAppVersion).not.toHaveBeenCalled();
      });
    });

    test('shouldEnableInstall', () => {
      wrap.setProps({ appVersion: null });
      expect((wrap.instance() as AppVersionDetails).shouldEnableInstall()).toBe(false);
    });

    describe('readyForPublish', () => {
      test('when settings are filled out', () => {
        (settingService.isComplete as jest.Mock).mockReturnValue(true);
        expect((wrap.instance() as AppVersionDetails).readyForPublish()).toBeTruthy();
      });

      test('when settings are incomplete', () => {
        (settingService.isComplete as jest.Mock).mockReturnValue(false);
        expect((wrap.instance() as AppVersionDetails).readyForPublish()).toBeFalsy();
      });

      test('when appVersion is null', () => {
        wrap.setProps({ appVersion: null });
        expect((wrap.instance() as AppVersionDetails).readyForPublish()).toBe(false);
      });
    });

    describe('onScreenshotAdded', () => {
      test('when appVersion is null', () => {
        wrap.setProps({ appVersion: null });
        expect((wrap.instance() as AppVersionDetails).onScreenshotAdded('x', [])).toBeUndefined();
      });
    });
  });

  it('starts polling events', () => {
    const startPollPublishStatus = jest.fn() as any;
    shallow(<AppVersionDetails {...defaultProps} startPollPublishStatus={startPollPublishStatus} />);

    expect(startPollPublishStatus).toHaveBeenCalledWith(mockAppVersion);
  });

  describe('componentDidUpdate', () => {
    it('sets the latest event', () => {
      const cancelPollPublishStatus = jest.fn() as any;
      const wrapper = shallow(
        <AppVersionDetails {...defaultProps} cancelPollPublishStatus={cancelPollPublishStatus} />
      );

      const event = {
        id: 'some-id',
        status: AppVersionEventStatus.InProgress
      } as AppVersionEvent;

      wrapper.setProps({ appVersionEvents: [event] });

      const { state } = wrapper.instance();

      expect(state).toMatchSnapshot();
      expect(cancelPollPublishStatus).not.toHaveBeenCalled();
    });

    it('stops polling', () => {
      const cancelPollPublishStatus = jest.fn() as any;
      const wrapper = shallow(
        <AppVersionDetails {...defaultProps} cancelPollPublishStatus={cancelPollPublishStatus} />
      );

      const event = { status: AppVersionEventStatus.Finished } as AppVersionEvent;

      wrapper.setProps({ appVersionEvents: [event] });
      expect(cancelPollPublishStatus).toHaveBeenCalled();
    });
  });

  describe('componentWillUnmount', () => {
    it('stops polling', () => {
      const cancelPollPublishStatus = jest.fn() as any;
      const wrapper = shallow(
        <AppVersionDetails {...defaultProps} cancelPollPublishStatus={cancelPollPublishStatus} />
      );

      wrapper.unmount();
      expect(cancelPollPublishStatus).toHaveBeenCalled();
    });
  });
});

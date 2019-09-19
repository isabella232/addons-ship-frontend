import { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import update from 'lodash/update';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { Flex, ProgressBitbot } from '@bitrise/bitkit';

import { isAndroid, isIOS, osVersion, mobileModel, compareVersions } from '@/utils/device';
import { AppVersion, AppVersionEvent, FeatureGraphic, Screenshot, AppVersionEventStatus } from '@/models';
import { Settings, IosSettings, AndroidSettings } from '@/models/settings';
import { Uploadable, ScreenshotResponse } from '@/models/uploadable';
import { RootState } from '@/store';
import {
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  publishAppVersion,
  pollPublishStatus,
  fetchAppVersionEvents,
  fetchAppVersion
} from '@/ducks/appVersion';
import { fetchSettings } from '@/ducks/settings';
import { orderedAppVersionEvents } from '@/ducks/selectors';
import settingService from '@/services/settings';

import View from './view';

export type Props = {
  appSlug: string;
  versionId: string;
  isSaving: boolean;
  appVersion: AppVersion | null;
  settings: Settings;
  appVersionEvents: AppVersionEvent[];
  updateAppVersion: typeof updateAppVersion;
  uploadScreenshots: typeof uploadScreenshots;
  deleteScreenshot: typeof deleteScreenshot;
  uploadFeatureGraphic: typeof uploadFeatureGraphic;
  deleteFeatureGraphic: typeof deleteFeatureGraphic;
  fetchAppVersionEvents: typeof fetchAppVersionEvents;

  publishAppVersion: typeof publishAppVersion;
  startPollPublishStatus: typeof pollPublishStatus.start;
  cancelPollPublishStatus: typeof pollPublishStatus.cancel;
  fetchSettings: typeof fetchSettings;
  fetchAppVersion: typeof fetchAppVersion;
};

export type State = {
  hasMounted: boolean;
  updatedAppVersion: AppVersion | null;
  screenshotList: { [deviceId: string]: DeviceScreenshots };
  featureGraphic?: FeatureGraphic;
  selectedDeviceIdForScreenshots: string | null;
  readyForPublish?: boolean;
  latestEvent: AppVersionEvent | null;
  isPublishInProgress: boolean;
  screenshotIdsToDelete: string[];
  isFeatureGraphicMarkedForDelete: boolean;
};

type DeviceScreenshots = {
  deviceId: string;
  deviceName: string;
  screenshots?: Screenshot[];
};

const iosDevices = {
    'iOS-4-in': {
      deviceName: 'iPhone 4"',
      deviceId: 'iOS-4-in'
    },
    'iOS-4-7-in': {
      deviceName: 'iPhone 4.7"',
      deviceId: 'iOS-4-7-in'
    },
    'iOS-5-5-in': {
      deviceName: 'iPhone 5.5"',
      deviceId: 'iOS-5-5-in'
    },
    'iOS-5-8-in': {
      deviceName: 'iPhone 5.8"',
      deviceId: 'iOS-5-8-in'
    },
    'iOS-6-5-in': {
      deviceName: 'iPhone 6.5"',
      deviceId: 'iOS-6-5-in'
    },
    'iOS-iPad': {
      deviceName: 'iPad',
      deviceId: 'iOS-iPad'
    },
    'iOS-iPad-Pro': {
      deviceName: 'iPad Pro',
      deviceId: 'iOS-iPad-Pro'
    },
    'iOS-iPad-Pro-10-5-in': {
      deviceName: 'iPad Pro 10.5"',
      deviceId: 'iOS-iPad-Pro-10-5-in'
    },
    'iOS-iPad-Pro-11-in': {
      deviceName: 'iPad Pro 11"',
      deviceId: 'iOS-iPad-Pro-11-in'
    },
    'iOS-iPad-Pro-2018': {
      deviceName: 'iPad Pro 2018"',
      deviceId: 'iOS-iPad-Pro-2018'
    },
    tVOS: {
      deviceName: 'tvOS',
      deviceId: 'tVOS'
    }
  },
  androidDevices = {
    phone: {
      deviceName: 'Phone',
      deviceId: 'phone'
    },
    tablet: {
      deviceName: 'Tablet',
      deviceId: 'tablet'
    },
    androidTV: {
      deviceName: 'Android TV',
      deviceId: 'androidTV'
    },
    wearOS: {
      deviceName: 'Wear OS',
      deviceId: 'wearOS'
    }
  };

const initialState: State = {
  hasMounted: false,
  updatedAppVersion: null,
  screenshotList: {},
  featureGraphic: undefined,
  selectedDeviceIdForScreenshots: null,
  latestEvent: null,
  isPublishInProgress: false,
  screenshotIdsToDelete: [],
  isFeatureGraphicMarkedForDelete: false
};

export class AppVersionDetails extends Component<Props, State> {
  state = initialState;

  componentDidMount() {
    const { appSlug, versionId, fetchAppVersion, fetchSettings } = this.props;

    fetchAppVersion(appSlug, versionId);
    fetchSettings(appSlug);
    this.init();
  }

  componentDidUpdate({ appVersionEvents: prevEvents, appVersion: prevAppVersion }: Props) {
    const { appVersionEvents: events, cancelPollPublishStatus, versionId } = this.props;

    if (events.length && !isEqual(events, prevEvents)) {
      const latestEvent = events[0];

      if (latestEvent) {
        const isPublishInProgress = latestEvent.status === AppVersionEventStatus.InProgress;

        this.setState({ latestEvent, isPublishInProgress });

        if (!isPublishInProgress) {
          cancelPollPublishStatus();
        }
      }
    }

    if ((prevAppVersion || ({} as any)).id !== versionId) {
      this.init();
    }
  }

  componentWillUnmount() {
    const { cancelPollPublishStatus } = this.props;

    cancelPollPublishStatus();
  }

  init = () => {
    const { appSlug, versionId, appVersion, startPollPublishStatus, fetchAppVersionEvents } = this.props;
    if (appVersion && appVersion.id === versionId) {
      fetchAppVersionEvents(appSlug, versionId);
      const newScreenshotList = cloneDeep(appVersion.platform === 'ios' ? iosDevices : androidDevices);

      this.setState({
        hasMounted: true,
        updatedAppVersion: appVersion
      });
      startPollPublishStatus(appVersion);

      appVersion.screenshotDatas.forEach(({ id, filename, downloadUrl, filesize, deviceType }: ScreenshotResponse) => {
        const screenshot = new Screenshot(id, filename, downloadUrl, filesize, deviceType);

        let deviceId = Object.keys(newScreenshotList).find(
          key => newScreenshotList[key].deviceName === screenshot.deviceType
        ) as string; // TODO this is breaking probably
        if (!deviceId) {
          deviceId = screenshot.deviceType as string;
        }

        if (!newScreenshotList[deviceId]) {
          newScreenshotList[deviceId] = {
            deviceName: deviceId
          };
        }
        if (!newScreenshotList[deviceId].screenshots) {
          newScreenshotList[deviceId].screenshots = [];
        }

        (newScreenshotList[deviceId].screenshots as Screenshot[]).push(screenshot);
      });

      this.setState({
        screenshotList: newScreenshotList,
        selectedDeviceIdForScreenshots: Object.keys(newScreenshotList)[0]
      });

      if (appVersion.featureGraphicData) {
        const { id, filename, downloadUrl } = appVersion.featureGraphicData;
        this.setState({ featureGraphic: new FeatureGraphic(id, filename, downloadUrl) });
      }
    }
  };

  onChange = (key: string, newValue: string) => {
    if (!key) return;

    const { updatedAppVersion } = this.state;

    this.setState({
      updatedAppVersion: { ...updatedAppVersion, [key]: newValue } as AppVersion
    });
  };

  getUploadableScreenshots = (): [Uploadable[], File[]] => {
    const { screenshotList } = this.state;

    const uploadables: Uploadable[] = [],
      files: File[] = [];

    filter(screenshotList, 'screenshots').forEach(({ deviceId, screenshots }) => {
      const pendingScreenshots = (screenshots as Screenshot[]).filter(screenshot => screenshot.type() === 'pending');
      uploadables.push(
        ...pendingScreenshots.map(s => ({
          filename: s.name,
          filesize: s.size as number,
          deviceType: deviceId,
          screenSize: deviceId
        }))
      );

      files.push(...pendingScreenshots.map(screenshot => screenshot.file));
    });

    return [uploadables, files];
  };

  onSave = () => {
    const {
      appVersion,
      updateAppVersion,
      uploadScreenshots,
      deleteScreenshot,
      uploadFeatureGraphic,
      deleteFeatureGraphic
    } = this.props;

    if (!appVersion) {
      return;
    }

    const { appSlug, id } = appVersion;
    const { updatedAppVersion, screenshotIdsToDelete, featureGraphic, isFeatureGraphicMarkedForDelete } = this.state;

    /* istanbul ignore next */
    if (window.analytics) {
      window.analytics.track('Ship Add-On AppVersionDetails Save', {
        addonId: 'addons-ship',
        appSlug,
        appVersionId: id
      });
    }

    if (screenshotIdsToDelete.length > 0) {
      screenshotIdsToDelete.forEach(screenshotId => deleteScreenshot(appSlug, id.toString(), screenshotId));
    }

    updateAppVersion(updatedAppVersion as AppVersion);

    const [uploadables, files] = this.getUploadableScreenshots();

    if (uploadables.length > 0) {
      uploadScreenshots(appSlug, id.toString(), uploadables, files);
    }

    if (featureGraphic && featureGraphic.type() === 'pending') {
      uploadFeatureGraphic(appSlug, id.toString(), featureGraphic);
    } else if (isFeatureGraphicMarkedForDelete) {
      deleteFeatureGraphic(appSlug, id.toString());
    }
  };

  onPublish = async () => {
    const { appVersion, publishAppVersion, startPollPublishStatus } = this.props;

    if (!appVersion) {
      return;
    }

    const { appSlug, id } = appVersion;

    /* istanbul ignore next */
    if (window.analytics) {
      window.analytics.track('Ship Add-On AppVersionDetails Publish', {
        addonId: 'addons-ship',
        appSlug,
        appVersionId: id
      });
    }

    publishAppVersion(appVersion);
    this.setState({ isPublishInProgress: true });

    startPollPublishStatus(appVersion);
  };

  onScreenshotAdded = (deviceId: string, files: File[]) => {
    const { appVersion } = this.props;

    if (!appVersion) {
      return;
    }

    const { appSlug, id } = appVersion;

    /* istanbul ignore next */
    if (window.analytics) {
      window.analytics.track('Ship Add-On AppVersionDetails Added Screenshot', {
        addonId: 'addons-ship',
        appSlug,
        appVersionId: id,
        deviceId
      });
    }

    const screenshotList = update({ ...this.state.screenshotList }, `${deviceId}.screenshots`, (screenshots = []) =>
      screenshots.concat(
        files.map(
          (file: File) => new Screenshot('', file.name, file, file.size, this.state.screenshotList[deviceId].deviceName)
        )
      )
    );

    this.setState({ screenshotList });
  };

  removeScreenshot = (deviceId: string, screenshot: Screenshot) => {
    if (screenshot.src) {
      this.setState({ screenshotIdsToDelete: [...this.state.screenshotIdsToDelete, screenshot.id] });
    }
    const screenshotList = update({ ...this.state.screenshotList }, `${deviceId}.screenshots`, (screenshots = []) =>
      screenshots.filter((file: Screenshot) => file !== screenshot)
    );

    this.setState({ screenshotList });
  };

  onFeatureGraphicAdded = (file: File) => {
    this.setState({ featureGraphic: new FeatureGraphic('', file.name, file, file.size) });
  };

  removeFeatureGraphic = () => {
    const { featureGraphic } = this.state;
    let deleteFeatureGraphic = false;
    if ((featureGraphic as FeatureGraphic).type() === 'uploaded' || this.state.isFeatureGraphicMarkedForDelete) {
      deleteFeatureGraphic = true;
    }

    this.setState({ featureGraphic: undefined, isFeatureGraphicMarkedForDelete: deleteFeatureGraphic });
  };

  onDeviceSelected = (deviceId: string) => {
    this.setState({ selectedDeviceIdForScreenshots: deviceId });
  };

  shouldEnableInstall = () => {
    const { appVersion } = this.props;
    if (!appVersion) {
      return false;
    }

    if (!appVersion.publicInstallPageURL) {
      return false;
    }

    if ((appVersion.platform === 'android' && !isAndroid()) || (appVersion.platform === 'ios' && !isIOS())) {
      return false;
    }

    if (compareVersions(appVersion.version, osVersion()) < 0) {
      return false;
    }

    if (!appVersion.supportedDeviceTypes.includes(mobileModel())) {
      return false;
    }

    return true;
  };

  readyForPublish = (): boolean => {
    const { appVersion, settings } = this.props;

    if (!appVersion) {
      return false;
    }

    return settingService.isComplete(appVersion, settings as {
      iosSettings: IosSettings;
      androidSettings: AndroidSettings;
    });
  };

  render() {
    const {
      hasMounted,
      selectedDeviceIdForScreenshots,
      screenshotList,
      featureGraphic,
      isPublishInProgress
    } = this.state;
    const { versionId, appVersion, isSaving, appVersionEvents } = this.props;

    if (!appVersion || versionId !== appVersion.id || !hasMounted) {
      return (
        <Flex direction="horizontal" container grow>
          <ProgressBitbot color="grape-3" absolute="center" />
        </Flex>
      );
    }

    const latestEventStatus = appVersionEvents.length > 0 ? appVersionEvents[0].status : null;

    const viewProps = {
      appVersion,
      hasMounted,
      isSaving,
      onChange: this.onChange,
      onSave: this.onSave,
      onPublish: this.onPublish,
      onScreenshotAdded: this.onScreenshotAdded,
      availableDevices: map(screenshotList, ({ deviceName: value }, key) => ({
        key,
        value,
        isMarked: !!(((get(screenshotList, `${key}.screenshots`) as unknown) || []) as any[]).length
      })),
      selectedDeviceIdForScreenshots: selectedDeviceIdForScreenshots as string,
      screenshots: selectedDeviceIdForScreenshots ? screenshotList[selectedDeviceIdForScreenshots].screenshots : [],
      removeScreenshot: this.removeScreenshot,
      featureGraphic,
      onFeatureGraphicAdded: this.onFeatureGraphicAdded,
      removeFeatureGraphic: this.removeFeatureGraphic,
      onDeviceSelected: this.onDeviceSelected,
      shouldEnableInstall: this.shouldEnableInstall(),
      readyForPublish: this.readyForPublish(),
      isPublishInProgress: isPublishInProgress || latestEventStatus === AppVersionEventStatus.InProgress,
      publishTarget:
        (appVersion.platform === 'ios' && 'App Store Connect') ||
        (appVersion.platform === 'android' && 'Google Play Console') ||
        'production',
      publishTargetURL:
        (appVersion.platform === 'ios' && 'https://appstoreconnect.apple.com/') ||
        (appVersion.platform === 'android' && 'https://play.google.com/apps/publish/') ||
        null,
      settingsPath: `/apps/${appVersion.appSlug}/settings`,
      activityPath: `/apps/${appVersion.appSlug}/versions/${appVersion.id}/activity`,
      latestEventStatus
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion: { appVersion, events, isSaving }, settings: { settings } }: RootState) => ({
  appVersion,
  settings,
  appVersionEvents: orderedAppVersionEvents(events),
  isSaving: isSaving > 0
});
const mapDispatchToProps = {
  updateAppVersion,
  uploadScreenshots,
  deleteScreenshot,
  uploadFeatureGraphic,
  deleteFeatureGraphic,
  fetchAppVersionEvents,
  publishAppVersion,
  startPollPublishStatus: pollPublishStatus.start,
  cancelPollPublishStatus: pollPublishStatus.cancel,
  fetchSettings,
  fetchAppVersion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(AppVersionDetails);

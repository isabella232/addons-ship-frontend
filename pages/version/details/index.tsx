import { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import update from 'lodash/update';

import { AppVersion } from '@/models';
import { RootState } from '@/store';
import { updateAppVersion } from '@/ducks/appVersion';

import View from './view';

type Props = {
  appVersion: AppVersion;
  updateAppVersion: (appVersion: AppVersion) => Promise<void>;
};

export type State = {
  showTooltips: boolean;
  updatedAppVersion: AppVersion | null;
  screenshotList: { [deviceId: string]: DeviceScreenshots };
  selectedDeviceIdForScreenshots: string;
};

type DeviceScreenshots = {
  deviceName: string;
  screenshots?: File[];
};

export class AppVersionDetails extends Component<Props, State> {
  state: State = {
    showTooltips: false,
    updatedAppVersion: null,
    screenshotList: {
      iphone65: {
        deviceName: 'iPhone 6.5”'
      },
      iphone58: {
        deviceName: 'iPhone 5.8”'
      },
      iphone55: {
        deviceName: 'iPhone 5.5”'
      },
      iphone47: {
        deviceName: 'iPhone 4.7”'
      },
      iphone4: {
        deviceName: 'iPhone 4”'
      },
      ipad: {
        deviceName: 'iPad'
      },
      ipadpro: {
        deviceName: 'iPad Pro'
      },
      ipadpro105: {
        deviceName: 'iPad Pro 10.5”'
      },
      ipadpro129: {
        deviceName: 'iPad Pro 12.9”'
      },
      applewatch: {
        deviceName: 'Apple Watch'
      },
      applewatch4: {
        deviceName: 'Apple Watch 4'
      }
    },
    selectedDeviceIdForScreenshots: 'iphone65'
  };

  componentDidMount() {
    const { appVersion } = this.props;

    this.setState({ showTooltips: true, updatedAppVersion: appVersion });
  }

  onChange = (key: string, newValue: string) => {
    const { appVersion } = this.props;

    const updatedAppVersion = {
      ...appVersion,
      [key]: newValue
    };

    this.setState({ updatedAppVersion });
  };

  onSave = () => {
    const { updateAppVersion } = this.props;
    const { updatedAppVersion } = this.state;

    updateAppVersion(updatedAppVersion as AppVersion);
  };

  onScreenshotAdded = (deviceId: string, newScreenshots: File[]) => {
    const screenshotList = update({ ...this.state.screenshotList }, `${deviceId}.screenshots`, (screenshots = []) =>
      screenshots.concat(newScreenshots)
    );

    this.setState({ screenshotList });
  };

  removeScreenshot = (deviceId: string, screenshot: File) => {
    const screenshotList = update({ ...this.state.screenshotList }, `${deviceId}.screenshots`, (screenshots = []) =>
      screenshots.filter((file: File) => file !== screenshot)
    );

    this.setState({ screenshotList });
  };

  onDeviceSelected = (deviceId: string) => {
    this.setState({ selectedDeviceIdForScreenshots: deviceId });
  };

  render() {
    const { appVersion } = this.props;
    const { showTooltips, selectedDeviceIdForScreenshots, screenshotList } = this.state;

    const viewProps = {
      appVersion,
      showTooltips,
      onChange: this.onChange,
      onSave: this.onSave,
      onScreenshotAdded: this.onScreenshotAdded,
      availableDevices: map(screenshotList, ({ deviceName: value }, key) => ({ key, value })),
      selectedDeviceIdForScreenshots,
      screenshots: screenshotList[selectedDeviceIdForScreenshots].screenshots,
      removeScreenshot: this.removeScreenshot,
      onDeviceSelected: this.onDeviceSelected
    };

    return <View {...viewProps} />;
  }
}

const mapStateToProps = ({ appVersion }: RootState) => ({ appVersion });
const mapDispatchToProps = {
  updateAppVersion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppVersionDetails as any);

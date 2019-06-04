import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import update from 'lodash/update';

import { AppVersion } from '@/models';
import { RootState } from '@/store';
import { updateAppVersion } from '@/ducks/appVersion';

import View from './view';

type Props = {
  appVersion: AppVersion;
  updateAppVersion: (appVersion: AppVersion) => Promise<void>;
};

type State = {
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
      iphone6: {
        deviceName: 'iPhone 6.5”'
      },
      iphone5: {
        deviceName: 'iPhone 5.8”'
      }
    },
    selectedDeviceIdForScreenshots: 'iphone6'
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

  render() {
    const { appVersion } = this.props;
    const { showTooltips, selectedDeviceIdForScreenshots, screenshotList } = this.state;

    const viewProps = {
      appVersion,
      showTooltips,
      onChange: this.onChange,
      onSave: this.onSave,
      onScreenshotAdded: this.onScreenshotAdded,
      selectedDeviceIdForScreenshots,
      screenshots: screenshotList[selectedDeviceIdForScreenshots].screenshots,
      removeScreenshot: this.removeScreenshot
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

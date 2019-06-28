import formatDate from 'date-fns/format';
import { Base, Flex, Text, Icon, Image, Notification, Button } from '@bitrise/bitkit';
import { TypeIconName } from '@bitrise/bitkit/lib/esm/Icon/tsx';

import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

import Sidebar from './sidebar';
import FormIos from './form-ios';
import FormAndroid from './form-android';

type Props = {
  appVersion: AppVersion;
  showTooltips: boolean;
  selectedDeviceIdForScreenshots: string;
  availableDevices: Array<{
    key: string;
    value: string;
    isMarked: boolean;
  }>;
  screenshots?: File[];
  onScreenshotAdded: (deviceId: string, screenshots: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: File) => void;
  featureGraphic?: File;
  onFeatureGraphicAdded: (featureGraphic: File) => void;
  removeFeatureGraphic: () => void;
  onDeviceSelected: (key: string) => void;
  onSave?: () => void;
  onChange?: (key: string, newValue: string) => void;
  shouldEnableInstall: boolean;
};

export default ({
  appVersion,
  selectedDeviceIdForScreenshots: deviceId,
  onSave,
  onChange,
  shouldEnableInstall,
  availableDevices,
  ...props
}: Props) => {
  const iconName: TypeIconName = appVersion.platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

  const [isDesktop] = mediaQuery('60rem');

  const onFormChange = ({ target: { name, value } }: any) => {
    onChange && onChange(name, value);
  };

  return (
    <Base>
      <Flex direction="vertical" alignChildren="middle" paddingVertical="x6">
        <Flex maxWidth={isDesktop ? '100%' : 688}>
          <Notification margin="x2" type="progress">
            Publishing to App Store Connect is in progress.
          </Notification>
        </Flex>
      </Flex>
      <Flex direction="horizontal" alignChildrenHorizontal={isDesktop ? 'start' : 'middle'} gap="x4">
        <Flex maxWidth={688}>
          <form onChange={onFormChange}>
            <Flex direction="horizontal" margin="x4">
              <Image src={appVersion.iconUrl} borderRadius="x2" />

              <Flex direction="vertical" alignChildrenVertical="middle" paddingHorizontal="x6">
                <Flex direction="horizontal" alignChildren="middle">
                  <Icon color="grape-4" name={iconName} size="1.5rem" />
                  <Text letterSpacing="x2" size="x6" weight="bold" color="grape-4" paddingHorizontal="x2">
                    {appVersion.appName}
                  </Text>
                </Flex>
                <Text letterSpacing="x2" size="x5" weight="bold" color="grape-4" margin="x2">
                  v{appVersion.version} ({appVersion.buildNumber})
                </Text>
                <Text letterSpacing="x1" size="x4" weight="medium" color="gray-6">
                  Updated on {formatDate(appVersion.lastUpdate, 'MMMM D, YYYY')}
                </Text>
              </Flex>
            </Flex>
            <Flex direction="horizontal" alignChildren="start" gap="x4" margin="x8">
              <Button level="primary" onClick={onSave}>
                <Icon name="Bug" />
                <Text>Save</Text>
              </Button>
              <Button level="secondary" disabled={!shouldEnableInstall}>
                <Icon name="Download" />
                <Text>Install</Text>
              </Button>
            </Flex>
            {appVersion.platform === 'ios' && (
              <FormIos
                appVersion={appVersion}
                deviceId={deviceId}
                deviceName={availableDevices.find(device => device.key === deviceId).value}
                availableDevices={availableDevices}
                {...props}
              />
            )}
            {appVersion.platform === 'android' && (
              <FormAndroid
                appVersion={appVersion}
                deviceId={deviceId}
                deviceName={availableDevices.find(device => device.key === deviceId).value}
                availableDevices={availableDevices}
                {...props}
              />
            )}
          </form>
        </Flex>

        {isDesktop && (
          <Sidebar
            publicInstallPageURL={appVersion.publicInstallPageURL}
            onSave={onSave}
            buildSlug={appVersion.buildSlug}
          />
        )}
      </Flex>
    </Base>
  );
};

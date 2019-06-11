import formatDate from 'date-fns/format';
import { Base, Flex, Text, Icon, Image, Notification } from '@bitrise/bitkit';

import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

import Sidebar from './sidebar';
import FormIos from './form-ios';

type Props = {
  appVersion: AppVersion;
  showTooltips: boolean;
  selectedDeviceIdForScreenshots: string;
  availableDevices: Array<{
    key: string;
    value: string;
  }>;
  screenshots?: File[];
  onScreenshotAdded: (deviceId: string, screenshots: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: File) => void;
  onDeviceSelected: (key: string) => void;
  onSave?: () => void;
  onChange?: (key: string, newValue: string) => void;
};

export default ({
  appVersion,
  showTooltips,
  screenshots,
  selectedDeviceIdForScreenshots: deviceId,
  availableDevices,
  onScreenshotAdded,
  removeScreenshot,
  onSave,
  onChange,
  onDeviceSelected
}: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  const onFormChange = ({ target: { name, value } }: any) => {
    onChange && onChange(name, value);
  };

  return (
    <Base>
      <Flex direction="vertical" alignChildren="middle" paddingVertical="x6">
        <Flex maxWidth={isDesktop ? '100%' : 660}>
          <Notification margin="x2" type="progress">
            Publishing to App Store Connect is in progress.
          </Notification>
        </Flex>
      </Flex>
      <Flex direction="horizontal" alignChildrenHorizontal={isDesktop ? 'start' : 'middle'}>
        <Flex maxWidth={660} margin="x0" paddingHorizontal={isDesktop ? 'x0' : 'x4'}>
          <form onChange={onFormChange}>
            <Flex direction="horizontal" margin="x16">
              <Image src={appVersion.iconUrl} borderRadius="x2" />

              <Flex direction="vertical" alignChildrenVertical="middle" paddingHorizontal="x6">
                <Flex direction="horizontal" alignChildren="middle">
                  <Icon color="grape-4" name="PlatformsApple" size="1.5rem" />
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

            {appVersion.platform === 'ios' && (
              <FormIos
                appVersion={appVersion}
                availableDevices={availableDevices}
                selectedDeviceIdForScreenshots={deviceId}
                screenshots={screenshots}
                showTooltips={showTooltips}
                onScreenshotAdded={onScreenshotAdded}
                removeScreenshot={removeScreenshot}
                onDeviceSelected={onDeviceSelected}
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

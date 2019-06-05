import formatDate from 'date-fns/format';
import prettyBytes from 'pretty-bytes';
import {
  Base,
  Divider,
  Textarea,
  Flex,
  Text,
  Icon,
  Image,
  Notification,
  Tooltip,
  Input,
  InputContainer,
  InputLabel
} from '@bitrise/bitkit';
import { TypeIconName } from '@bitrise/bitkit/Icon/tsx';

import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';
import Dropzone from '@/components/Dropzone';
import SmallTabs from '@/components/SmallTabs';

import Sidebar from './sidebar';

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
  const iconName: TypeIconName = appVersion.platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

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

            <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
              <InputLabel>Description</InputLabel>
              <Text size="x2" weight="medium" color="gray-7" align="end">
                1235
              </Text>
            </Flex>
            <Textarea name="description" defaultValue={appVersion.description} />

            <Base paddingVertical="x4">
              <Flex direction="horizontal">
                <InputLabel>Screenshots</InputLabel>
                <Icon name="Support" color="grape-3" />
              </Flex>

              <SmallTabs items={availableDevices} selected={deviceId} onSelect={onDeviceSelected} />
              <Dropzone
                files={screenshots}
                onFilesAdded={files => onScreenshotAdded(deviceId, files)}
                removeFile={file => removeScreenshot(deviceId, file)}
              />
            </Base>

            <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
              <InputLabel>What's new</InputLabel>
              <Text size="x2" weight="medium" color="gray-7" align="end">
                1235
              </Text>
            </Flex>
            <Textarea name="whatsNew" defaultValue={appVersion.whatsNew} />

            <Divider color="gray-2" direction="horizontal" margin="x4" />

            <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
              <InputLabel>Promotional Text</InputLabel>
              <Text size="x2" weight="medium" color="gray-7" align="end">
                1235
              </Text>
            </Flex>
            <Textarea name="promotionalText" defaultValue={appVersion.promotionalText} />

            <Divider color="gray-2" direction="horizontal" margin="x4" />

            <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
              <InputLabel>Keywords</InputLabel>
              <Text size="x2" weight="medium" color="gray-7" align="end">
                1235
              </Text>
            </Flex>
            <Textarea name="keywords" defaultValue={appVersion.keywords} />

            <Divider color="gray-2" direction="horizontal" margin="x4" />

            <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
              <InputLabel>Review Notes</InputLabel>
              <Text size="x2" weight="medium" color="gray-7" align="end">
                1235
              </Text>
            </Flex>
            <Textarea name="reviewNotes" defaultValue={appVersion.reviewNotes} />

            <Divider color="gray-2" direction="horizontal" margin="x4" />

            <Flex direction="horizontal" alignChildrenVertical="middle">
              <InputLabel>Distribution Type: {appVersion.distributionType}</InputLabel>
              {showTooltips && (
                <Tooltip title="This is the tooltip">
                  {({ ref, ...rest }) => (
                    <Icon {...rest} paddingHorizontal="x1" innerRef={ref} color="grape-3" name="Coffee" size="1.5rem" />
                  )}
                </Tooltip>
              )}
            </Flex>
            {appVersion.distributionType === 'development' && (
              <Text size="x3" weight="medium" color="gray-7">
                The app was signed with a Development Provisioning Profile which means that it{' '}
                <Text weight="bold">
                  can only be installed on devices which are included in the Provisioning Profile
                </Text>
              </Text>
            )}

            <Divider color="gray-2" direction="horizontal" margin="x4" />

            <Flex direction="horizontal" grow gap="x6">
              <Flex grow>
                <InputLabel>Support URL</InputLabel>
                <InputContainer>
                  <Input name="supportUrl" defaultValue={appVersion.supportUrl} />
                </InputContainer>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>App Title</InputLabel>
                <Text size="x3">{appVersion.appName}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Version</InputLabel>
                <Text size="x3">v{appVersion.version}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Certificate Expires</InputLabel>
                <Text size="x3">{formatDate(appVersion.certificateExpires, 'MMM DD')}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Minimum OS</InputLabel>
                <Text size="x3">{appVersion.minimumOs}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Scheme</InputLabel>
                <Text size="x3">{appVersion.scheme}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />
              </Flex>
              <Flex grow>
                <InputLabel>Marketing URL</InputLabel>
                <InputContainer>
                  <Input name="marketingUrl" defaultValue={appVersion.marketingUrl} />
                </InputContainer>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Bundle ID</InputLabel>
                <Text size="x3">{appVersion.bundleId}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Build Number</InputLabel>
                <Text size="x3">{appVersion.buildNumber}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Size</InputLabel>
                <Text size="x3">{prettyBytes(appVersion.size)}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Supported Device Types</InputLabel>
                <Text size="x3">{appVersion.supportedDeviceTypes.join(', ')}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />

                <InputLabel>Configuration</InputLabel>
                <Text size="x3">{appVersion.configuration}</Text>

                <Divider color="gray-2" direction="horizontal" margin="x4" />
              </Flex>
            </Flex>
          </form>
        </Flex>

        {isDesktop && <Sidebar publicInstallPageURL={appVersion.publicInstallPageURL} onSave={onSave} />}
      </Flex>
    </Base>
  );
};

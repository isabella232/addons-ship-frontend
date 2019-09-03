import { Fragment } from 'react';
import {
  Base,
  Flex,
  Text,
  Icon,
  InputLabel,
  Textarea,
  Divider,
  Tooltip,
  InputContainer,
  InputContent,
  Input,
  Notification,
  Link
} from '@bitrise/bitkit';

import { AppVersion, Screenshot } from '@/models';
import Dropzone from '@/components/Dropzone';
import SmallTabs from '@/components/SmallTabs';

type Props = {
  appVersion: AppVersion;
  availableDevices: Array<{
    key: string;
    value: string;
    isMarked: boolean;
  }>;
  deviceId: string;
  deviceName: string;
  screenshots?: Screenshot[];
  hasMounted: boolean;
  onScreenshotAdded: (deviceId: string, files: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: Screenshot) => void;
  onDeviceSelected: (key: string) => void;
};

export default ({
  appVersion,
  availableDevices,
  deviceId,
  deviceName,
  screenshots,
  hasMounted,
  onScreenshotAdded,
  removeScreenshot,
  onDeviceSelected
}: Props) => (
  <Fragment>
    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>Description</InputLabel>
    </Flex>
    <Textarea name="description" defaultValue={appVersion.description} />

    <Base paddingVertical="x4">
      <Text color="grape-4" size="x3" weight="bold">
        Screenshots
      </Text>
      <Notification type="inform" icon="Info">
        Screenshots must be in the JPG or PNG format, and in the RGB color space. To learn more,{' '}
        <Link href="https://help.apple.com/app-store-connect/#/devd274dd925" target="_blank" underline>
          click here
        </Link>
        .
      </Notification>

      {hasMounted && <SmallTabs items={availableDevices} selected={deviceId} onSelect={onDeviceSelected} />}
      <Dropzone
        screenshots={screenshots}
        onFilesAdded={files => onScreenshotAdded(deviceId, files)}
        removeFile={file => removeScreenshot(deviceId, file)}
        instructionsBeginning={`Drag & Drop for ${deviceName}`}
      />
    </Base>

    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>What's new</InputLabel>
    </Flex>
    <Textarea name="whatsNew" defaultValue={appVersion.whatsNew} />

    <Divider color="gray-2" direction="horizontal" margin="x4" />

    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>Promotional Text</InputLabel>
    </Flex>
    <Textarea name="promotionalText" defaultValue={appVersion.promotionalText} />

    <Divider color="gray-2" direction="horizontal" margin="x4" />

    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>Keywords</InputLabel>
    </Flex>
    <Textarea name="keywords" defaultValue={appVersion.keywords} />

    <Divider color="gray-2" direction="horizontal" margin="x4" />

    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>Review Notes</InputLabel>
    </Flex>
    <Textarea name="reviewNotes" defaultValue={appVersion.reviewNotes} />

    <Divider color="gray-2" direction="horizontal" margin="x4" />

    <Flex direction="horizontal" alignChildrenVertical="end">
      <InputLabel>Distribution Type: {appVersion.distributionType}</InputLabel>
      {hasMounted && appVersion.distributionType === 'development' && (
        <Tooltip title="You can register your devices on your Account Settings page on Bitrise.">
          {({ ref, ...rest }) => (
            <Icon {...rest} paddingHorizontal="x1" innerRef={ref} color="grape-3" name="Info" size="2rem" />
          )}
        </Tooltip>
      )}
    </Flex>
    {appVersion.distributionType === 'development' && (
      <Flex direction="vertical" gap="x4">
        <Text size="x3" weight="medium" color="gray-7">
          The app was signed with a Development Provisioning Profile which means that it{' '}
          <Text weight="bold">can only be installed on devices which are included in the Provisioning Profile</Text>
        </Text>
        <Notification type="inform" icon="Lightbulb">
          You can find registered devices on the Devices tab.
        </Notification>
      </Flex>
    )}

    <Divider color="gray-2" direction="horizontal" margin="x4" />

    <Flex direction="horizontal" grow gap="x6">
      <Flex grow>
        <InputLabel>Support URL</InputLabel>
        <InputContainer>
          <InputContent>
            <Input name="supportUrl" defaultValue={appVersion.supportUrl} />
          </InputContent>
        </InputContainer>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>App Title</InputLabel>
        <Text size="x3">{appVersion.appName}</Text>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>Version</InputLabel>
        <Text size="x3">v{appVersion.version}</Text>

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
          <InputContent>
            <Input name="marketingUrl" defaultValue={appVersion.marketingUrl} />
          </InputContent>
        </InputContainer>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>Bundle ID</InputLabel>
        <Text size="x3">{appVersion.bundleId}</Text>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>Build Number</InputLabel>
        <Text size="x3">{appVersion.buildNumber}</Text>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>Supported Device Types</InputLabel>
        <Text size="x3">{appVersion.supportedDeviceTypes && appVersion.supportedDeviceTypes.join(', ')}</Text>

        <Divider color="gray-2" direction="horizontal" margin="x4" />

        <InputLabel>Configuration</InputLabel>
        <Text size="x3">{appVersion.configuration}</Text>

        <Divider color="gray-2" direction="horizontal" margin="x4" />
      </Flex>
    </Flex>
  </Fragment>
);

import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import prettyBytes from 'pretty-bytes';
import { Base, Flex, Text, Icon, InputLabel, Textarea, Divider, Tooltip, InputContainer, Input } from '@bitrise/bitkit';

import { AppVersion } from '@/models';
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
  screenshots?: File[];
  hasMounted: boolean;
  onScreenshotAdded: (deviceId: string, screenshots: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: File) => void;
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
      <Text size="x2" weight="medium" color="gray-7" align="end">
        1235
      </Text>
    </Flex>
    <Textarea name="description" defaultValue={appVersion.description} />

    <Base paddingVertical="x4">
      <Flex direction="horizontal" alignChildrenVertical="middle">
        <Text color="grape-4" size="x3" weight="bold">
          Screenshots
        </Text>
        <Icon name="Support" color="grape-3" paddingHorizontal="x1" size="2rem" />
      </Flex>

      {hasMounted && <SmallTabs items={availableDevices} selected={deviceId} onSelect={onDeviceSelected} />}
      <Dropzone
        files={screenshots}
        onFilesAdded={files => onScreenshotAdded(deviceId, files)}
        removeFile={file => removeScreenshot(deviceId, file)}
        instructionsBeginning={`Drag & Drop for ${deviceName}`}
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
      {hasMounted && (
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
        <Text weight="bold">can only be installed on devices which are included in the Provisioning Profile</Text>
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
        <Text size="x3">{appVersion.size && prettyBytes(appVersion.size)}</Text>

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

import { Fragment } from 'react';
import {
  Base,
  Flex,
  Text,
  InputLabel,
  Textarea,
  Divider,
  InputContainer,
  InputContent,
  Input,
  Notification,
  Link
} from '@bitrise/bitkit';

import { AppVersion, Screenshot } from '@/models';
import Dropzone from '@/components/Dropzone';
import SmallTabs from '@/components/SmallTabs';
import { mediaQuery } from '@/utils/media';

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
}: Props) => {
  const [isTablet] = mediaQuery('30rem');

  return (
    <Fragment>
      <InputLabel>Description</InputLabel>
      <Textarea name="description" defaultValue={appVersion.description} rows={5} />

      <Base paddingVertical="x4">
        <InputLabel>Screenshots</InputLabel>
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

      <Base margin="x6">
        <InputLabel>What's new</InputLabel>
        <Textarea name="whatsNew" defaultValue={appVersion.whatsNew} rows={5} />
      </Base>

      <Base margin="x6">
        <InputLabel>Promotional Text</InputLabel>
        <Textarea name="promotionalText" defaultValue={appVersion.promotionalText} rows={3} />
      </Base>

      <Base margin="x6">
        <InputLabel>Keywords</InputLabel>
        <Textarea name="keywords" defaultValue={appVersion.keywords} rows={3} />
      </Base>

      <Base margin="x6">
        <InputLabel>Review Notes</InputLabel>
        <Textarea name="reviewNotes" defaultValue={appVersion.reviewNotes} rows={5} />
      </Base>

      <Flex direction={isTablet ? 'horizontal' : 'vertical'} grow gap="x6">
        <Flex width={isTablet ? 'calc(50% - 0.75rem)' : 'auto'}>
          <InputLabel>Support URL</InputLabel>
          <InputContainer>
            <InputContent>
              <Input name="supportUrl" defaultValue={appVersion.supportUrl} />
            </InputContent>
          </InputContainer>
        </Flex>{' '}
        <Flex grow>
          <InputLabel>Marketing URL</InputLabel>
          <InputContainer>
            <InputContent>
              <Input name="marketingUrl" defaultValue={appVersion.marketingUrl} />
            </InputContent>
          </InputContainer>
        </Flex>
      </Flex>

      <Divider color="gray-2" direction="horizontal" margin="x4" />

      <Flex direction={isTablet ? 'horizontal' : 'vertical'} grow gap="x6">
        <Flex width={isTablet ? 'calc(50% - 0.75rem)' : 'auto'}>
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
          <InputLabel>Bundle ID</InputLabel>
          <Text size="x3">{appVersion.bundleId}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Build Number</InputLabel>
          <Text size="x3">{appVersion.buildNumber}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Supported Device Types</InputLabel>
          <Text size="x3">{appVersion.supportedDeviceTypes && appVersion.supportedDeviceTypes.join(', ')}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />
        </Flex>
      </Flex>
    </Fragment>
  );
};

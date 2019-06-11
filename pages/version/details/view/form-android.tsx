import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import prettyBytes from 'pretty-bytes';
import { Base, Flex, Text, Icon, InputLabel, Textarea, Divider } from '@bitrise/bitkit';

import { AppVersion } from '@/models';
import Dropzone from '@/components/Dropzone';
import SmallTabs from '@/components/SmallTabs';

type Props = {
  appVersion: AppVersion;
  availableDevices: Array<{
    key: string;
    value: string;
  }>;
  deviceId: string;
  screenshots?: File[];
  onScreenshotAdded: (deviceId: string, screenshots: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: File) => void;
  featureGraphic?: File;
  onFeatureGraphicAdded: (featureGraphic: File) => void;
  removeFeatureGraphic: () => void;
  onDeviceSelected: (key: string) => void;
};

export default ({
  appVersion,
  availableDevices,
  deviceId,
  screenshots,
  onScreenshotAdded,
  removeScreenshot,
  featureGraphic,
  onFeatureGraphicAdded,
  removeFeatureGraphic,
  onDeviceSelected
}: Props) => (
  <Fragment>
    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>What's new</InputLabel>
      <Text size="x2" weight="medium" color="gray-7" align="end">
        1235
      </Text>
    </Flex>
    <Textarea name="whatsNew" defaultValue={appVersion.whatsNew} />

    <Base paddingVertical="x4">
      <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
        <InputLabel>Short Description</InputLabel>
        <Text size="x2" weight="medium" color="gray-7" align="end">
          1235
        </Text>
      </Flex>
      <Textarea name="description" defaultValue={appVersion.shortDescription} />
    </Base>

    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
      <InputLabel>Full Description</InputLabel>
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

      <SmallTabs items={availableDevices} selected={deviceId} onSelect={onDeviceSelected} />
      <Dropzone
        files={screenshots}
        onFilesAdded={files => onScreenshotAdded(deviceId, files)}
        removeFile={file => removeScreenshot(deviceId, file)}
      />
    </Base>

    <Base paddingVertical="x4">
      <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
        <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
          <Text color="grape-4" size="x3" weight="bold">
            Feature Graphic
          </Text>
          <Icon name="Support" color="grape-3" paddingHorizontal="x1" size="2rem" />
        </Flex>
        <Text size="x2" weight="medium" color="gray-7" align="end">
          1024 x 500px
        </Text>
      </Flex>

      <Dropzone
        files={featureGraphic && [featureGraphic]}
        onFilesAdded={([file]) => onFeatureGraphicAdded(file)}
		removeFile={_file => removeFeatureGraphic()}
		isMultiple={false}
      />
    </Base>

    <Base paddingVertical="x4">
      <Flex direction="horizontal" grow gap="x6">
        <Flex grow>
          <InputLabel>App Title</InputLabel>
          <Text size="x3">{appVersion.appName}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Version</InputLabel>
          <Text size="x3">v{appVersion.version}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Certificate Expires</InputLabel>
          <Text size="x3">{formatDate(appVersion.certificateExpires, 'MMM DD')}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Minimum SDK Version</InputLabel>
          <Text size="x3">{appVersion.minimumSdk}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Variant</InputLabel>
          <Text size="x3">{appVersion.variant}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />
        </Flex>
        <Flex grow>
          <InputLabel>Package Name</InputLabel>
          <Text size="x3">{appVersion.packageName}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Version Code</InputLabel>
          <Text size="x3">{appVersion.versionCode}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Size</InputLabel>
          <Text size="x3">{prettyBytes(appVersion.size)}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Module</InputLabel>
          <Text size="x3">{appVersion.module}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />

          <InputLabel>Build Type</InputLabel>
          <Text size="x3">{appVersion.buildType}</Text>

          <Divider color="gray-2" direction="horizontal" margin="x4" />
        </Flex>
      </Flex>
    </Base>
  </Fragment>
);

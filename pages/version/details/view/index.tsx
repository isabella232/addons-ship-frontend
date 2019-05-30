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
  Card,
  CardContent,
  Tooltip,
  Input,
  InputContainer,
  InputLabel
} from '@bitrise/bitkit';
import { TypeName } from '@bitrise/bitkit/Icon/tsx';

import { AppVersion } from '@/models';
import Sidebar from './sidebar';

type Props = {
  appVersion: AppVersion;
  showTooltips: boolean;
};

export default ({ appVersion, showTooltips }: Props) => {
  const iconName: TypeName = appVersion.platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

  return (
    <Base paddingVertical="x6">
      <Card margin="x10">
        <CardContent padding="x3" backgroundColor="blue-1">
          Some notification
        </CardContent>
      </Card>
      <Flex direction="horizontal">
        <Flex alignChildrenHorizontal="start">
          <Base maxWidth={660}>
            <form>
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
              <Textarea defaultValue={appVersion.description} />

              <Divider color="gray-2" direction="horizontal" margin="x4" />

              <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
                <InputLabel>What's new</InputLabel>
                <Text size="x2" weight="medium" color="gray-7" align="end">
                  1235
                </Text>
              </Flex>
              <Textarea defaultValue={appVersion.whatsNew} />

              <Divider color="gray-2" direction="horizontal" margin="x4" />

              <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
                <InputLabel>Promotional Text</InputLabel>
                <Text size="x2" weight="medium" color="gray-7" align="end">
                  1235
                </Text>
              </Flex>
              <Textarea defaultValue={appVersion.promotionalText} />

              <Divider color="gray-2" direction="horizontal" margin="x4" />

              <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
                <InputLabel>Keywords</InputLabel>
                <Text size="x2" weight="medium" color="gray-7" align="end">
                  1235
                </Text>
              </Flex>
              <Textarea defaultValue={appVersion.keywords} />

              <Divider color="gray-2" direction="horizontal" margin="x4" />

              <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle">
                <InputLabel>Review Notes</InputLabel>
                <Text size="x2" weight="medium" color="gray-7" align="end">
                  1235
                </Text>
              </Flex>
              <Textarea defaultValue={appVersion.reviewNotes} />

              <Divider color="gray-2" direction="horizontal" margin="x4" />

              <Flex direction="horizontal" alignChildrenVertical="middle">
                <InputLabel>Distribution Type: {appVersion.distributionType}</InputLabel>
                {showTooltips && (
                  <Tooltip title="This is the tooltip">
                    {({ ref, ...rest }) => (
                      <Icon
                        {...rest}
                        paddingHorizontal="x1"
                        innerRef={ref}
                        color="grape-3"
                        name="Coffee"
                        size="1.5rem"
                      />
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
                    <Input defaultValue={appVersion.supportUrl} />
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
                    <Input defaultValue={appVersion.marketingUrl} />
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
          </Base>
        </Flex>
        <Sidebar publicInstallPageURL={appVersion.publicInstallPageURL} />
      </Flex>
    </Base>
  );
};

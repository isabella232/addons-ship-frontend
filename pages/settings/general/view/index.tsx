import {
  Base,
  Text,
  Divider,
  Flex,
  InputLabel,
  Icon,
  Input,
  InputContainer,
  Grid,
  Link,
  RadioButton,
  Tooltip,
  Button
} from '@bitrise/bitkit';

import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

type Props = {
  appVersion: AppVersion;
  showTooltips: boolean;
};

export default ({ showTooltips }: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Base paddingVertical="x8" maxWidth={isDesktop ? '100%' : 660}>
      <Base margin="x12">
        <Text size="x5" weight="bold">
          iOS Settings
        </Text>
        <Divider color="gray-2" direction="horizontal" margin="x4" />
        <Base margin="x6">
          <Grid columnCount="2" columnWidth="1fr" direction="horizontal" grow gap="x6" alignChildrenVertical="end">
            <Flex>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="start"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
              >
                <InputLabel>Expose Artifacts From the Selected Workflow to Ship</InputLabel>
                {showTooltips && (
                  <Tooltip title="You can add multiple workflows divided with a comma. Eg.: Primary, Deploy">
                    {() => <Icon color="grape-3" name="Support" size="1.5rem" />}
                  </Tooltip>
                )}
              </Flex>
              <InputContainer>
                <Input name="artifactExposingWorkflows" defaultValue="All" />
              </InputContainer>
            </Flex>
            <Flex>
              <InputLabel margin="x1">App SKU</InputLabel>
              <InputContainer>
                <Input name="appSku" defaultValue="Fill" />
              </InputContainer>
            </Flex>
          </Grid>
        </Base>
        <Base margin="x6">
          <Grid columnCount="2" columnWidth="1fr" direction="horizontal" grow gap="x6" alignChildrenVertical="end">
            <Flex>
              <InputLabel margin="x1">Apple Developer Account Email</InputLabel>
              <InputContainer>
                <Input name="appleDeveloperAccountEmail" defaultValue="Fill" />
              </InputContainer>
            </Flex>
            <Flex>
              <InputLabel margin="x1">App Specific Password</InputLabel>
              <InputContainer>
                <Input name="appSpecificPassword" defaultValue="Fill" />
              </InputContainer>
            </Flex>
          </Grid>
        </Base>
      </Base>

      <Base margin="x12">
        <Base margin="x6">
          <Flex direction="horizontal" alignChildrenHorizontal="between" gap="x1" margin="x1">
            <Text size="x3" weight="bold">
              App Store Provisioning Profile
            </Text>
            <Link href="#" color="grape-3">
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="start"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
              >
                <Text size="x3">Edit Profiles and Certificates on Bitrise</Text>
                <Icon name="OpenInBrowser" size="1.5rem" />
              </Flex>
            </Link>
          </Flex>
          <Divider color="gray-2" direction="horizontal" margin="x2" />
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
        </Base>

        <Base margin="x6">
          <Text size="x3" weight="bold" margin="x1">
            Code Signing Identity (1/30)
          </Text>
          <Divider color="gray-2" direction="horizontal" margin="x2" />
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">iPhone Developer: John Doe (ABCD12345678)</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
        </Base>
      </Base>

      <Base margin="x12">
        <Text size="x5" weight="bold">
          Android Settings
        </Text>
        <Divider color="gray-2" direction="horizontal" margin="x4" />
        <Base margin="x6">
          <Grid columnCount="2" columnWidth="1fr" direction="horizontal" grow gap="x6" alignChildrenVertical="end">
            <Flex>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="start"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
              >
                <InputLabel>Expose Artifacts From the Selected Workflow to Ship</InputLabel>
                {showTooltips && (
                  <Tooltip title="You can add multiple workflows divided with a comma. Eg.: Primary, Deploy">
                    {() => <Icon color="grape-3" name="Support" size="1.5rem" />}
                  </Tooltip>
                )}
              </Flex>
              <InputContainer>
                <Input name="artifactExposingWorkflows" defaultValue="All" />
              </InputContainer>
            </Flex>
            <Flex>
              <InputLabel margin="x1">Track</InputLabel>
              <InputContainer>
                <Input name="appSku" defaultValue="Release" />
              </InputContainer>
            </Flex>
          </Grid>
        </Base>
      </Base>

      <Base margin="x12">
        <Base margin="x6">
          <Flex direction="horizontal" alignChildrenHorizontal="between" gap="x1" margin="x1">
            <Text size="x3" weight="bold">
              Android Keystore Files
            </Text>
            <Link href="#" color="grape-3">
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="start"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
              >
                <Text size="x3">Edit Keystore and JSON files on Bitrise</Text>
                <Icon name="OpenInBrowser" size="1.5rem" />
              </Flex>
            </Link>
          </Flex>
          <Divider color="gray-2" direction="horizontal" margin="x2" />
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
        </Base>

        <Base margin="x6">
          <Text size="x3" weight="bold" margin="x1">
            Android Service Account JSON File
          </Text>
          <Divider color="gray-2" direction="horizontal" margin="x2" />
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
          <Base>
            <RadioButton>
              <Flex
                direction="horizontal"
                alignChildrenHorizontal="between"
                alignChildrenVertical="middle"
                gap="x1"
                margin="x1"
                paddingVertical="x3"
              >
                <Icon name="Doc" size="2rem" color="grape-4" />
                <Text size="x3">abcdefghijkl1234567</Text>
              </Flex>
            </RadioButton>
            <Divider color="gray-1" direction="horizontal" margin="x2" />
          </Base>
        </Base>
      </Base>

      <Flex margin="x12" direction="horizontal" alignChildrenHorizontal="end" gap="x4">
        <Button level="secondary" width="8rem">
          Cancel
        </Button>
        <Button level="primary" width="8rem">
          Save
        </Button>
      </Flex>
    </Base>
  );
};

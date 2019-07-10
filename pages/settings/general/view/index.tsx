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

import { ProvProfile, Certificate, KeystoreFile, ServiceAccountJsonFile, IosSettings, AndroidSettings } from '@/models';
import { mediaQuery } from '@/utils/media';
import { Fragment } from 'react';

type Props = {
  maximumNumberOfCertificates: number;
  hasMounted: boolean;
  provProfiles?: ProvProfile[];
  certificates?: Certificate[];
  keystoreFiles?: KeystoreFile[];
  serviceAccountJsonFiles?: ServiceAccountJsonFile[];
  iosSettings?: IosSettings;
  androidSettings?: AndroidSettings;
  onSettingsPropertyChange: (
    settings: 'iosSettings' | 'androidSettings',
    settingsProperty: string,
    value: string
  ) => void;
  onSelectedFileChange: (
    type: 'ProvProfile' | 'Certificate' | 'KeystoreFile' | 'ServiceAccountJsonFile',
    file: ProvProfile | Certificate | KeystoreFile | ServiceAccountJsonFile
  ) => void;
  onCancel: () => void;
  onSave: () => void;
  hasIosSettings: boolean;
  hasAndroidSettings: boolean;
};

export default ({
  maximumNumberOfCertificates,
  hasMounted,
  provProfiles,
  certificates,
  keystoreFiles,
  serviceAccountJsonFiles,
  iosSettings,
  androidSettings,
  onSettingsPropertyChange,
  onSelectedFileChange,
  onCancel,
  onSave,
  hasIosSettings,
  hasAndroidSettings
}: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Base paddingVertical="x8" maxWidth={isDesktop ? '100%' : 660}>
      <Base paddingHorizontal={isDesktop ? 'x0' : 'x4'}>
        {hasIosSettings && iosSettings && (
          <Fragment>
            <Base margin="x12">
              <Text size="x5" weight="bold">
                iOS Settings
              </Text>
              <Divider color="gray-2" direction="horizontal" margin="x4" />
              <Base margin="x6">
                <Grid
                  columnCount={isDesktop ? '2' : '1'}
                  columnWidth="1fr"
                  direction={isDesktop ? 'horizontal' : 'vertical'}
                  grow
                  gap="x6"
                  alignChildrenVertical="end"
                >
                  <Flex>
                    <Flex
                      direction="horizontal"
                      alignChildrenHorizontal="start"
                      alignChildrenVertical="middle"
                      gap="x1"
                      margin="x1"
                    >
                      <InputLabel>Expose Artifacts From the Selected Workflow to Ship</InputLabel>
                      {hasMounted && (
                        <Tooltip title="You can add multiple workflows divided with a comma. Eg.: Primary, Deploy">
                          {() => <Icon color="grape-3" name="Support" size="1.5rem" />}
                        </Tooltip>
                      )}
                    </Flex>
                    <InputContainer>
                      <Input
                        name="artifactExposingWorkflows"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('iosSettings', 'artifactExposingWorkflows', event.target.value)
                        }
                        value={iosSettings.artifactExposingWorkflows}
                      />
                    </InputContainer>
                  </Flex>
                  <Flex>
                    <InputLabel margin="x1">App SKU</InputLabel>
                    <InputContainer>
                      <Input
                        name="appSku"
                        onChange={(event: any) => onSettingsPropertyChange('iosSettings', 'appSku', event.target.value)}
                        value={iosSettings.appSku}
                      />
                    </InputContainer>
                  </Flex>
                </Grid>
              </Base>
              <Base margin="x6">
                <Grid
                  columnCount={isDesktop ? '2' : '1'}
                  columnWidth="1fr"
                  direction={isDesktop ? 'horizontal' : 'vertical'}
                  grow
                  gap="x6"
                  alignChildrenVertical="end"
                >
                  <Flex>
                    <InputLabel margin="x1">Apple Developer Account Email</InputLabel>
                    <InputContainer>
                      <Input
                        name="appleDeveloperAccountEmail"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('iosSettings', 'appleDeveloperAccountEmail', event.target.value)
                        }
                        value={iosSettings.appleDeveloperAccountEmail}
                      />
                    </InputContainer>
                  </Flex>
                  <Flex>
                    <InputLabel margin="x1">App Specific Password</InputLabel>
                    <InputContainer>
                      <Input
                        name="appSpecificPassword"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('iosSettings', 'appSpecificPassword', event.target.value)
                        }
                        value={iosSettings.appSpecificPassword}
                      />
                    </InputContainer>
                  </Flex>
                </Grid>
              </Base>
            </Base>

            <Base margin="x12">
              {provProfiles && (
                <Base margin="x6">
                  <Flex
                    direction={isDesktop ? 'horizontal' : 'vertical'}
                    alignChildrenHorizontal="between"
                    gap="x1"
                    margin="x1"
                  >
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
                  {provProfiles.map((provProfile: ProvProfile, index) => (
                    <Base key={index}>
                      <RadioButton
                        checked={provProfile === iosSettings.selectedProvProfile}
                        onChange={() => onSelectedFileChange('ProvProfile', provProfile)}
                      >
                        <Flex
                          direction="horizontal"
                          alignChildrenHorizontal="between"
                          alignChildrenVertical="middle"
                          gap="x1"
                          margin="x1"
                          paddingVertical="x3"
                        >
                          <Icon name="Doc" size="2rem" color="grape-4" />
                          <Text size="x3">{provProfile.name}</Text>
                        </Flex>
                      </RadioButton>
                      <Divider color="gray-1" direction="horizontal" margin="x2" />
                    </Base>
                  ))}
                </Base>
              )}

              {certificates && (
                <Base margin="x6">
                  <Text size="x3" weight="bold" margin="x1">
                    Code Signing Identity ({certificates.length}/{maximumNumberOfCertificates})
                  </Text>
                  <Divider color="gray-2" direction="horizontal" margin="x2" />
                  {certificates.map((certificate: Certificate, index) => (
                    <Base key={index}>
                      <RadioButton
                        checked={certificate === iosSettings.selectedCertificate}
                        onChange={() => onSelectedFileChange('Certificate', certificate)}
                      >
                        <Flex
                          direction="horizontal"
                          alignChildrenHorizontal="between"
                          alignChildrenVertical="middle"
                          gap="x1"
                          margin="x1"
                          paddingVertical="x3"
                        >
                          <Icon name="Doc" size="2rem" color="grape-4" />
                          <Text size="x3">{certificate.name}</Text>
                        </Flex>
                      </RadioButton>
                      <Divider color="gray-1" direction="horizontal" margin="x2" />
                    </Base>
                  ))}
                </Base>
              )}
            </Base>
          </Fragment>
        )}

        {androidSettings && hasAndroidSettings && (
          <Fragment>
            <Base margin="x12">
              <Text size="x5" weight="bold">
                Android Settings
              </Text>
              <Divider color="gray-2" direction="horizontal" margin="x4" />
              <Base margin="x6">
                <Grid
                  columnCount={isDesktop ? '2' : '1'}
                  columnWidth="1fr"
                  direction={isDesktop ? 'horizontal' : 'vertical'}
                  grow
                  gap="x6"
                  alignChildrenVertical="end"
                >
                  <Flex>
                    <Flex
                      direction="horizontal"
                      alignChildrenHorizontal="start"
                      alignChildrenVertical="middle"
                      gap="x1"
                      margin="x1"
                    >
                      <InputLabel>Expose Artifacts From the Selected Workflow to Ship</InputLabel>
                      {hasMounted && (
                        <Tooltip title="You can add multiple workflows divided with a comma. Eg.: Primary, Deploy">
                          {() => <Icon color="grape-3" name="Support" size="1.5rem" />}
                        </Tooltip>
                      )}
                    </Flex>
                    <InputContainer>
                      <Input
                        name="artifactExposingWorkflows"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('androidSettings', 'artifactExposingWorkflows', event.target.value)
                        }
                        value={androidSettings.artifactExposingWorkflows}
                      />
                    </InputContainer>
                  </Flex>
                  <Flex>
                    <InputLabel margin="x1">Track</InputLabel>
                    <InputContainer>
                      <Input
                        name="track"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('androidSettings', 'track', event.target.value)
                        }
                        value={androidSettings.track}
                      />
                    </InputContainer>
                  </Flex>
                </Grid>
              </Base>
            </Base>

            <Base margin="x12">
              {keystoreFiles && (
                <Base margin="x6">
                  <Flex
                    direction={isDesktop ? 'horizontal' : 'vertical'}
                    alignChildrenHorizontal="between"
                    gap="x1"
                    margin="x1"
                  >
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
                  {keystoreFiles.map((keystoreFile: KeystoreFile, index) => (
                    <Base key={index}>
                      <RadioButton
                        checked={keystoreFile === androidSettings.selectedKeystoreFile}
                        onChange={() => onSelectedFileChange('KeystoreFile', keystoreFile)}
                      >
                        <Flex
                          direction="horizontal"
                          alignChildrenHorizontal="between"
                          alignChildrenVertical="middle"
                          gap="x1"
                          margin="x1"
                          paddingVertical="x3"
                        >
                          <Icon name="Doc" size="2rem" color="grape-4" />
                          <Text size="x3">{keystoreFile.name}</Text>
                        </Flex>
                      </RadioButton>
                      <Divider color="gray-1" direction="horizontal" margin="x2" />
                    </Base>
                  ))}
                </Base>
              )}

              {serviceAccountJsonFiles && (
                <Base margin="x6">
                  <Text size="x3" weight="bold" margin="x1">
                    Android Service Account JSON File
                  </Text>
                  <Divider color="gray-2" direction="horizontal" margin="x2" />
                  {serviceAccountJsonFiles.map((serviceAccountJsonFile: ServiceAccountJsonFile, index) => (
                    <Base key={index}>
                      <RadioButton
                        checked={serviceAccountJsonFile === androidSettings.selectedServiceAccountJsonFile}
                        onChange={() => onSelectedFileChange('ServiceAccountJsonFile', serviceAccountJsonFile)}
                      >
                        <Flex
                          direction="horizontal"
                          alignChildrenHorizontal="between"
                          alignChildrenVertical="middle"
                          gap="x1"
                          margin="x1"
                          paddingVertical="x3"
                        >
                          <Icon name="Doc" size="2rem" color="grape-4" />
                          <Text size="x3">{serviceAccountJsonFile.name}</Text>
                        </Flex>
                      </RadioButton>
                      <Divider color="gray-1" direction="horizontal" margin="x2" />
                    </Base>
                  ))}
                </Base>
              )}
            </Base>
          </Fragment>
        )}

        <Flex margin="x12" direction="horizontal" alignChildrenHorizontal="end" gap="x4">
          <Button level="secondary" width="8rem" onClick={onCancel}>
            Cancel
          </Button>
          <Button level="primary" width="8rem" onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Base>
    </Base>
  );
};

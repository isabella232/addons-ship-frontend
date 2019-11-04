import { Fragment } from 'react';
import {
  Base,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  Icon,
  Input,
  InputContainer,
  InputContent,
  InputLabel,
  Link,
  RadioButton,
  Text,
  Tooltip,
  ProgressBitbot,
  ProgressSpinner
} from '@bitrise/bitkit';
import SVG from 'react-svg';

import { Certificate, KeystoreFile, ProvProfile, ServiceAccountJsonFile, Settings } from '@/models/settings';
import { mediaQuery } from '@/utils/media';
import { Platform } from '@/models';

import css from './style.scss';

interface Props extends Settings {
  hasLoaded: boolean;
  appSlug: string;
  maximumNumberOfCertificates: number;
  hasMounted: boolean;
  hasIosSettings: boolean;
  hasAndroidSettings: boolean;
  onSettingsPropertyChange: (
    settings: 'iosSettings' | 'androidSettings',
    settingsProperty: string,
    value: string
  ) => void;
  onWorkflowChange: (platform: Platform, workflow: string) => void;
  onSelectedFileChange: (
    type: 'Certificate' | 'KeystoreFile' | 'ServiceAccountJsonFile',
    file: Certificate | KeystoreFile | ServiceAccountJsonFile
  ) => void;
  toggleProvProfile: (slug: string) => void;
  onCancel?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export default ({
  hasLoaded,
  appSlug,
  maximumNumberOfCertificates,
  hasMounted,
  provProfiles,
  certificates,
  keystoreFiles,
  serviceAccountJsonFiles,
  iosSettings,
  androidSettings,
  iosWorkflow,
  androidWorkflow,
  onSettingsPropertyChange,
  onWorkflowChange,
  onSelectedFileChange,
  toggleProvProfile,
  onCancel,
  onSave,
  isSaving,
  hasIosSettings,
  hasAndroidSettings
}: Props) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  if (!hasLoaded) {
    return (
      <Flex direction="vertical" alignChildren="middle" grow>
        <ProgressBitbot color="grape-3" />
      </Flex>
    );
  }

  return (
    <Base className={css.container} paddingVertical="x8">
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
                      <Tooltip title="You can add multiple workflows divided with a comma. Eg.: primary, deploy">
                        {({ ref, ...rest }) => (
                          <Icon {...rest} innerRef={ref} color="gray-5" name="Support" size="1.5rem" />
                        )}
                      </Tooltip>
                    )}
                  </Flex>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="iosWorkflow"
                        onChange={(event: any) => onWorkflowChange('ios', event.target.value)}
                        value={iosWorkflow}
                        placeholder="All"
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
                <Flex>
                  <InputLabel margin="x1">App SKU</InputLabel>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="appSku"
                        onChange={(event: any) => onSettingsPropertyChange('iosSettings', 'appSku', event.target.value)}
                        value={iosSettings.appSku}
                      />
                    </InputContent>
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
                    <InputContent>
                      <Input
                        name="appleDeveloperAccountEmail"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('iosSettings', 'appleDeveloperAccountEmail', event.target.value)
                        }
                        value={iosSettings.appleDeveloperAccountEmail}
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
                <Flex>
                  <InputLabel margin="x1">App Specific Password</InputLabel>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="appSpecificPassword"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('iosSettings', 'appSpecificPassword', event.target.value)
                        }
                        value={iosSettings.appSpecificPassword}
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
              </Grid>
            </Base>
            <Base>
              <Checkbox
                name="includeBitCode"
                checked={iosSettings.includeBitCode}
                onChange={(event: any) =>
                  onSettingsPropertyChange('iosSettings', 'includeBitCode', event.target.checked)
                }
              >
                Include bitcode
              </Checkbox>
            </Base>
          </Base>

          <Base margin="x12">
            <Base margin="x6">
              <Flex
                direction={isDesktop ? 'horizontal' : 'vertical'}
                alignChildrenHorizontal="between"
                gap={isDesktop ? 'x1' : 'x2'}
                margin="x1"
              >
                <Flex
                  direction="horizontal"
                  alignChildrenHorizontal={isDesktop ? 'start' : 'between'}
                  alignChildrenVertical="middle"
                  gap="x1"
                  margin="x1"
                >
                  <InputLabel>App Store Provisioning Profiles</InputLabel>
                  {hasMounted && (
                    <Tooltip title="Select profiles for every signable target (e.g: extensions)">
                      {({ ref, ...rest }) => (
                        <Icon {...rest} innerRef={ref} color="gray-5" name="Support" size="1.5rem" />
                      )}
                    </Tooltip>
                  )}
                </Flex>
                <Link
                  href={`https://app.bitrise.io/app/${appSlug}/workflow_editor#!/code_signing`}
                  target="_blank"
                  color="grape-3"
                >
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
              {(provProfiles as ProvProfile[]).map((provProfile: ProvProfile, index) => (
                <Flex key={index} direction="horizontal" className={css.provProfileContainer}>
                  <Checkbox
                    checked={iosSettings.selectedAppStoreProvisioningProfiles.includes(provProfile.slug)}
                    onChange={() => toggleProvProfile(provProfile.slug)}
                  >
                    <Flex
                      direction="horizontal"
                      alignChildrenHorizontal="between"
                      alignChildrenVertical="middle"
                      gap="x3"
                      paddingHorizontal="x1"
                      paddingVertical="x3"
                    >
                      <SVG src="/static/sheet-cog.svg" className={css.sheet} />
                      <Text size="x3" breakOn="all">
                        {provProfile.name}
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Divider color="gray-1" direction="horizontal" margin="x2" />
                </Flex>
              ))}
              {(provProfiles as ProvProfile[]).length === 0 && (
                <Text size="x3" color="gray-7">
                  No Provisioning Profiles
                </Text>
              )}
            </Base>

            <Base margin="x6">
              <Text size="x3" weight="bold" margin="x1">
                Code Signing Identity ({(certificates as Certificate[]).length}/{maximumNumberOfCertificates})
              </Text>
              <Divider color="gray-2" direction="horizontal" margin="x2" />
              {(certificates as Certificate[]).map((certificate: Certificate, index) => (
                <Base key={index}>
                  <RadioButton
                    checked={certificate.slug === iosSettings.selectedCodeSigningIdentity}
                    onChange={() => onSelectedFileChange('Certificate', certificate)}
                  >
                    <Flex
                      direction="horizontal"
                      alignChildrenHorizontal="between"
                      alignChildrenVertical="middle"
                      gap="x3"
                      paddingHorizontal="x1"
                      paddingVertical="x3"
                    >
                      <SVG src="/static/sheet-badge.svg" className={css.sheet} />
                      <Text size="x3">{certificate.name}</Text>
                    </Flex>
                  </RadioButton>
                  <Divider color="gray-1" direction="horizontal" margin="x2" />
                </Base>
              ))}
              {(certificates as Certificate[]).length === 0 && (
                <Text size="x3" color="gray-7">
                  No Code Signing Identities
                </Text>
              )}
            </Base>
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
                      <Tooltip title="You can add multiple workflows divided with a comma. Eg.: primary, deploy">
                        {({ ref, ...rest }) => (
                          <Icon {...rest} innerRef={ref} color="gray-5" name="Support" size="1.5rem" />
                        )}
                      </Tooltip>
                    )}
                  </Flex>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="androidWorkflow"
                        onChange={(event: any) => onWorkflowChange('android', event.target.value)}
                        value={androidWorkflow}
                        placeholder="All"
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
                <Flex>
                  <InputLabel margin="x1">Track</InputLabel>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="track"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('androidSettings', 'track', event.target.value)
                        }
                        value={androidSettings.track}
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
                <Flex>
                  <Flex direction="horizontal" gap="x1" margin="x1">
                    <InputLabel margin="x1">Module</InputLabel>
                    {hasMounted && (
                      <Tooltip title="Add module name if your Android app contains multiple modules.">
                        {({ ref, ...rest }) => (
                          <Icon {...rest} innerRef={ref} color="gray-5" name="Support" size="1.5rem" />
                        )}
                      </Tooltip>
                    )}
                  </Flex>
                  <InputContainer>
                    <InputContent>
                      <Input
                        name="module"
                        onChange={(event: any) =>
                          onSettingsPropertyChange('androidSettings', 'module', event.target.value)
                        }
                        value={androidSettings.module}
                      />
                    </InputContent>
                  </InputContainer>
                </Flex>
              </Grid>
            </Base>
          </Base>

          <Base margin="x12">
            {
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
                  <Link
                    href={`https://app.bitrise.io/app/${appSlug}/workflow_editor#!/code_signing`}
                    target="_blank"
                    color="grape-3"
                  >
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
                {(keystoreFiles as KeystoreFile[]).map((keystoreFile: KeystoreFile, index) => (
                  <Base key={index}>
                    <RadioButton
                      checked={keystoreFile.slug === androidSettings.selectedKeystoreFile}
                      onChange={() => onSelectedFileChange('KeystoreFile', keystoreFile)}
                    >
                      <Flex
                        direction="horizontal"
                        alignChildrenHorizontal="between"
                        alignChildrenVertical="middle"
                        gap="x3"
                        paddingHorizontal="x1"
                        paddingVertical="x3"
                      >
                        <SVG src="/static/sheet-key.svg" className={css.sheet} />
                        <Text size="x3">{keystoreFile.name}</Text>
                      </Flex>
                    </RadioButton>
                    <Divider color="gray-1" direction="horizontal" margin="x2" />
                  </Base>
                ))}
                {(keystoreFiles as KeystoreFile[]).length === 0 && (
                  <Text size="x3" color="gray-7">
                    No Android Keystore Files
                  </Text>
                )}
              </Base>
            }

            {
              <Base margin="x6">
                <Text size="x3" weight="bold" margin="x1">
                  Android Service Account JSON File
                </Text>
                <Divider color="gray-2" direction="horizontal" margin="x2" />
                {(serviceAccountJsonFiles as ServiceAccountJsonFile[]).map(
                  (serviceAccountJsonFile: ServiceAccountJsonFile, index) => (
                    <Base key={index}>
                      <RadioButton
                        checked={serviceAccountJsonFile.slug === androidSettings.selectedServiceAccount}
                        onChange={() => onSelectedFileChange('ServiceAccountJsonFile', serviceAccountJsonFile)}
                      >
                        <Flex
                          direction="horizontal"
                          alignChildrenHorizontal="between"
                          alignChildrenVertical="middle"
                          gap="x3"
                          paddingHorizontal="x1"
                          paddingVertical="x3"
                        >
                          <SVG src="/static/sheet-cog.svg" className={css.sheet} />
                          <Text size="x3">{serviceAccountJsonFile.name}</Text>
                        </Flex>
                      </RadioButton>
                      <Divider color="gray-1" direction="horizontal" margin="x2" />
                    </Base>
                  )
                )}
                {(serviceAccountJsonFiles as ServiceAccountJsonFile[]).length === 0 && (
                  <Text size="x3" color="gray-7">
                    No Android Service Account JSON File
                  </Text>
                )}
              </Base>
            }
          </Base>
        </Fragment>
      )}

      <Flex margin="x12" direction="horizontal" alignChildrenHorizontal="end" gap="x4">
        <Button disabled={!onCancel || isSaving} level="secondary" width="8rem" grow={!isTablet} onClick={onCancel}>
          Cancel
        </Button>
        <Button disabled={!onSave || isSaving} level="primary" width="8rem" grow={!isTablet} onClick={onSave}>
          {isSaving ? (
            <Fragment>
              <ProgressSpinner /> &nbsp; Saving...
            </Fragment>
          ) : (
            'Save'
          )}
        </Button>
      </Flex>
    </Base>
  );
};

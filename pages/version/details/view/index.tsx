import { Fragment, useState } from 'react';
import formatDate from 'date-fns/format';
import {
  Base,
  Flex,
  Text,
  Icon,
  Notification,
  Button,
  TypeIconName,
  Link,
  ProgressSpinner,
  Modal,
  ModalTitle
} from '@bitrise/bitkit';

import { AppVersion, AppVersionEvent, Screenshot, AppVersionEventStatus } from '@/models';
import { mediaQuery } from '@/utils/media';

import Sidebar from './sidebar';
import FormIos from './form-ios';
import FormAndroid from './form-android';
import NextLink from 'next/link';
import Squircle from '@/components/Squircle';

import Share from './share';
import css from './style.scss';
import MagicTag from '@/components/Tag/MagicTag';

type DeviceInfo = {
  key: string;
  value: string;
  isMarked: boolean;
};

export type Props = {
  appVersion: AppVersion;
  hasMounted: boolean;
  selectedDeviceIdForScreenshots: string;
  availableDevices: DeviceInfo[];
  screenshots?: Screenshot[];
  onScreenshotAdded: (deviceId: string, files: File[]) => void;
  removeScreenshot: (deviceId: string, screenshot: Screenshot) => void;
  featureGraphic?: Screenshot;
  onFeatureGraphicAdded: (featureGraphic: File) => void;
  removeFeatureGraphic: () => void;
  onDeviceSelected: (key: string) => void;
  onSave?: () => void;
  onPublish?: () => void;
  onChange?: (key: string, newValue: string) => void;
  shouldEnableInstall: boolean;
  readyForPublish: boolean;
  isPublishInProgress: boolean;
  publishTarget: string;
  publishTargetURL: string | null;
  settingsPath: string;
  activityPath: string;
  latestEventStatus: AppVersionEvent['status'] | null;
  isSaving: boolean;
};

const publishNotification = (
  appSlug: string,
  versionId: string,
  publishStatus: AppVersionEvent['status'] | null,
  readyForPublish: boolean,
  publishTarget: string,
  publishTargetURL: string | null,
  settingsPath: string,
  activityPath: string
) => {
  if (!readyForPublish) {
    return (
      <Notification margin="x2" type="alert" icon="Warning">
        You need to setup publishing at the{' '}
        <Link underline>
          <NextLink as={settingsPath} href={`/settings?appSlug=${appSlug}`}>
            <a>Settings page</a>
          </NextLink>
        </Link>
        .
      </Notification>
    );
  }

  switch (publishStatus) {
    case AppVersionEventStatus.InProgress:
      return (
        <Notification margin="x2" type="progress">
          Publishing to {publishTarget} is in progress.
        </Notification>
      );
    case AppVersionEventStatus.Success:
      return (
        <Notification margin="x2" type="success">
          Your app has been successfully published to{' '}
          {publishTargetURL ? (
            <Link href={publishTargetURL} target="_blank" underline>
              {publishTarget}
            </Link>
          ) : (
            publishTarget
          )}
          .
        </Notification>
      );
    case AppVersionEventStatus.Failed:
      return (
        <Notification margin="x2" type="alert">
          Publish has failed. See the error log at the{' '}
          <Link underline>
            <NextLink
              as={activityPath}
              href={`/version?appSlug=${appSlug}&versionId=${versionId}&selectedTab=activity`}
            >
              <a>Activity tab</a>
            </NextLink>
          </Link>
          .
        </Notification>
      );
    default:
      return (
        <Notification margin="x2" type="inform" icon="Deployment">
          App is ready for publishing to {publishTarget}.
        </Notification>
      );
  }
};

export default ({
  appVersion,
  hasMounted,
  selectedDeviceIdForScreenshots: deviceId,
  onSave,
  onPublish,
  onChange,
  shouldEnableInstall,
  readyForPublish,
  isPublishInProgress,
  publishTarget,
  publishTargetURL,
  settingsPath,
  activityPath,
  availableDevices,
  latestEventStatus,
  isSaving,
  ...props
}: Props) => {
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const handleCloseShareModal = () => setIsShareModalVisible(false);

  const iconName: TypeIconName = appVersion.platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  const onFormChange = ({ target: { name, value } }: any) => {
    onChange && onChange(name, value);
  };

  const deviceInfo = availableDevices.find(device => device.key === deviceId) as DeviceInfo;

  return (
    <Base>
      <Flex direction="vertical" alignChildren="middle" paddingVertical="x6">
        <Flex maxWidth={isDesktop ? '100%' : 688}>
          {publishNotification(
            appVersion.appSlug,
            appVersion.id,
            isPublishInProgress ? AppVersionEventStatus.InProgress : latestEventStatus,
            readyForPublish,
            publishTarget,
            publishTargetURL,
            settingsPath,
            activityPath
          )}
        </Flex>
      </Flex>
      <Flex
        direction="horizontal"
        alignChildrenHorizontal={isDesktop ? 'between' : 'middle'}
        gap="x16"
        paddingVertical="x4"
      >
        <Flex maxWidth={660}>
          <form onChange={onFormChange}>
            <Flex
              direction={isDesktop ? 'horizontal' : 'vertical'}
              margin="x4"
              gap="x6"
              alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
            >
              <Squircle src={appVersion.iconUrl} borderRadius="x2" width="160px" margin="x0" />

              <Flex
                direction="vertical"
                alignChildrenVertical="middle"
                alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
                gap="x2"
              >
                <Flex
                  direction={isTablet ? 'horizontal' : 'vertical'}
                  alignChildrenVertical="middle"
                  alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
                  gap="x1"
                >
                  <Base className={css.platformIcon}>
                    <Icon color="grape-4" name={iconName} size="2rem" />
                  </Base>
                  <Text
                    letterSpacing="x2"
                    size={isTablet ? 'x6' : 'x5'}
                    weight="bold"
                    color="grape-4"
                    breakOn={isTablet ? 'word' : 'all'}
                    align={isTablet ? 'start' : 'middle'}
                  >
                    {appVersion.appName}
                  </Text>
                </Flex>
                <Flex direction="horizontal" alignChildrenVertical="middle" gap="x2">
                  <Text letterSpacing="x2" size="x5" weight="bold" color="grape-4" margin="x2">
                    v{appVersion.version} ({appVersion.buildNumber})
                  </Text>
                  {appVersion.productFlavour && <MagicTag>{appVersion.productFlavour}</MagicTag>}
                </Flex>
                <Text letterSpacing="x1" size={isTablet ? 'x4' : 'x3'} weight="medium" color="gray-6">
                  Updated on {formatDate(appVersion.lastUpdate, 'MMMM D, YYYY, HH:mm')}
                </Text>
              </Flex>
            </Flex>
            {!isDesktop && (
              <Flex direction={isTablet ? 'horizontal' : 'vertical'} alignChildren="start" gap="x4" margin="x8">
                <Button
                  level="primary"
                  disabled={isSaving}
                  onClick={(evt: Event) => {
                    evt.preventDefault();
                    onSave && onSave();
                  }}
                  width={isTablet ? 'auto' : '100%'}
                >
                  {isSaving ? (
                    <Fragment>
                      <ProgressSpinner /> &nbsp; Saving...
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Icon name="Save" />
                      <Text>Save</Text>
                    </Fragment>
                  )}
                </Button>
                <Button level="secondary" disabled={!shouldEnableInstall} width={isTablet ? 'auto' : '100%'}>
                  <Icon name="Download" />
                  <Text>Install</Text>
                </Button>
                <Button
                  type="button"
                  level="secondary"
                  onClick={() => setIsShareModalVisible(true)}
                  width={isTablet ? 'auto' : '100%'}
                >
                  <Icon name="Chain" />
                  <Text>Share</Text>
                </Button>
              </Flex>
            )}
            {appVersion.platform === 'ios' && (
              <FormIos
                appVersion={appVersion}
                deviceId={deviceId}
                deviceName={deviceInfo.value}
                availableDevices={availableDevices}
                hasMounted={hasMounted}
                {...props}
              />
            )}
            {appVersion.platform === 'android' && (
              <FormAndroid
                appVersion={appVersion}
                deviceId={deviceId}
                deviceName={deviceInfo.value}
                availableDevices={availableDevices}
                hasMounted={hasMounted}
                {...props}
              />
            )}
          </form>
        </Flex>

        {isDesktop && (
          <Flex shrink>
            <Sidebar
              publicInstallPageURL={appVersion.publicInstallPageURL}
              shouldEnablePublish={readyForPublish && !isPublishInProgress}
              isPublished={latestEventStatus === AppVersionEventStatus.Success}
              isPublishInProgress={isPublishInProgress}
              onSave={onSave}
              onPublish={onPublish}
              buildSlug={appVersion.buildSlug}
              ipaExportMethod={appVersion.ipaExportMethod}
              hasMounted={hasMounted}
              isSaving={isSaving}
            />
          </Flex>
        )}
      </Flex>
      <Modal onClose={handleCloseShareModal} visible={isShareModalVisible} width="22rem" backgroundColor="white">
        <ModalTitle>Share this page</ModalTitle>
        <Share
          buildSlug={appVersion.buildSlug}
          publicInstallPageURL={appVersion.publicInstallPageURL}
          ipaExportMethod={appVersion.ipaExportMethod}
          hasMounted={hasMounted}
        ></Share>
      </Modal>
    </Base>
  );
};

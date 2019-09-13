import { Fragment, useState } from 'react';
import QRCode from 'qrcode.react';
import SVG from 'react-svg';
import Clipboard from 'react-clipboard.js';
import { Base, Flex, Text, Icon, Tooltip, Link } from '@bitrise/bitkit';

import { IPAExportMethod } from '@/models';

import css from './style.scss';

type Props = {
  appSlug: string;
  publicInstallPageURL?: string;
  isSplitAPK?: boolean;
  hasUniversalAPK?: boolean;
  ipaExportMethod?: IPAExportMethod;
  hasMounted: boolean;
};

export default ({ appSlug, publicInstallPageURL, isSplitAPK, hasUniversalAPK, ipaExportMethod, hasMounted }: Props) => {
  const [isPublicInstallPageURLCopiedTooltipVisible, setIsPublicInstallPageURLCopiedTooltipVisible] = useState(false);

  const onPublisInstallPageURLCopySuccess = () => {
    setIsPublicInstallPageURLCopiedTooltipVisible(true);

    setTimeout(() => {
      setIsPublicInstallPageURLCopiedTooltipVisible(false);
    }, 2000);
  };

  const prettyIPAExportMethod = (ipaExportMethod: IPAExportMethod) => {
    switch (ipaExportMethod) {
      case 'app-store':
        return 'App Store';
      case 'development':
        return 'Development';
      case 'enterprise':
        return 'Enterprise';
      case 'ad-hoc':
        return 'Ad-hoc';
    }
  };

  return (
    <Flex direction="vertical" gap="x6">
      {publicInstallPageURL ? (
        <Base>
          <Flex
            direction="horizontal"
            alignChildrenHorizontal="between"
            alignChildrenVertical="middle"
            paddingVertical="x2"
            gap="x3"
          >
            <Text weight="bold" size="x3">
              Public Install Page link
            </Text>
            <Base>
              {hasMounted && (
                <Tooltip title="✓ Copied" visible={isPublicInstallPageURLCopiedTooltipVisible}>
                  {({ ref, ...rest }) => (
                    <Clipboard
                      {...rest}
                      data-clipboard-text={publicInstallPageURL}
                      onSuccess={onPublisInstallPageURLCopySuccess}
                      className={css['clipboard-button']}
                    >
                      <Base innerRef={ref} padding="x1" className={css['icon-container']} borderRadius="x1">
                        <Icon name="Duplicate" size="1.5rem" />
                      </Base>
                    </Clipboard>
                  )}
                </Tooltip>
              )}
            </Base>
          </Flex>
          <Base backgroundColor="grape-1" paddingHorizontal="x4" paddingVertical="x3" borderRadius="x1">
            <Text
              Component="a"
              href={publicInstallPageURL}
              breakOn="all"
              color="grape-3"
              weight="medium"
              className={css['public-instal-page-link']}
            >
              {publicInstallPageURL}
            </Text>
          </Base>
          <Flex direction="vertical" alignChildrenHorizontal="middle" paddingVertical="x10">
            <QRCode value={publicInstallPageURL} size={180} />
          </Flex>
          <Flex alignChildrenHorizontal="middle">
            <Flex direction="horizontal" alignChildrenVertical="middle" paddingHorizontal="x6">
              <Base paddingHorizontal="x2">
                <Icon color="grape-4" name="Mobile" />
              </Base>
              <Text color="gray-7" size="x2" weight="medium" paddingHorizontal="x1">
                Scan this code to reach Public Install Page
              </Text>
            </Flex>
          </Flex>
        </Base>
      ) : (
        <Flex
          direction="vertical"
          alignChildrenHorizontal="middle"
          gap="x4"
          margin="x10"
          borderWidth="x2"
          borderColor="gray-3"
          borderRadius="x2"
          padding="x6"
          backgroundColor="gray-1"
          className={css.shareDisabled}
        >
          <Icon name="Chain" size="2rem" />
          <Text align="middle" weight="bold" size="x4">
            You can't share this app
          </Text>
          <Text align="middle" weight="medium" size="x3" color="gray-7">
            {!isSplitAPK || hasUniversalAPK ? (
              <Fragment>
                If you want to share it, you have to enable the app's Public Install Page in the{' '}
                <Link
                  Component="a"
                  color="grape-3"
                  href={`https://app.bitrise.io/app/${appSlug}/workflow_editor`}
                  target="_blank"
                >
                  Deploy to Bitrise.io step
                </Link>
                .
              </Fragment>
            ) : (
              <Fragment>
                If you want to share it, you have to{' '}
                <Link
                  Component="a"
                  color="grape-3"
                  href={`https://developer.android.com/studio/build/configure-apk-splits#configure-abi-split`}
                  target="_blank"
                >
                  enable universal APK
                </Link>{' '}
                generation.
              </Fragment>
            )}
          </Text>
          <SVG src={'/static/purr-request-head.svg'} />
        </Flex>
      )}
      {ipaExportMethod && (
        <Base>
          <Text color="grape-4" weight="bold" paddingVertical="x3">
            Distribution Type: {prettyIPAExportMethod(ipaExportMethod)}
          </Text>

          <Text size="x2" color="gray-7">
            <Flex direction="vertical" gap="x3">
              {ipaExportMethod === 'app-store' && (
                <Text>
                  The app was built for the iOS App Store,{' '}
                  <Text weight="bold" inline>
                    you can't install it on any device
                  </Text>
                  , but you can download the App's .ipa and upload it into the App Store.
                </Text>
              )}
              {ipaExportMethod === 'development' && (
                <Fragment>
                  <Text>
                    The app was signed with a Development Provisioning Profile which means that it{' '}
                    <Text weight="bold" inline>
                      can only be installed on devices which are included in the Provisioning Profile
                    </Text>
                  </Text>
                  <Text>
                    You can find registered devices on the Devices tab, or register your devices at your{' '}
                    <Link href="https://app.bitrise.io/me/profile#/test_devices" target="_blank" underline>
                      Account Settings
                    </Link>{' '}
                    page on Bitrise.
                  </Text>
                </Fragment>
              )}
              {ipaExportMethod === 'enterprise' && (
                <Text>
                  The app was signed with an Enterprise Provisioning Profile and so it{' '}
                  <Text weight="bold" inline>
                    can be installed by anyone
                  </Text>
                  .
                </Text>
              )}
              {ipaExportMethod === 'ad-hoc' && (
                <Fragment>
                  <Text>
                    The app was signed with an Ad Hoc Provisioning Profile which means that it{' '}
                    <Text weight="bold" inline>
                      can only be installed on devices which are included in the Provisioning Profile
                    </Text>
                  </Text>
                  <Text>
                    You can find registered devices on the Devices tab, or register your devices at your{' '}
                    <Link href="https://app.bitrise.io/me/profile#/test_devices" target="_blank" underline>
                      Account Settings
                    </Link>{' '}
                    page on Bitrise.
                  </Text>
                </Fragment>
              )}
            </Flex>
          </Text>
        </Base>
      )}
    </Flex>
  );
};

import { Base, Flex, Text, Icon, Button } from '@bitrise/bitkit';
import { Fragment } from 'react';
import QRCode from 'qrcode.react';
import SVG from 'react-svg';
import Clipboard from 'react-clipboard.js';
import css from './style.scss';

type Props = {
  publicInstallPageURL?: string;
  shouldEnablePublish: boolean;
  onSave?: () => void;
  onPublish?: () => void;
  buildSlug: string;
};

export default ({ publicInstallPageURL, shouldEnablePublish, onSave, onPublish, buildSlug }: Props) => (
  <Base maxWidth="16rem">
    <Base>
      <Button level="primary" fullWidth margin="x4" onClick={onSave}>
        <Icon name="Bug" />
        <Text>Save</Text>
      </Button>
      <Button level="secondary" fullWidth margin="x4" disabled={!shouldEnablePublish} onClick={onPublish}>
        <Icon name="Deployment" />
        <Text>Publish</Text>
      </Button>
    </Base>
    {publicInstallPageURL ? (
      <Fragment>
        <Flex
          direction="horizontal"
          alignChildrenHorizontal="between"
          alignChildrenVertical="middle"
          paddingVertical="x4"
          gap="x3"
        >
          <Text weight="bold" size="x3">
            Public Install Page link
          </Text>
          <Base>
            <Clipboard data-clipboard-text={publicInstallPageURL} className={css['clipboard-button']}>
              <Base padding="x1" className={css['icon-container']} borderRadius="x1">
                <Icon name="Duplicate" size="1.5rem" />
              </Base>
            </Clipboard>
          </Base>
        </Flex>
        <Base backgroundColor="grape-1" paddingHorizontal="x4" paddingVertical="x3" borderRadius="x1">
          <Text
            Component="a"
            href={publicInstallPageURL}
            breakOn="word"
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
      </Fragment>
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
        <Text weight="bold" size="x4">
          Share disabled
        </Text>
        <Text align="middle" weight="medium" size="x3" color="gray-7">
          You can enable sharing via Public Install Page at the build’s{' '}
          <Base
            Component="a"
            color="grape-3"
            href={`https://app.bitrise.io/build/${buildSlug}#?tab=artifacts`}
            target="_blank"
          >
            Apps & Artifacts tab
          </Base>
          .
        </Text>
        <SVG src={'/static/purr-request-head.svg'} />
      </Flex>
    )}
  </Base>
);

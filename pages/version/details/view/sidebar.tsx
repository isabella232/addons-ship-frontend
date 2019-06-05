import QRCode from 'qrcode.react';
import Clipboard from 'react-clipboard.js';
import { Base, Flex, Text, Icon, Button } from '@bitrise/bitkit';
import css from './style.scss';

type Props = {
  publicInstallPageURL: string;
  onSave?: () => void;
};

export default ({ publicInstallPageURL, onSave }: Props) => (
  <Base maxWidth="16rem">
    <Base>
      <Button level="primary" fullWidth margin="x4" onClick={onSave}>
        <Icon name="Bug" />
        <Text>Save</Text>
      </Button>
      <Button level="secondary" fullWidth margin="x4">
        <Icon name="Deployment" />
        <Text>Publish</Text>
      </Button>
    </Base>
    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="middle" paddingVertical="x4">
      <Text weight="bold" size="x3">
        Public Install Page link
      </Text>
      <Base paddingHorizontal="x3">
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
  </Base>
);

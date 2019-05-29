import { Component } from "react";
import { connect } from "react-redux";

import { AppVersion } from "@/models";
import { Base, Flex, Text, Icon, Button, Link } from "@bitrise/bitkit";
import { TypeName } from "@bitrise/bitkit/Icon/tsx";
import QRCode from "qrcode.react";
import Clipboard from "react-clipboard.js";
import css from "./style.scss";

type Props = {
  appVersion: AppVersion;
};

export default ({ appVersion }: Props) => {
  const iconName: TypeName =
    appVersion.platform === "ios" ? "PlatformsApple" : "PlatformsAndroid";

  return (
    <Base maxWidth={250}>
      <Flex
        direction="horizontal"
        alignChildrenHorizontal="between"
        alignChildrenVertical="middle"
        paddingVertical="x4"
      >
        <Flex>
          <Text weight="bold" size="x3">
            Public Install Page link
          </Text>
        </Flex>
        <Flex paddingHorizontal="x3">
          <Clipboard
            data-clipboard-text={appVersion.publicInstallPageURL}
            className={css["clipboard-button"]}
          >
            <Base padding="x1" backgroundColor="grape-1" borderRadius="x1">
              <Icon name="Duplicate" color="grape-3" size="1.5rem" />
            </Base>
          </Clipboard>
        </Flex>
      </Flex>
      <Base
        backgroundColor="grape-1"
        paddingHorizontal="x4"
        paddingVertical="x3"
        borderRadius="x1"
      >
        <Text
          Component="a"
          href={appVersion.publicInstallPageURL}
          breakOn="word"
          color="grape-3"
          weight="medium"
        >
          {appVersion.publicInstallPageURL}
        </Text>
      </Base>
      <Flex
        direction="vertical"
        alignChildrenHorizontal="middle"
        paddingVertical="x10"
      >
        <QRCode value={appVersion.publicInstallPageURL} size={180} />
      </Flex>
      <Flex direction="vertical" alignChildrenHorizontal="middle">
        <Flex
          direction="horizontal"
          alignChildrenVertical="middle"
          paddingHorizontal="x6"
        >
          <Base paddingHorizontal="x2">
            <Icon color="grape-4" name="Mobile" />
          </Base>
          <Base paddingHorizontal="x1">
            <Text color="gray-7" size="x2" weight="medium">
              Scan this code to reach Public Install Page
            </Text>
          </Base>
        </Flex>
      </Flex>
    </Base>
  );
};

import { Component } from "react";
import { connect } from "react-redux";

import { AppVersion } from "@/models";
import { Base, Flex, Text, Icon, Button, Link } from "@bitrise/bitkit";
import { TypeName } from "@bitrise/bitkit/Icon/tsx";
import QRCode from "qrcode.react";

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
      >
        <Flex>
          <Text weight="bold" size="x3">
            Public Install Page link
          </Text>
        </Flex>
        <Button>
          <Base padding="x1" backgroundColor="grape-1" borderRadius="x1">
            <Icon name="Duplicate" color="grape-3" size="1.5rem" />
          </Base>
        </Button>
      </Flex>
      <Base
        backgroundColor="grape-1"
        padding="x3"
        borderRadius="x1"
        wordWrap="break-word"
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
        paddingVertical="x8"
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

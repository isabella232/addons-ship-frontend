import React from 'react';
import { Button, Buttons, Flex, Status404, Text, Icon } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';

type Props = {
  appSlug?: string;
};

export default ({ appSlug }: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Flex direction="vertical" grow alignChildrenVertical="middle" paddingVertical="x10">
      <Status404 />

      {appSlug && (
        <Flex direction="horizontal" alignChildren="middle" style={{ marginTop: -100 }}>
          <Button
            Component="a"
            href={`https://app.bitrise.io/app/${appSlug}/addon/addons-ship/login_page`}
            level="splash"
            size="large"
            gap="x2"
          >
            <Icon name="Ship" />
            <Text>Reauthenticate</Text>
          </Button>
        </Flex>
      )}

      <Text align="middle" config="5" margin="x8">
        Do you prefer the deep unkown, or looking for something else?
      </Text>

      <Buttons
        alignChildren={isDesktop ? 'middle' : undefined}
        fullWidth={!isDesktop}
        gap={isDesktop ? 'x6' : 'x3'}
        paddingHorizontal="x10"
      >
        <Button Component="a" href="https://app.bitrise.io/dashboard/apps" level="light" size="small">
          Bitrise Dashboard
        </Button>

        <Button
          Component="a"
          href="https://devcenter.bitrise.io/tips-and-tricks/tips-and-tricks-index/"
          level="light"
          size="small"
        >
          Learn Bitrise Tricks
        </Button>

        <Button Component="a" href="https://careers.bitrise.io/" level="light" size="small">
          Check Open Positions
        </Button>
      </Buttons>
    </Flex>
  );
};

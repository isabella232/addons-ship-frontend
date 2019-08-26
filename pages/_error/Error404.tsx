import React from 'react';
import { Button, Buttons, Flex, Status404, Text } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';

export default () => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Flex direction="vertical" gap="x10" grow alignChildrenVertical="middle">
      <Status404 />
      <Text align="middle" config="5" margin="x8">
        Do you prefer the deep unkown, or looking for something else?
      </Text>

      <Buttons
        alignChildren={isDesktop ? 'middle' : undefined}
        fullWidth={!isDesktop}
        gap={isDesktop ? 'x6' : 'x3'}
        paddingHorizontal="x10"
      >
        <Button Component="a" href="https://app.bitrise.io/dashboard/apps" level="splash" size="large">
          Dashboard
        </Button>

        <Button
          Component="a"
          href="https://devcenter.bitrise.io/tips-and-tricks/tips-and-tricks-index/"
          level="splash"
          size="large"
        >
          Learn Bitrise Tricks
        </Button>

        <Button Component="a" href="https://careers.bitrise.io/" level="splash" size="large">
          Check Open Positions
        </Button>
      </Buttons>
    </Flex>
  );
};

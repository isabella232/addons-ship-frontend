import React from 'react';
import { Flex, Status500 } from '@bitrise/bitkit';

export default () => (
  <Flex direction="vertical" gap="x10" grow alignChildrenVertical="middle">
    <Status500 />
  </Flex>
);

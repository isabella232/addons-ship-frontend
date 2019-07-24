import { Base, Flex, Text } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';

export default () => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <Flex direction="vertical" alignChildrenHorizontal="middle" paddingVertical="x16">
      <Flex direction="vertical" alignChildrenHorizontal="middle" maxWidth={isDesktop ? '730px' : '90%'}>
        <Text size={isDesktop ? 'x6' : 'x4'} weight="bold" color="grape-4">
          Feature coming soon! 🚀
        </Text>
        <Text size="x3" color="gray-7" margin="x5" align="middle">
          We are planning to extend Ship's functionality with more collaboration options for stakeholders in the project
          (QA, engineers, product managers, designers and so on) and also to support gated releases. Please let us know
          what you would like to see on this tab.
        </Text>
        <Base backgroundColor="grape-1" borderRadius="x2" padding="x5">
          <Text
            Component="a"
            href="https://discuss.bitrise.io/c/feature-request/ship"
            target="_blank"
            size={isDesktop ? 'x4' : 'x3'}
            weight="bold"
            color="grape-3"
          >
            https://discuss.bitrise.io/c/feature-request/ship
          </Text>
        </Base>
      </Flex>
    </Flex>
  );
};

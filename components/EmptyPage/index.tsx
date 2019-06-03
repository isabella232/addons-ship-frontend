import { Base, Flex, Text } from '@bitrise/bitkit';

import css from './style.scss';

export default () => {
  return (
    <Base className={css.emptyPage} paddingVertical="x16">
      <Flex className={css.textContainer} direction="vertical" alignChildrenVertical="middle">
        <Text align="middle" weight="bold" size="x4">
          First, you need to build an IPA/APK
        </Text>
      </Flex>
    </Base>
  );
};

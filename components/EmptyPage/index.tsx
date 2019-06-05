import { Base, Flex, Text } from '@bitrise/bitkit';

import css from './style.scss';
import { mediaQuery } from '@/utils/media';

export default () => {
  const [isTablet] = mediaQuery('50rem');
  return (
    <Flex className={css.emptyPage} paddingVertical="x16" grow>
      <Flex className={css.textContainer} direction="vertical" alignChildrenVertical="middle">
        <Text align="middle" weight="bold" size={isTablet ? 'x4' : 'x3'}>
          First, you need to build an IPA/APK
        </Text>
      </Flex>
    </Flex>
  );
};

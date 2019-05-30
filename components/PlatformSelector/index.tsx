import { Base, Flex, Icon, TypeColors } from '@bitrise/bitkit';
import cx from 'classnames';

import { Platform } from '@/models';

import css from './style.scss';

interface PlatformSelectorProps {
  platform: Platform;
  onClick: (platform: Platform) => void;
}

export default ({ platform, onClick }: PlatformSelectorProps) => {
  return (
    <Flex alignChildren="middle" direction="horizontal">
      <Flex
        direction="horizontal"
        className={css.platform}
        alignChildren="middle"
        backgroundColor="white"
        borderRadius="x2"
      >
        <Base
          className={cx(css.Base, { [css.selected]: platform === 'ios' })}
          paddingHorizontal="x6"
          paddingVertical="x3"
          onClick={() => onClick('ios')}
        >
          <Icon name="PlatformsApple" />
        </Base>
        <Base
          className={cx(css.Base, { [css.selected]: platform === 'android' })}
          paddingHorizontal="x6"
          paddingVertical="x3"
          onClick={() => onClick('android')}
        >
          <Icon name="PlatformsAndroid" />
        </Base>
      </Flex>
    </Flex>
  );
};

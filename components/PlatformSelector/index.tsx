import { ReactNode } from 'react';
import { Base, Button, Flex, Icon } from '@bitrise/bitkit';
import css from './style.scss';
import cx from 'classnames';

interface PlatformSelectorProps {
  platform: string;
}

export default ({ platform }: PlatformSelectorProps) => (
  <Base paddingVertical="x12">
    <Flex direction="horizontal" className={css.platform}>
      <Base className={cx(css.Base, { [css.selected]: platform === 'ios' })}>
        <Icon name="PlatformsApple" />
      </Base>
      <Base className={cx(css.Base, { [css.selected]: platform === 'android' })}>
        <Icon name="PlatformsAndroid" />
      </Base>
    </Flex>
  </Base>
);

import { Base, Icon, Buttons, Button } from '@bitrise/bitkit';

import { Platform } from '@/models';

import css from './style.scss';

interface PlatformSelectorProps {
  platform?: Platform;
  onClick: (platform: Platform) => void;
}

export default ({ platform = 'ios', onClick }: PlatformSelectorProps) => {
  return (
    <Base className={css.PlatformSelector} paddingVertical="x5">
      <Buttons joined>
        <Button onClick={() => onClick('ios')} level={platform === 'ios' ? 'light' : 'secondary'}>
          <Base paddingHorizontal="x2">
            <Icon name="PlatformsApple" />
          </Base>
        </Button>

        <Button onClick={() => onClick('android')} level={platform === 'android' ? 'light' : 'secondary'}>
          <Base paddingHorizontal="x2">
            <Icon name="PlatformsAndroid" />
          </Base>
        </Button>
      </Buttons>
    </Base>
  );
};

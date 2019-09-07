import Link from 'next/link';
import { Base, Text, TypeIconName, Icon } from '@bitrise/bitkit';

import Squircle from '@/components/Squircle';
import { mediaQuery } from '@/utils/media';

import Banner from './Banner';
import css from './style.scss';

interface AppSummaryProps {
  platform: string;
  detailsPagePath: string;
  detailsPagePathHref: string;
  title: string;
  description: string;
  note: string;
  iconUrl: string;
  startColor?: string;
  endColor?: string;
}

export default ({
  platform,
  detailsPagePath,
  detailsPagePathHref,
  title,
  description,
  note,
  iconUrl,
  startColor,
  endColor
}: AppSummaryProps) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  const iconName: TypeIconName = platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

  if (!startColor || !endColor) {
    startColor = '#0d83cd';
    endColor = '#0dd3c5';
  }

  return (
    <Link href={detailsPagePathHref} as={detailsPagePath}>
      <a className={css.appSummary}>
        <Base className={css.colorBar}>
          <Banner startColor={startColor} endColor={endColor} />
        </Base>
        <div className={css.body}>
          <div className={css.iconWrapper}>
            <Squircle src={iconUrl} borderRadius="x2" width="96px" margin="x0" />

            <Base paddingHorizontal="x4" paddingVertical={isTablet ? 'x2' : 'x4'}>
              <Text size={isTablet ? 'x3' : 'x2'} color="gray-6" letterSpacing="x1" weight="medium">
                {note}
              </Text>
            </Base>
            <div className={css.note} />
          </div>
          <div className={css.titleWrapper}>
            <Base className={css.platformIconWrapper}>
              <Icon color="grape-4" name={iconName} size="1.5rem" />
            </Base>
            <Text size={isDesktop ? 'x5' : 'x4'} color="grape-4" weight="bold" letterSpacing="x1">
              {title}
            </Text>
          </div>
          {description && <div className={css.description}>{description}</div>}
        </div>
      </a>
    </Link>
  );
};

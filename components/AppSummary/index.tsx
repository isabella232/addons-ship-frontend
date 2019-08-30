import SVG from 'react-svg';
import Link from 'next/link';
import { Base, Text } from '@bitrise/bitkit';

import Squircle from '@/components/Squircle';
import { mediaQuery } from '@/utils/media';

import css from './style.scss';

interface AppSummaryProps {
  detailsPagePath: string;
  title: string;
  description: string;
  note: string;
  iconUrl: string;
  platformIconUrl: string;
}

export default ({ detailsPagePath, title, description, note, iconUrl, platformIconUrl }: AppSummaryProps) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');
  const primaryColor = '#0D83CD';
  const secondaryColor = '#0DD3C5';

  return (
    <Link href={detailsPagePath}>
      <a className={css.appSummary}>
        <div
          className={css.colorBar}
          style={{
            backgroundImage: `url('/static/latest-version-bg.svg'), linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
          }}
        />
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
            <SVG src={platformIconUrl} />
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

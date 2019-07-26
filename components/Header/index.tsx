import { ReactNode } from 'react';
import { Base, AddonBeam, AddonBeamLink } from '@bitrise/bitkit';

import css from './style.scss';
import Link from 'next/link';

type Props = {
  children?: ReactNode;
  appSlug?: string;
};

const Header = ({ children, appSlug = 'test-app-slug-1' }: Props) => (
  <Base>
    <AddonBeam
      addonIcon="SecurityShield"
      addonName="Ship"
      appLink="http://link-to-my.app"
      appName="My SuperDuper App"
      backgroundColor="grape-4"
      color="white"
    >
      <Link href={`/settings?appSlug=${appSlug}`} as={`/apps/${appSlug}/settings`}>
        <AddonBeamLink href="" Component="a" icon="Settings">
          Settings
        </AddonBeamLink>
      </Link>
    </AddonBeam>
    <div className={css.header}>{children}</div>
  </Base>
);

export default Header;

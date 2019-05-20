import { ReactNode } from 'react';

import css from './style.scss';
import SVG from 'react-svg';

interface BreadcrumbsProps {
  appName: string;
  versionIconUrl: string;
  children: ReactNode;
}

export default ({ appName, versionIconUrl, children }: BreadcrumbsProps) => (
  <div className={css.breadcrumbs}>
    <a href="/" className={css.appName}>
      {appName}
    </a>
    <div className={css.versionNameWrapper}>
      <SVG src={versionIconUrl} className={css.versionIcon} />
      <h2 className={css.versionName}>{children}</h2>
    </div>
  </div>
);

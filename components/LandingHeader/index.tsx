import { ReactNode } from 'react';

import css from './style.scss';
import SVG from 'react-inlinesvg';

interface LandingHeaderProps {
  iconUrl: string;
  children: ReactNode;
}

export default ({ iconUrl, children }: LandingHeaderProps) => (
  <div className={css.titleWrapper}>
    <SVG src={iconUrl} className={css.icon} />
    <h1 className={css.title}>{children}</h1>
  </div>
);

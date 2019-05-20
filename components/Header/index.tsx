import { ReactNode } from 'react';

import css from './style.scss';
import SVG from 'react-inlinesvg';

interface HeaderProps {
  iconUrl: string;
  children: ReactNode;
}

export default ({ iconUrl, children }: HeaderProps) => (
  <div className={css.titleWrapper}>
    <SVG src={iconUrl} className={css.icon} />
    <h1 className={css.title}>{children}</h1>
  </div>
);

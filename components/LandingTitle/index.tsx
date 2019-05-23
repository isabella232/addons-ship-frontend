import { ReactNode } from 'react';
import css from './style.scss';
import SVG from 'react-svg';

interface LandingTitleProps {
  iconUrl: string;
  children: ReactNode;
}

export default ({ iconUrl, children }: LandingTitleProps) => (
  <div className={css.landingTitle}>
    <SVG src={iconUrl} className={css.icon} />
    <h1 className={css.title}>{children}</h1>
  </div>
);

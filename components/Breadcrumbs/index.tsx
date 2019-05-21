import css from './style.scss';
import SVG from 'react-svg';
import { ReactNode } from 'react';

interface BreadcrumbsProps {
  links: { name: string; url: string }[];
  iconUrl: string;
  children: ReactNode;
}

export default ({ links, iconUrl, children }: BreadcrumbsProps) => (
  <div className={css.breadcrumbs}>
    <div className={css.breadcrumbLinks}>
      {links.map((link, index) => (
        <a key={index} href={link.url} className={css.link}>
          {link.name}
        </a>
      ))}
    </div>
    <div className={css.nameWrapper}>
      <SVG src={iconUrl} className={css.iconUrl} />
      <h2 className={css.name}>{children}</h2>
    </div>
  </div>
);

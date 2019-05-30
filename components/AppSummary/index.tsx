import css from './style.scss';
import SVG from 'react-svg';
import Link from 'next/link';

interface AppSummaryProps {
  detailsPagePath: string;
  title: string;
  description: string;
  note: string;
  iconUrl: string;
  platformIconUrl: string;
}

export default ({ detailsPagePath, title, description, note, iconUrl, platformIconUrl }: AppSummaryProps) => (
  <Link href={detailsPagePath}>
    <a className={css.appSummary}>
      <div className={css.colorBar} />
      <div className={css.body}>
        <div className={css.iconWrapper}>
          <div className={css.icon}>
            <SVG src={iconUrl} />
          </div>
          <div className={css.note}>{note}</div>
        </div>
        <div className={css.titleWrapper}>
          <SVG src={platformIconUrl} />
          <div className={css.title}>{title}</div>
        </div>
        <div className={css.description}>{description}</div>
      </div>
    </a>
  </Link>
);

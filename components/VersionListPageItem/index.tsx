import { Component } from 'react';
import css from './style.scss';
import SVG from 'react-svg';
import Link from 'next/link';

interface VersionListPageItemProps {
  detailsPagePath: string;
  platformIconUrl: string;
  title: string;
  description: string;
  note: string;
}

type VersionListPageItemState = {
  isOpen: boolean;
};

export default class VersionListPageItem extends Component<VersionListPageItemProps, VersionListPageItemState> {
  state: VersionListPageItemState = {
    isOpen: false
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { detailsPagePath, platformIconUrl, title, description, note } = this.props;
    const { isOpen } = this.state;

    const descriptionWrapperClasses = [css.descriptionWrapper];
    if (isOpen) {
      descriptionWrapperClasses.push(css.isOpen);
    }

    return (
      <div className={css.versionListPageItem}>
        <div className={css.versionListPageItemInner}>
          <Link href={detailsPagePath}>
            <a className={css.topWrapper}>
              <SVG src={platformIconUrl} className={css.platformIcon} />
              <div className={css.title}>{title}</div>
              <div className={css.note}>{note}</div>
            </a>
          </Link>
          <button className={descriptionWrapperClasses.join(' ')} onClick={this.toggle}>
            <div className={css.description}>{description}</div>
            {description &&
              (isOpen ? (
                <div className={css.showLess}>
                  <div className={css.text}>Show less</div>
                  <SVG src="/static/arrow-down.svg" className={css.arrow} />
                </div>
              ) : (
                <div className={css.showMore}>
                  <div className={css.text}>Show more</div>
                  <SVG src="/static/arrow-down.svg" className={css.arrow} />
                </div>
              ))}
          </button>
        </div>
      </div>
    );
  }
}

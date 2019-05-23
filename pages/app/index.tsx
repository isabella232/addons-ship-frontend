import { Component, Fragment } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

import { NextContext } from 'next';
import { NextDocumentContext } from 'next/document';

import css from './style.scss';

import { AppPageQuery } from '@/models';
import AppSummary from '@/components/AppSummary';
import SectionHeading from '@/components/SectionHeading';
import VersionListPageItem from '@/components/VersionListPageItem';
import Footer from '@/components/Footer';

interface AppPageProps extends AppPageQuery {}

type AppPageState = {};

interface Context extends NextDocumentContext {
  store: Store;
  isServer: boolean;
}

class AppPage extends Component<AppPageProps, AppPageState> {
  state: AppPageState = {};

  static getInitialProps({ query: { appSlug } }: NextContext) {
    return { appSlug };
  }

  render() {
    const { appSlug } = this.props;

    return (
      <div className={css.appPageWrapper}>
        <div className={css.appPage}>
          <div className={css.appSummaryWrapper}>
            <AppSummary
              detailsPagePath="/v1-1-0/details"
              title="My app v1.1.0 (28)"
              description="This is a short description about my app. It is a good app. End of description."
              note="Updated on January 29, 2008"
              iconUrl="/static/icon-flutter.svg"
              platformIconUrl="/static/icon-apple.svg"
            />
          </div>
          <SectionHeading>Version History</SectionHeading>
          {Array(3)
            .fill(null)
            .map((_number, i) => (
              <Fragment key={i}>
                <div className={css.majorVersionHeading}>v.{i}</div>
                {Array(4)
                  .fill(null)
                  .map((_number, j) => (
                    <VersionListPageItem
                      key={`${i}-${j}`}
                      detailsPagePath={`/v${i}-${j}-0/details`}
                      platformIconUrl="/static/icon-apple.svg"
                      title={`My app v${i}.${j}.0 (28)`}
                      description={`This is a short description about my ${j}. app. It is a good app. End of description.`}
                      note={`Updated on January ${j}, 2008`}
                    />
                  ))}
              </Fragment>
            ))}
        </div>
        <div className={css.footerWrapper}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default AppPage;

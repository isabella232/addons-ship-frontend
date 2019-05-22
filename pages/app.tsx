import { Component, Fragment } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';

import { NextContext } from 'next';
import { NextDocumentContext } from 'next/document';

import { AppPageQuery } from '@/models';
import AppSummary from '@/components/AppSummary';
import SectionHeading from '@/components/SectionHeading';
import VersionListPageItem from '@/components/VersionListPageItem';

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
      <Fragment>
        <AppSummary
          detailsPagePath="/v1-1-0/details"
          title="My app v1.1.0 (28)"
          description="This is a short description about my app. It is a good app. End of description."
          note="Updated on January 29, 2008"
          iconUrl="/static/icon-flutter.svg"
          platformIconUrl="/static/icon-apple.svg"
        />
        <SectionHeading>Version History</SectionHeading>
        {Array(10)
          .fill(null)
          .map((_number, index) => (
            <VersionListPageItem
              key={index}
              detailsPagePath={`/v1-${index}-0/details`}
              platformIconUrl="/static/icon-apple.svg"
              title={`My app v1.${index}.0 (28)`}
              description={`This is a short description about my ${index}. app. It is a good app. End of description.`}
              note={`Updated on January ${index}, 2008`}
            />
          ))}
      </Fragment>
    );
  }
}

export default AppPage;

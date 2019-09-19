import React, { Fragment, ReactNode } from 'react';
import { connect } from 'react-redux';

import Header from '@/components/Header';
import { RequestError } from '@/models/errors';

import { RootState } from '../../store';
import ErrorPage from '../_error';

type Props = {
  error?: Error | RequestError | null;
  appSlug: string;
  children: ReactNode;
};

export const AppContent = ({ error, appSlug, children }: Props) => {
  if (error) {
    return (
      <Fragment>
        <Header hideBreadcrumbs />
        <ErrorPage appSlug={appSlug} statusCode={(error as RequestError).status || 500} />
      </Fragment>
    );
  }

  return <Fragment>{children}</Fragment>;
};

const mapSateToProps = ({ error }: RootState) => ({
  error
});

// @ts-ignore
export default connect(mapSateToProps)(AppContent);

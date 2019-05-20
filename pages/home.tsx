import { Fragment } from 'react';

import Title from '@/components/Title';
import Counter from '@/components/Counter';
import Header from '@/components/Header';
import VersionPageHeader from '@/components/VersionPageHeader';

export default () => (
  <Fragment>
    <Header iconUrl="/static/icon-flutter.svg">My app</Header>
    <Title>Bitrise Ship Add-on frontend</Title>
    <Counter />
  </Fragment>
);

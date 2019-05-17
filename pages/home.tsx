import { Fragment } from 'react';

import Title from '@/components/Title';
import Counter from '@/components/Counter';
import LandingHeader from '@/components/LandingHeader';

export default () => (
  <Fragment>
    <LandingHeader iconUrl="/static/icon-flutter.svg">My app</LandingHeader>
    <Title>Bitrise Ship Add-on frontend</Title>
    <Counter />
  </Fragment>
);

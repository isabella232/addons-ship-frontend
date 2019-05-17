import { Fragment } from 'react';

import Title from '@/components/Title';
import Counter from '@/components/Counter';
import LandingHeader from '@/components/LandingHeader';

export default () => (
  <Fragment>
    <LandingHeader iconUrl="https://www.bitrise.io/assets/svg/logo-bitrise.svg">My app</LandingHeader>
    <Title>Bitrise Ship Add-on frontend</Title>
    <Counter />
  </Fragment>
);

import { Fragment } from 'react';
import Title from '@/components/Title';
import Counter from '@/components/Counter';
import Header from '@/components/Header';
import LandingTitle from '@/components/LandingTitle';

export default () => (
  <Fragment>
    <Header>
      <LandingTitle iconUrl="/static/icon-flutter.svg">My app</LandingTitle>
    </Header>
    <Title>Bitrise Ship Add-on frontend</Title>
    <Counter />
  </Fragment>
);

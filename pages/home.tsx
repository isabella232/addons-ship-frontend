import Header from '@/components/Header';
import LandingTitle from '@/components/LandingTitle';

import { Base, Text } from '@bitrise/bitkit';

export default () => (
  <Base paddingVertical="x12">
    <Header>
      <LandingTitle iconUrl="/static/icon-flutter.svg">My app</LandingTitle>
    </Header>
    <Text size="x5" color="grape-3">
      Bitrise Ship Add-on frontend
    </Text>
  </Base>
);

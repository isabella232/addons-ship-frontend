import { Flex, Icon, Text, TypeIconName } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';

export type Props = {
  type: string;
  title: string;
  smaller?: boolean;
};

export default ({ type, title }: Props) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  let iconName: TypeIconName;
  switch (type) {
    case 'android':
      iconName = 'PlatformsAndroid';
      break;
    case 'ios':
      iconName = 'PlatformsApple';
      break;
    case 'cordova':
      iconName = 'PlatformsCordova';
      break;
    case 'fastlane':
      iconName = 'PlatformsFastlane';
      break;
    case 'flutter':
      iconName = 'PlatformsFlutter';
      break;
    case 'macos':
      iconName = 'PlatformsMacos';
      break;
    case 'ionic':
      iconName = 'PlatformsIonic';
      break;
    case 'react':
      iconName = 'PlatformsReact';
      break;
    case 'xamarin':
      iconName = 'PlatformsXamarin';
      break;
    case 'settings':
      iconName = 'Settings';
      break;
    default:
      iconName = 'Bitbot';
      break;
  }

  return (
    <Flex
      direction="horizontal"
      alignChildrenVertical="middle"
      paddingHorizontal={isDesktop ? 'x0' : 'x4'}
      gap="x2"
      color="white"
    >
      <Icon name={iconName} size="2rem" />
      <Text size={isDesktop ? "x6" : "x5"} weight="bold" breakOn={isTablet ? 'all' : 'word'}>
        {title}
      </Text>
    </Flex>
  );
};

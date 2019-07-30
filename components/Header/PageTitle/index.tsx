import { Flex, Icon, Text, TypeIconName, TypeTextSize } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';

export type Props = {
  projectType: string;
  title: string;
  smaller?: boolean;
};

export default ({ projectType, title, smaller = false }: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  let platformIcon: TypeIconName;
  switch (projectType) {
    case 'android':
      platformIcon = 'PlatformsAndroid';
      break;
    case 'ios':
      platformIcon = 'PlatformsApple';
      break;
    case 'cordova':
      platformIcon = 'PlatformsCordova';
      break;
    case 'ionic':
      platformIcon = 'PlatformsIonic';
      break;
    case 'react':
      platformIcon = 'PlatformsReact';
      break;
    case 'xamarin':
      platformIcon = 'PlatformsXamarin';
      break;
    case 'settings':
      platformIcon = 'Settings';
      break;
    default:
      platformIcon = 'Bitbot';
      break;
  }

  // I'm sorry... https://gph.is/22Wx2jP
  const fontSize = `x${6 - +!isDesktop - +smaller}` as TypeTextSize;

  return (
    <Flex
      direction="horizontal"
      alignChildrenVertical="middle"
      paddingHorizontal={isDesktop ? 'x0' : 'x4'}
      gap="x2"
      color="white"
    >
      <Icon name={platformIcon} size="2rem" />
      <Text size={fontSize} weight="bold">
        {title}
      </Text>
    </Flex>
  );
};

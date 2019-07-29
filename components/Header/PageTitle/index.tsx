import { Flex, Icon, Text, TypeIconName } from '@bitrise/bitkit';

export type Props = {
  projectType: string;
  title: string;
  smaller?: boolean;
};

export default ({ projectType, title, smaller }: Props) => {
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

  return (
    <Flex direction="horizontal" alignChildrenVertical="middle" gap="x2" color="white">
      <Icon name={platformIcon} size="2rem" />
      <Text size={smaller ? 'x5' : 'x6'} weight="bold">
        {title}
      </Text>
    </Flex>
  );
};

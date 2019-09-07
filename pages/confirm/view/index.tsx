import { Flex, Text, Card, CardContent, Image, Icon, Button } from '@bitrise/bitkit';

import { AppContact } from '@/models/settings';
import { mediaQuery } from '@/utils/media';

import css from './style.scss';

export type Props = {
  appSlug: string;
  appIconUrl: string;
  appTitle: string;
  notificationPreferences: AppContact['notificationPreferences'];
};

export const NotificationSetting = ({ children, isEnabled }: { children: string; isEnabled: boolean }) => (
  <Flex direction="horizontal">
    {isEnabled ? <Icon color="green-3" name="Tick" /> : <Icon color="red-3" name="CloseSmall" />}
    <Text size="x3" color="gray-7" paddingHorizontal="x2">
      {children}
    </Text>
  </Flex>
);

export default ({
  appSlug,
  appIconUrl,
  appTitle,
  notificationPreferences: { newVersion, successfulPublish, failedPublish }
}: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  return (
    <div className={css.container}>
      <Flex
        direction="vertical"
        alignChildrenHorizontal="middle"
        paddingVertical={isDesktop ? 'x16' : 'x8'}
        paddingHorizontal="x4"
      >
        <Text size="x5" weight="bold" color="grape-5" align="middle">
          You confirmed to get notifications
        </Text>

        <Text size="x3" color="gray-8" margin="x2">
          Now you will get activity updates of this app:
        </Text>

        <Card margin="x8" width={isDesktop ? '420px' : '100%'}>
          <CardContent padding="x3" direction="horizontal" alignChildrenVertical="middle">
            <Image src={appIconUrl} width="28px" />
            <Flex grow>
              <Text size="x3" weight="bold" color="gray-6" paddingHorizontal="x3">
                {appTitle}
              </Text>
            </Flex>
          </CardContent>
        </Card>

        <Text size="x3" color="gray-7" weight="bold">
          Notification Settings:
        </Text>
        <div>
          <NotificationSetting isEnabled={newVersion}>New app version</NotificationSetting>
          <NotificationSetting isEnabled={successfulPublish}>Successful publish</NotificationSetting>
          <NotificationSetting isEnabled={failedPublish}>Failed publish</NotificationSetting>
        </div>

        <Button href={`/apps/${appSlug}`} Component="a" level="primary" margin="x10">
          View App
        </Button>
      </Flex>
    </div>
  );
};

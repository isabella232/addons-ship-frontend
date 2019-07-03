import formatDate from 'date-fns/format';

import { Divider, Base, Text, Flex, Icon, Button, Link } from '@bitrise/bitkit';
import { Fragment } from 'react';
import { TypeIconName } from '@bitrise/bitkit/lib/esm/Icon/tsx';

type Props = {};

const activityItem = (status: string, message: string, buildLogUrl?: string) => {
  let styleConfig = {
    iconName: 'Tick',
    iconColor: 'green-4',
    textColor: 'grape-4'
  };

  switch (status) {
    case 'error': {
      styleConfig.iconName = 'CloseSmall';
      styleConfig.iconColor = 'red-3';
      styleConfig.textColor = 'red-3';
    }
  }

  return (
    <Flex direction="horizontal" gap="x4" grow>
      <Flex direction="horizontal" gap="x4" grow>
        <Icon name={styleConfig.iconName as TypeIconName} color={styleConfig.iconColor as any} />
        <Text size="x3" color={styleConfig.textColor as any}>
          {message}
        </Text>
      </Flex>
      {status === 'error' && (
        <Link href={buildLogUrl}>
          <Button level="secondary" size="small">
            <Icon name="Download" color="grape-4" />
            Download Build Log
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default ({  }: Props) => (
  <Base paddingVertical="x8">
    <Flex direction="horizontal" gap="x4" paddingHorizontal="x3" paddingVertical="x4">
      <Text size="x3" color="grape-5" weight="bold" width="200px" shrink="0">
        Date
      </Text>
      <Text size="x3" color="grape-5" weight="bold">
        Activity
      </Text>
    </Flex>
    {['a', 'b', 'c'].map((activity: string, index: number) => (
      <Fragment key={index}>
        <Divider color="gray-2" direction="horizontal" width="0.125rem" />
        <Flex direction="horizontal" gap="x4" paddingHorizontal="x3" paddingVertical="x4">
          <Text size="x3" color="gray-7" width="200px" shrink="0">
            {formatDate(new Date(), 'YYYY MM DD hh:mm:ss')}
          </Text>
          {activityItem('error', activity, 'kaka')}
        </Flex>
      </Fragment>
    ))}
  </Base>
);

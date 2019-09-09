import { Fragment } from 'react';
import formatDate from 'date-fns/format';
import { dayInWords } from '@/utils/time';

import {
  Base,
  Text,
  Flex,
  Icon,
  Button,
  TypeColors,
  TableBody,
  TableCell,
  Table,
  TableRow,
  TableHeaderRow,
  TableHeaderCell,
  TableHeader,
  Skeleton,
  SkeletonBox,
  Divider
} from '@bitrise/bitkit';
import { TypeIconName } from '@bitrise/bitkit';
import { AppVersionEvent } from '@/models';

type Props = {
  appVersionEvents: AppVersionEvent[];
  isLoading: boolean;
};

const textWithIcon = (status: AppVersionEvent['status'], message: string) => {
  let iconName: TypeIconName = 'Tick',
    iconColor: TypeColors = 'green-4',
    textColor: TypeColors = 'grape-4';

  if (status === 'failed') {
    iconName = 'CloseSmall';
    iconColor = 'red-3';
    textColor = 'red-3';
  }

  return (
    <Flex direction="horizontal" gap="x4" height="2rem" alignChildrenVertical="middle">
      <Icon name={iconName} color={iconColor} />
      <Text size="x3" color={textColor}>
        {message}
      </Text>
    </Flex>
  );
};

export default ({ appVersionEvents, isLoading }: Props) => (
  <Base paddingVertical="x8">
    {isLoading ? (
      <Base margin="x8">
        <Skeleton active>
          {[...Array(5)].map((_, idx) => (
            <Fragment key={idx}>
              <Base paddingHorizontal="x4" paddingVertical="x3">
                <SkeletonBox height="1.5rem" margin="x2" />
              </Base>
              <Divider width="1px" color="gray-2" />
            </Fragment>
          ))}
        </Skeleton>
      </Base>
    ) : (
      <Table type="flat">
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell colSpan="2">Activity</TableHeaderCell>
          </TableHeaderRow>
        </TableHeader>
        <TableBody>
          {appVersionEvents.map((appVersionEvent: AppVersionEvent, index: number) => (
            <TableRow key={index}>
              <TableCell shrink title={formatDate(appVersionEvent.createdAt, 'YYYY-MM-DD HH:mm:ss')}>
                {dayInWords(appVersionEvent.createdAt)} at {formatDate(appVersionEvent.createdAt, 'HH:mm:ss')}
              </TableCell>
              <TableCell>{textWithIcon(appVersionEvent.status, appVersionEvent.text)}</TableCell>
              <TableCell shrink>
                {appVersionEvent.status === 'failed' && (
                  <a href={appVersionEvent.logDownloadUrl}>
                    <Button level="secondary" size="small">
                      <Icon name="Download" color="grape-4" />
                      Download Build Log
                    </Button>
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Base>
);

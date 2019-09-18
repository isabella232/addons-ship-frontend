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
import { mediaQuery } from '@/utils/media';

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

export default ({ appVersionEvents, isLoading }: Props) => {
  const [isTablet] = mediaQuery('30rem');

  return (
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
          {isTablet && (
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell colSpan="2">Activity</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
          )}
          <TableBody>
            {appVersionEvents.map((appVersionEvent: AppVersionEvent, index: number) =>
              isTablet ? (
                <TableRow key={index}>
                  <TableCell title={formatDate(appVersionEvent.createdAt, 'YYYY-MM-DD HH:mm:ss')}>
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
              ) : (
                <TableRow key={index} style={{ display: 'block' }}>
                  <TableCell
                    title={formatDate(appVersionEvent.createdAt, 'YYYY-MM-DD HH:mm:ss')}
                    style={{ display: 'block' }}
                  >
                    <Flex direction="horizontal" alignChildrenHorizontal="between" alignChildrenVertical="end" wrap>
                      <Base>
                        <Base>
                          {dayInWords(appVersionEvent.createdAt)} at {formatDate(appVersionEvent.createdAt, 'HH:mm:ss')}
                        </Base>
                        <Base>{textWithIcon(appVersionEvent.status, appVersionEvent.text)}</Base>
                      </Base>
                      {appVersionEvent.status === 'failed' && appVersionEvent.isLogAvailable ? (
                        <a href={appVersionEvent.logDownloadUrl}>
                          <Button level="secondary" size="small">
                            <Icon name="Download" color="grape-4" />
                            Download Build Log
                          </Button>
                        </a>
                      ) : (
                        <Button level="secondary" size="small" disabled>
                          <Icon name="Download" color="grape-4" />
                          Download Build Log
                        </Button>
                      )}
                    </Flex>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </Base>
  );
};

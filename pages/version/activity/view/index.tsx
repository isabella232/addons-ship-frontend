import formatDate from 'date-fns/format';

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
  TableHeaderCell
} from '@bitrise/bitkit';
import { TypeIconName } from '@bitrise/bitkit/lib/esm/Icon/tsx';
import { AppVersionEvent } from '@/models';

type Props = {
  appVersionEvents: AppVersionEvent[];
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

export default ({ appVersionEvents }: Props) => (
  <Base paddingVertical="x8">
    <Table type="flat">
      <TableBody>
        <TableHeaderRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell colSpan="2">Activity</TableHeaderCell>
        </TableHeaderRow>
        {appVersionEvents.map((appVersionEvent: AppVersionEvent, index: number) => (
          <TableRow key={index}>
            <TableCell width="200px">{formatDate(appVersionEvent.createdAt, 'YYYY MM DD HH:mm:ss')}</TableCell>
            <TableCell>{textWithIcon(appVersionEvent.status, appVersionEvent.text)}</TableCell>
            <TableCell width="200px">
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
  </Base>
);

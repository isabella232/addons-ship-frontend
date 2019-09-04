import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Base,
  Notification
} from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

import css from './style.scss';

type Props = {
  devices: TestDevice[];
};

export default ({ devices }: Props) => (
  <Base paddingVertical="x6">
    <Base className={css.expandedTableWrapper}>
      <Notification type="inform" icon="Lightbulb">
        You can register your devices on your Account Settings page on Bitrise.
      </Notification>
      <Base paddingVertical="x6">
        <Table type="flat">
          <TableHeader>
            <TableHeaderRow>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Device</TableHeaderCell>
              <TableHeaderCell>UDID</TableHeaderCell>
            </TableHeaderRow>
          </TableHeader>

          <TableBody>
            {devices.map(({ deviceId, deviceType, owner }) => (
              <TableRow key={deviceId}>
                <TableCell>{owner}</TableCell>
                <TableCell>{deviceType}</TableCell>
                <TableCell>{deviceId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Base>
    </Base>
  </Base>
);

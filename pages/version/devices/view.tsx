import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Notification,
  Base
} from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

type Props = {
  projectType: string;
  devices: TestDevice[];
};

export default ({ projectType, devices }: Props) => (
  <Base paddingVertical="x6">
    <Notification type="inform" icon="Lightbulb">
      You can register your devices on your Account Settings page on Bitrise.
    </Notification>
    <Table type="flat" paddingVertical="x6">
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>User</TableHeaderCell>
          <TableHeaderCell>Device</TableHeaderCell>
          {projectType === 'ios' && <TableHeaderCell>UDID</TableHeaderCell>}
          {projectType === 'android' && <TableHeaderCell>UUID</TableHeaderCell>}
          {projectType !== 'ios' && projectType !== 'android' && <TableHeaderCell>Device ID</TableHeaderCell>}
        </TableHeaderRow>
      </TableHeader>

      <TableBody>
        {devices.map(({ deviceId, deviceType, owner }) => (
          <TableRow key={deviceId}>
            <TableCell>{owner}</TableCell>
            <TableCell>{deviceType}</TableCell>
            <TableCell shrink>{deviceId}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Base>
);

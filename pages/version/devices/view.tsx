import { Table, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, TableCell } from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

type Props = {
  devices: TestDevice[];
};

export default ({ devices }: Props) => (
  <Table type="card">
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
);

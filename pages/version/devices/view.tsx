import { Table, TableHeader, TableHeaderRow, TableHeaderCell, TableBody, TableRow, TableCell } from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

type Props = {
  projectType: string;
  devices: TestDevice[];
};

export default ({ projectType, devices }: Props) => (
  <Table type="card">
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
          <TableCell>{deviceId}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

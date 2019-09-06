import {
  Table,
  TableHeader,
  TableHeaderRow,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Base,
  Notification,
  Skeleton,
  SkeletonBox,
  Divider
} from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

import css from './style.scss';
import { Fragment } from 'react';

type Props = {
  projectType: string;
  devices: TestDevice[];
  isLoading: boolean;
};

export default ({ projectType, devices, isLoading }: Props) => (
  <Base paddingVertical="x6">
    <Base className={css.expandedTableWrapper}>
      <Notification type="inform" icon="Lightbulb">
        You can register your devices on your Account Settings page on Bitrise.
      </Notification>
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
              <TableRow key={`${owner}-${deviceId}`}>
                <TableCell>{owner}</TableCell>
                <TableCell>{deviceType}</TableCell>
                <TableCell>{deviceId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Base>
  </Base>
);

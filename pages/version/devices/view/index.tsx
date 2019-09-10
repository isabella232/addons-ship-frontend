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
  Divider,
  Link,
  Text
} from '@bitrise/bitkit';

import { TestDevice } from '@/models/test-device';

import { Fragment } from 'react';
import { mediaQuery } from '@/utils/media';

type Props = {
  projectType: string;
  devices: TestDevice[];
  isLoading: boolean;
};

export default ({ projectType, devices, isLoading }: Props) => {
  const [isTablet] = mediaQuery('30rem');

  const listItem = (label: string, value: string, isLast = false) => {
    return isTablet ? (
      <TableCell>{value}</TableCell>
    ) : (
      <TableCell style={{ display: 'block', borderBottom: isLast ? undefined : 'none', paddingTop: '0.25rem', paddingBottom: '0.25rem' }}>
        <Text weight="bold" color="grape-5" inline>
          {label}:
        </Text>{' '}
        <Text breakOn="all" inline>{value}</Text>
      </TableCell>
    );
  };

  const userLabel = 'User';
  const deviceLabel = 'Device';
  let deviceIDLabel = 'Device ID';
  switch (projectType) {
    case 'ios':
      deviceIDLabel = 'UDID';
      break;
    case 'android':
      deviceIDLabel = 'UUID';
      break;
  }

  return (
    <Base paddingVertical="x6">
      <Notification type="inform" icon="Lightbulb">
        You can register your devices on your{' '}
        <Link href="https://app.bitrise.io/me/profile#/test_devices" target="_blank" underline>
          Account Settings
        </Link>{' '}
        page on Bitrise.
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
          {isTablet && (
            <TableHeader>
              <TableHeaderRow>
                <TableHeaderCell>{userLabel}</TableHeaderCell>
                <TableHeaderCell>{deviceLabel}</TableHeaderCell>
                <TableHeaderCell>{deviceIDLabel}</TableHeaderCell>
              </TableHeaderRow>
            </TableHeader>
          )}

          <TableBody>
            {devices.map(({ deviceId, deviceType, owner }) => (
              <TableRow key={`${owner}-${deviceId}`}>
                {listItem(userLabel, owner)}
                {listItem(deviceLabel, deviceType)}
                {listItem(deviceIDLabel, deviceId, true)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Base>
  );
};

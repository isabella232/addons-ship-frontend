import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableHeaderRow,
  TableBody,
  TableCell,
  TableRow,
  Toggle,
  Base,
  Icon,
  Text,
  Flex
} from '@bitrise/bitkit';

import css from './style.scss';
import { AppContact } from '@/models/settings';
import { mediaQuery } from '@/utils/media';
import { Fragment } from 'react';

export type Props = {
  appContacts: AppContact[];
  onNotificationPreferenceChanged: (email: string, key: string, value: boolean) => void;
  onDeleteContact: (email: string) => void;
};

export default ({ appContacts, onNotificationPreferenceChanged, onDeleteContact }: Props) => {
  const [isDesktop] = mediaQuery('60rem');

  const toggle = (email: string, preferenceID: string, preferenceValue: boolean) => (
    <Toggle
      checked={preferenceValue}
      onChange={() => onNotificationPreferenceChanged(email, preferenceID, !preferenceValue)}
      alignChildren="middle"
    />
  );

  return (
    <Table type="flat">
      {isDesktop && (
        <TableHeader>
          <TableHeaderRow>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell />
            <TableHeaderCell align="middle">
              New
              <br />
              Version
            </TableHeaderCell>
            <TableHeaderCell align="middle">
              Successful
              <br />
              Publish
            </TableHeaderCell>
            <TableHeaderCell align="middle">
              Failed
              <br />
              Publish
            </TableHeaderCell>
            <TableHeaderCell />
          </TableHeaderRow>
        </TableHeader>
      )}
      <TableBody>
        {appContacts.map(
          ({
            email,
            isConfirmed,
            isMarkedForDelete,
            notificationPreferences: { newVersion, successfulPublish, failedPublish }
          }) =>
            !isMarkedForDelete && (
              <TableRow key={email}>
                {isDesktop ? (
                  <Fragment>
                    <TableCell shrink>{email}</TableCell>
                    <TableCell align="middle">{isConfirmed ? 'Confirmed' : 'Pending'}</TableCell>
                    <TableCell shrink>{toggle(email, 'newVersion', newVersion)}</TableCell>
                    <TableCell shrink>{toggle(email, 'successfulPublish', successfulPublish)}</TableCell>
                    <TableCell shrink>{toggle(email, 'failedPublish', failedPublish)}</TableCell>
                    <TableCell shrink>
                      <Base
                        padding="x1"
                        className={css.delete}
                        borderRadius="x1"
                        onClick={() => onDeleteContact(email)}
                      >
                        <Icon name="Trash" size="1.5rem" color="red-3" />
                      </Base>
                    </TableCell>
                  </Fragment>
                ) : (
                  <TableCell>
                    <Base paddingVertical="x1">
                      <Text weight="bold" color="grape-5" inline>
                        Email:
                      </Text>{' '}
                      {email}
                    </Base>
                    <Base paddingVertical="x1">
                      <Text weight="bold" color="grape-5" inline>
                        Status:
                      </Text>{' '}
                      {isConfirmed ? 'Confirmed' : 'Pending'}
                    </Base>
                    <Flex direction="horizontal" gap="x2" paddingVertical="x1" alignChildrenHorizontal="between">
                      <Text weight="bold" color="grape-5" width="9rem">
                        New Version:
                      </Text>{' '}
                      {toggle(email, 'newVersion', newVersion)}
                    </Flex>
                    <Flex direction="horizontal" gap="x2" paddingVertical="x1" alignChildrenHorizontal="between">
                      <Text weight="bold" color="grape-5" width="9rem">
                        Successful Publish:
                      </Text>{' '}
                      {toggle(email, 'successfulPublish', successfulPublish)}
                    </Flex>
                    <Flex direction="horizontal" gap="x2" paddingVertical="x1" alignChildrenHorizontal="between">
                      <Text weight="bold" color="grape-5" width="9rem">
                        Failed Publish:
                      </Text>{' '}
                      {toggle(email, 'failedPublish', failedPublish)}
                    </Flex>
                  </TableCell>
                )}
              </TableRow>
            )
        )}
      </TableBody>
    </Table>
  );
};

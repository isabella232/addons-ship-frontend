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
  Icon
} from '@bitrise/bitkit';

import css from './style.scss';
import { AppContact } from '@/models/settings';

export type Props = {
  appContacts: AppContact[];
  onNotificationPreferenceChanged: (email: string, key: string, value: boolean) => void;
};

export default ({ appContacts, onNotificationPreferenceChanged }: Props) => (
  <Table type="flat">
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
    <TableBody>
      {appContacts.map(
        ({ email, isConfirmed, notificationPreferences: { newVersion, successfulPublish, failedPublish } }) => (
          <TableRow key={email} className="roww">
            <TableCell shrink>{email}</TableCell>
            <TableCell align="middle">{isConfirmed ? 'Confirmed' : 'Pending'}</TableCell>
            <TableCell shrink>
              <Toggle
                checked={newVersion}
                onChange={() => onNotificationPreferenceChanged(email, 'newVersion', !newVersion)}
                alignChildren="middle"
              />
            </TableCell>
            <TableCell shrink>
              <Toggle
                checked={successfulPublish}
                onChange={() => onNotificationPreferenceChanged(email, 'successfulPublish', !successfulPublish)}
                alignChildren="middle"
              />
            </TableCell>
            <TableCell shrink>
              <Toggle
                checked={failedPublish}
                onChange={() => onNotificationPreferenceChanged(email, 'failedPublish', !failedPublish)}
                alignChildren="middle"
              />
            </TableCell>
            <TableCell shrink>
              <Base padding="x1" className={css.delete} borderRadius="x1">
                <Icon name="Trash" size="1.5rem" color="red-3" />
              </Base>
            </TableCell>
          </TableRow>
        )
      )}
    </TableBody>
  </Table>
);

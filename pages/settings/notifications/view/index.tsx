import { Fragment } from 'react';
import {
  Base,
  Text,
  Divider,
  Button,
  Flex,
  Notification,
  SkeletonBox,
  Skeleton,
  ProgressSpinner
} from '@bitrise/bitkit';

import AddNew, { Props as AddNewProps } from './add-new';
import List, { Props as ListProps } from './contact-list';

export interface Props extends AddNewProps, ListProps {
  onSave?: () => void;
  onCancel?: () => void;
  error?: string;
  hasLoaded: boolean;
  isSaving: boolean;
}

export default ({
  hasLoaded,
  isSaving,
  email,
  onEmailChange,
  onAddEmail,
  isAddingEmail,
  appContacts,
  onNotificationPreferenceChanged,
  onDeleteContact,
  onSave,
  onCancel,
  error
}: Props) => (
  <Base paddingVertical="x8">
    <Text size="x5" weight="bold">
      Email Notifications
    </Text>
    <Divider color="gray-2" margin="x4" />
    {error && (
      <Notification margin="x4" type="alert">
        {error}
      </Notification>
    )}
    <Base margin="x6">
      <AddNew email={email} onEmailChange={onEmailChange} onAddEmail={onAddEmail} isAddingEmail={isAddingEmail} />
    </Base>

    {hasLoaded ? (
      <Fragment>
        <Base margin="x4">
          <List
            appContacts={appContacts}
            onNotificationPreferenceChanged={onNotificationPreferenceChanged}
            onDeleteContact={onDeleteContact}
          />
        </Base>
        <Flex margin="x12" direction="horizontal" alignChildrenHorizontal="end" gap="x4">
          <Button disabled={!onCancel || isSaving} level="secondary" width="8rem" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={!onSave || isSaving} level="primary" width="8rem" onClick={onSave}>
            {isSaving ? (
              <Fragment>
                <ProgressSpinner /> &nbsp; Saving...
              </Fragment>
            ) : (
              'Save'
            )}
          </Button>
        </Flex>
      </Fragment>
    ) : (
      <Base margin="x16">
        <Skeleton active maxWidth="60rem">
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
    )}
  </Base>
);

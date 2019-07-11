import { Base, Text, Divider } from '@bitrise/bitkit';

import AddNew, { Props as AddNewProps } from './add-new';

export type Props = AddNewProps;

export default ({ onAddEmail }: Props) => (
  <Base paddingVertical="x8">
    <Text size="x5" weight="bold" paddingVertical="x3">
      Email Notifications
    </Text>
    <Divider color="gray-2" />
    <Base paddingVertical="x6">
      <AddNew onAddEmail={onAddEmail} />
    </Base>
  </Base>
);

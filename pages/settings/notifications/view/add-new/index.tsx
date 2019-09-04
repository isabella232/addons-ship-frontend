import { Fragment } from 'react';
import { InputLabel, InputContainer, InputContent, Input, Button, ProgressSpinner } from '@bitrise/bitkit';

import css from './style.scss';

export type Props = {
  email: string;
  onEmailChange: (email: string) => void;
  onAddEmail: (email: string) => void;
  isAddingEmail: boolean;
};

export default ({ email, onEmailChange, onAddEmail, isAddingEmail }: Props) => {
  return (
    <form
      className={css.container}
      onSubmit={evt => {
        evt.preventDefault();
        onAddEmail(email);
      }}
    >
      <InputLabel>Add New</InputLabel>
      <InputContainer>
        <InputContent>
          <Input
            placeholder="Email address"
            value={email}
            onChange={(event: any) => onEmailChange(event.target.value)}
            type="email"
            disabled={isAddingEmail}
          />
        </InputContent>
        <Button level="secondary" disabled={!email || isAddingEmail}>
          {isAddingEmail ? (
            <Fragment>
              <ProgressSpinner /> &nbsp; Adding...
            </Fragment>
          ) : (
            'Add'
          )}
        </Button>
      </InputContainer>
    </form>
  );
};

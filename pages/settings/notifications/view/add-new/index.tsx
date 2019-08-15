import { useState, ChangeEvent } from 'react';
import { InputLabel, InputContainer, InputContent, Input, Button } from '@bitrise/bitkit';

import css from './style.scss';

export type Props = {
  onAddEmail: (email: string) => void;
};

export default ({ onAddEmail }: Props) => {
  const [email, setEmail] = useState('');

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
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setEmail(value)}
            type="email"
          />
        </InputContent>
        <InputContent outside>
          <Button level="secondary" disabled={!email}>
            Add
          </Button>
        </InputContent>
      </InputContainer>
    </form>
  );
};

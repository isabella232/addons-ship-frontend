import { useState, ChangeEvent } from 'react';
import { InputLabel, InputContainer, InputContent, Input, Button } from '@bitrise/bitkit';

import css from './style.scss';

export type Props = {
  onAddEmail: (email: string) => void;
};

export default ({ onAddEmail }: Props) => {
  const [email, setEmail] = useState('');
  return (
    <div className={css.container}>
      <InputLabel>Add New</InputLabel>
      <InputContainer>
        <InputContent>
          <Input
            placeholder="Email address"
            value={email}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => setEmail(value)}
          />
        </InputContent>
        <InputContent outside>
          <Button level="secondary" onClick={() => onAddEmail(email)}>
            Add
          </Button>
        </InputContent>
      </InputContainer>
    </div>
  );
};

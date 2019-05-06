import { ReactNode } from 'react';

import css from './style.scss';

interface TitleProps {
  children: ReactNode;
}

export default ({ children }: TitleProps) => {
  return <h1 className={css.title}>{children}</h1>;
};

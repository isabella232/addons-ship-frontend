import { ReactNode } from 'react';

import css from './style.scss';

interface TitleProps {
  iconUrl: string;
  children: ReactNode;
}

export default ({ iconUrl, children }: TitleProps) => {
  return (
    <div className={css.titleWrapper}>
      <h1 className={css.title}>{children}</h1>
    </div>
  );
};

import { ReactNode } from 'react';
import css from './style.scss';

interface HeaderProps {
  children: ReactNode;
}

export default ({ children }: HeaderProps) => <div className={css.header}>{children}</div>;

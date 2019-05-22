import { ReactNode } from 'react';
import css from './style.scss';

interface SectionHeadingProps {
  children: ReactNode;
}

export default ({ children }: SectionHeadingProps) => <div className={css.sectionHeading}>{children}</div>;

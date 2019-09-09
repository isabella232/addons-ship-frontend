import { TypeColors } from '@bitrise/bitkit';

import Tag from '.';

const colors: TypeColors[] = ['orange-3', 'yellow-4', 'green-3', 'blue-3', 'darkblue-3', 'violet-3'];

export type Props = {
  children: string;
  selected?: boolean;
  large?: boolean;
  onClick?: Function;
};

export const getStringSum = (s: string) => [...s.toLowerCase()].reduce((sum, char) => sum + char.charCodeAt(0), 0);

export default ({ children, ...props }: Props) => {
  const sum = getStringSum(children);
  const color = colors[sum % colors.length];

  return (
    <Tag color={color} textColor="white" {...props}>
      {children}
    </Tag>
  );
};

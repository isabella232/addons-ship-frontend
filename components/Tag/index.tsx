import { TypeColors, Base, Text, variables } from '@bitrise/bitkit';

import css from './style.scss';

export type Props = {
  color: TypeColors;
  textColor: TypeColors;
  children: string;
  selected?: boolean;
  large?: boolean;
};

export default ({ color, textColor, children, selected, large }: Props) => (
  <Base
    backgroundColor={selected ? color : undefined}
    className={css.Tag}
    paddingHorizontal={large ? 'x3' : 'x2'}
    paddingVertical={large ? 'x2' : 'x1'}
    borderRadius="x1"
    borderWidth={selected ? undefined : 'x1'}
    style={selected ? undefined : { borderColor: variables.colorMap[color] }}
  >
    <Text color={selected ? textColor : color} config={large ? '8' : '9'} uppercase>
      {children}
    </Text>
  </Base>
);

import cx from 'classnames';
import { TypeColors, Base, Text, variables } from '@bitrise/bitkit';

import css from './style.scss';

export type Props = {
  color: TypeColors;
  textColor: TypeColors;
  children: string;
  onClick?: Function;
  selected?: boolean;
  large?: boolean;
};

export default ({ color, textColor, children, selected, large, onClick }: Props) => (
  <Base
    backgroundColor={selected ? color : undefined}
    className={cx(css.Tag, { [css.clickable]: onClick })}
    paddingHorizontal={large ? 'x3' : 'x2'}
    paddingVertical={large ? 'x2' : 'x1'}
    borderRadius="x1"
    borderWidth={selected ? undefined : 'x1'}
    style={selected ? undefined : { borderColor: variables.colorMap[color] }}
    onClick={onClick}
  >
    <Text color={selected ? textColor : color} config={large ? '8' : '9'} uppercase>
      {children}
    </Text>
  </Base>
);

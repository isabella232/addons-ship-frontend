import { Text, Badge, TextProps } from '@bitrise/bitkit';

export default ({ ...props }: TextProps) => (
  <Badge backgroundColor="yellow-3" {...props}>
    <Text config="9" color="grape-4">
      beta
    </Text>
  </Badge>
);

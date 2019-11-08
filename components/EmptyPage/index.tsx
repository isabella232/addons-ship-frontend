import { Base, Flex, Text, Link, Icon, Divider, List, ListItem } from '@bitrise/bitkit';

import css from './style.scss';
import { mediaQuery } from '@/utils/media';

export default () => {
  const [isTablet] = mediaQuery('50rem');

  return (
    <Flex className={css.emptyPage} grow>
      <Flex className={css.textContainer} direction="vertical" alignChildrenVertical="middle">
        <Text align="middle" weight="bold" size={isTablet ? 'x4' : 'x3'}>
          First, you need to build an IPA/APK
        </Text>
        <Base container>
          <Flex direction="vertical" maxWidth="700px" paddingVertical="x16" paddingHorizontal={isTablet ? 'x0' : 'x4'}>
            <Text config="7" weight="bold" color="grape-5">
              Setup Instructions
            </Text>
            <Divider color="gray-2" margin="x3" />
            <List margin="x2">
              <ListItem margin="x1">
                In order to use Ship, you need to place a{' '}
                <Text inline weight="bold">
                  build artifact generator step
                </Text>{' '}
                (like Xcode Archive, Android Build) into your workflow to have an IPA/APK.
              </ListItem>
              <ListItem margin="x1">
                The{' '}
                <Text inline weight="bold">
                  latest version of Deploy to Bitrise.io step
                </Text>{' '}
                required after the build artifact generator steps.
              </ListItem>
              <ListItem margin="x1">
                Ship works only with the{' '}
                <Text inline weight="bold">
                  latest Xcode Archive step
                </Text>
                .
              </ListItem>
            </List>

            <Flex alignChildrenHorizontal="middle" direction="horizontal" margin="x16">
              <Link
                href="https://mpxzvqn7ysfysw.preview.forestry.io/reviews/ship-add-on-beta-version/"
                target="blank"
                color="grape-3"
              >
                Read the documentation <Icon size="1.5rem" name="OpenInBrowser" />
              </Link>
            </Flex>
          </Flex>
        </Base>
      </Flex>
    </Flex>
  );
};

import NextLink from 'next/link';
import { Base, Text, TypeIconName, Icon, Flex, Link } from '@bitrise/bitkit';

import Squircle from '@/components/Squircle';
import { mediaQuery } from '@/utils/media';

import Banner from './Banner';
import css from './style.scss';

interface AppSummaryProps {
  platform: string;
  detailsPagePath: string;
  detailsPagePathHref: string;
  title: string;
  description: string;
  note: string;
  iconUrl: string;
  startColor?: string;
  endColor?: string;
}

export default ({
  platform,
  detailsPagePath,
  detailsPagePathHref,
  title,
  description,
  note,
  iconUrl,
  startColor,
  endColor
}: AppSummaryProps) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');

  const iconName: TypeIconName = platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

  if (!startColor || !endColor) {
    startColor = '#0d83cd';
    endColor = '#0dd3c5';
  }

  return (
    <NextLink href={detailsPagePathHref} as={detailsPagePath}>
      <Link
        borderColor="gray-2"
        borderWidth="x1"
        overflow="hidden"
        backgroundColor="white"
        className={css.appSummary}
        elevation="x2"
      >
        <Base height="5rem">
          <Banner startColor={startColor} endColor={endColor} />
        </Base>
        <Flex direction="vertical" padding="x8" gap={isTablet ? 'x4' : 'x0'}>
          <Flex
            direction={isTablet ? 'horizontal' : 'vertical'}
            alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
            alignChildrenVertical={isTablet ? 'end' : 'middle'}
            gap="x4"
            style={{ marginTop: '-5rem' }}
          >
            <Squircle src={iconUrl} borderRadius="x2" width="96px" margin="x0" />
            <Base paddingVertical="x2">
              <Text size="x3" color="gray-6" letterSpacing="x1" weight="medium">
                {note}
              </Text>
            </Base>
          </Flex>
          <Flex direction="vertical" gap="x2">
            <Flex
              direction={isTablet ? 'horizontal' : 'vertical'}
              alignChildrenVertical="middle"
              alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
              gap="x1"
            >
              <Icon color="grape-4" name={iconName} size="1.5rem" />
              <Text
                size="x5"
                color="grape-4"
                weight="bold"
                letterSpacing="x1"
                breakOn={isDesktop ? 'word' : 'all'}
                align={isTablet ? 'start' : 'middle'}
              >
                {title}
              </Text>
            </Flex>
            {description && (
              <Text color="grape-5" breakOn={isDesktop ? 'word' : 'all'}>
                {description}
              </Text>
            )}
          </Flex>
        </Flex>
      </Link>
    </NextLink>
  );
};

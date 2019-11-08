import NextLink from 'next/link';
import { Base, Text, TypeIconName, Icon, Flex, Link } from '@bitrise/bitkit';

import Squircle from '@/components/Squircle';
import MagicTag from '@/components/Tag/MagicTag';
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
  productFlavor?: string;
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
  endColor,
  productFlavor
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
        <Flex direction="vertical" padding={isTablet ? 'x8' : 'x4'} gap={isTablet ? 'x4' : 'x0'}>
          <Flex
            direction="horizontal"
            alignChildrenHorizontal="start"
            alignChildrenVertical={isTablet ? 'end' : 'middle'}
            gap="x4"
            style={{ marginTop: '-5rem', alignItems: isTablet ? 'flex-end' : 'stretch' }}
          >
            <Squircle src={iconUrl} borderRadius="x2" width="96px" margin="x0" />
            <Flex
              grow
              paddingVertical={isTablet ? 'x2' : 'x0'}
              direction="vertical"
              alignChildrenVertical={isTablet ? 'middle' : 'end'}
            >
              <Text size="x3" color="gray-6" letterSpacing="x1" weight="medium" align="end">
                {note}
              </Text>
            </Flex>
          </Flex>
          <Flex direction="vertical" gap="x2">
            <Flex
              direction="horizontal"
              alignChildrenVertical="middle"
              alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
              gap="x1"
              wrap
            >
              <Flex
                direction="horizontal"
                alignChildren="middle"
                alignChildrenHorizontal={isTablet ? 'start' : 'middle'}
                gap={isTablet ? 'x2' : 'x0'}
                maxWidth="100%"
                paddingVertical={isTablet ? 'x0' : 'x4'}
              >
                <Icon
                  color="grape-4"
                  name={iconName}
                  size={isTablet ? '2rem' : '1.5rem'}
                  style={{ display: 'inline-block', _marginBottom: '-4px' }}
                />
                <Text config="4" color="grape-4" ellipsis align={isTablet ? 'start' : 'middle'}>
                  {title}
                </Text>
                {productFlavor && isDesktop && <MagicTag selected>{productFlavor}</MagicTag>}
              </Flex>
            </Flex>
            {productFlavor && !isDesktop && (
              <Flex>
                <MagicTag selected>{productFlavor}</MagicTag>
              </Flex>
            )}
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

import { useState } from 'react';
import NextLink from 'next/link';
import SVG from 'react-svg';
import { Icon, TypeIconName, Base, Flex, Text, Link } from '@bitrise/bitkit';

import { mediaQuery } from '@/utils/media';
import MagicTag from '@/components/Tag/MagicTag';

import css from './style.scss';

interface Props {
  platform: string;
  detailsPagePath: string;
  detailsPagePathHref: string;
  title: string;
  description: string;
  descriptionPlaceholder?: string;
  note: string;
  productFlavour?: string;
}

export default ({
  platform,
  detailsPagePath,
  detailsPagePathHref,
  title,
  description,
  descriptionPlaceholder,
  note,
  productFlavour
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconName: TypeIconName = platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';
  const [isDesktop] = mediaQuery('30rem');

  const descriptionWrapperClasses = [css.descriptionWrapper];
  if (isOpen) {
    descriptionWrapperClasses.push(css.isOpen);
  }

  return (
    <Base className={css.versionListPageItem}>
      <Base backgroundColor="white" className={css.versionListPageItemInner}>
        <NextLink href={detailsPagePathHref} as={detailsPagePath}>
          <Link>
            <Flex
              direction="horizontal"
              className={css.topWrapper}
              paddingVertical="x4"
              padding={isDesktop ? 'x4' : 'x0'}
            >
              <Flex direction="horizontal" alignChildrenVertical="middle" grow>
                <Base className={css.platformIconWrapper}>
                  <Icon color="grape-4" name={iconName} size="1.5rem" />
                </Base>
                <Flex direction="horizontal" grow alignChildrenVertical="middle" gap="x3">
                  <Text config="5" color="grape-4" className={css.title}>
                    {title}
                  </Text>
                  {productFlavour && isDesktop && <MagicTag selected>{productFlavour}</MagicTag>}
                </Flex>
              </Flex>
              <Text color="gray-6" className={css.note}>
                {note}
              </Text>
              {productFlavour && !isDesktop && (
                <Base margin="x2">
                  <MagicTag selected>{productFlavour}</MagicTag>
                </Base>
              )}
            </Flex>
          </Link>
        </NextLink>
        <Base
          Component="button"
          className={descriptionWrapperClasses.join(' ')}
          onClick={() => setIsOpen(!isOpen)}
          paddingHorizontal={isDesktop ? 'x4' : 'x0'}
        >
          {(description || descriptionPlaceholder) && (
            <Text config="7" color="black" className={css.description}>
              {description ? (
                <Base color="black">{description}</Base>
              ) : (
                <Base color="gray-5">{descriptionPlaceholder}</Base>
              )}
            </Text>
          )}

          {description &&
            (isOpen ? (
              <Base className={css.showLess}>
                <Text config="8">Show less</Text>
                <SVG src="/static/arrow-down.svg" className={css.arrow} />
              </Base>
            ) : (
              <Base className={css.showMore}>
                <Text config="8">Show more</Text>
                <SVG src="/static/arrow-down.svg" className={css.arrow} />
              </Base>
            ))}
        </Base>
      </Base>
    </Base>
  );
};

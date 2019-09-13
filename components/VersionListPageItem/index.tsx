import { Component } from 'react';
import css from './style.scss';
import SVG from 'react-svg';
import NextLink from 'next/link';
import { Icon, TypeIconName, Base, Flex, Text, Link } from '@bitrise/bitkit';

import MagicTag from '@/components/Tag/MagicTag';

interface VersionListPageItemProps {
  platform: string;
  detailsPagePath: string;
  detailsPagePathHref: string;
  title: string;
  description: string;
  descriptionPlaceholder?: string;
  note: string;
  productFlavour?: string;
}

type VersionListPageItemState = {
  isOpen: boolean;
};

export default class VersionListPageItem extends Component<VersionListPageItemProps, VersionListPageItemState> {
  state: VersionListPageItemState = {
    isOpen: false
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const {
      platform,
      detailsPagePath,
      detailsPagePathHref,
      title,
      description,
      descriptionPlaceholder,
      note,
      productFlavour
    } = this.props;
    const { isOpen } = this.state;
    const iconName: TypeIconName = platform === 'ios' ? 'PlatformsApple' : 'PlatformsAndroid';

    const descriptionWrapperClasses = [css.descriptionWrapper];
    if (isOpen) {
      descriptionWrapperClasses.push(css.isOpen);
    }

    return (
      <Base className={css.versionListPageItem}>
        <Base backgroundColor="white" className={css.versionListPageItemInner}>
          <NextLink href={detailsPagePathHref} as={detailsPagePath}>
            <Link>
              <Flex className={css.topWrapper} padding="x4">
                <Base className={css.platformIconWrapper}>
                  <Icon color="grape-4" name={iconName} size="1.5rem" />
                </Base>
                <Flex direction="horizontal" grow alignChildrenVertical="middle" gap="x3">
                  <Text config="5" color="grape-4" className={css.title}>
                    {title}
                  </Text>
                  {productFlavour && <MagicTag selected>{productFlavour}</MagicTag>}
                </Flex>
                <Text color="gray-6" className={css.note}>
                  {note}
                </Text>
              </Flex>
            </Link>
          </NextLink>
          <button className={descriptionWrapperClasses.join(' ')} onClick={this.toggle}>
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
                  <Base className={css.text}>Show less</Base>
                  <SVG src="/static/arrow-down.svg" className={css.arrow} />
                </Base>
              ) : (
                <Base className={css.showMore}>
                  <Base className={css.text}>Show more</Base>
                  <SVG src="/static/arrow-down.svg" className={css.arrow} />
                </Base>
              ))}
          </button>
        </Base>
      </Base>
    );
  }
}

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Base, AddonBeam, AddonBeamLink, Flex, Icon, Image, Text, Divider } from '@bitrise/bitkit';
import cx from 'classnames';

import { RootState } from '@/store';
import { App } from '@/models/app';

import css from './style.scss';
import { mediaQuery } from '@/utils/media';

export type Props = {
  children?: ReactNode;
  app: App;
};

export const Header = ({ children, app: { appSlug, title, avatarUrl } }: Props) => {
  const [isDesktop] = mediaQuery('60rem');
  const [isHamburgerIconActive, setHamburgerIconActive] = useState(false);

  const appLink = `https://app.bitrise.io/app/${appSlug}`;

  return (
    <Base>
      <AddonBeam
        addonIcon="SecurityShield"
        addonName="Ship"
        appLink={appLink}
        appName={title}
        appImage={avatarUrl}
        backgroundColor="grape-4"
        color="white"
        isInResponsiveView={!isDesktop}
        onHamburgerIconClick={() => setHamburgerIconActive(!isHamburgerIconActive)}
        isHamburgerIconActive={isHamburgerIconActive}
      >
        <Link href={`/settings?appSlug=${appSlug}`} as={`/apps/${appSlug}/settings`}>
          <AddonBeamLink Component="a" icon="Settings">
            Settings
          </AddonBeamLink>
        </Link>
      </AddonBeam>
      <div className={css.header}>{children}</div>
      <Flex
        direction="vertical"
        alignChildrenVertical="end"
        className={cx(css.mobileMenu, { [css.mobileMenuVisible]: isHamburgerIconActive })}
        backgroundColor="grape-5"
        color="white"
      >
        <Flex padding="x4">
          <a href={appLink} target="_blank">
            <Flex alignChildrenVertical="middle" direction="horizontal" gap="x2">
              <Image borderRadius="x1" height="1.5rem" src={avatarUrl} width="1.5rem" />

              <Flex alignChildrenVertical="middle" direction="horizontal" gap="x1">
                <Text size="x3">{title}</Text>
                <Icon name="OpenInBrowser" />
              </Flex>
            </Flex>
          </a>
        </Flex>
        <Divider color="grape-4" />
        <Flex padding="x4">
          <Link href={`/settings?appSlug=${appSlug}`} as={`/apps/${appSlug}/settings`}>
            <Text Component="a" size="x3" color="gray-1">
              Settings
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Base>
  );
};

const mapStateToProps = ({ app }: RootState) => ({ app });

export default connect(mapStateToProps)(Header as any);

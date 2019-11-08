import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  Base,
  Button,
  AddonBeam,
  AddonBeamLink,
  Flex,
  Icon,
  Image,
  Text,
  Divider,
  PlacementManager,
  PlacementReference,
  Placement,
  PlacementArea,
  Link as BitkitLink,
  PlacementArrow
} from '@bitrise/bitkit';
import cx from 'classnames';

import { RootState } from '@/store';
import { App } from '@/models/app';
import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

import css from './style.scss';
import PageTitle from './PageTitle';
import BetaBadge from './BetaBadge';

export type Props = {
  app?: App;
  appVersion: AppVersion | null;
  shouldShowSettingsOnboarding: boolean;
  hideBreadcrumbs?: boolean;
};

export const Header = ({ app, appVersion, shouldShowSettingsOnboarding, hideBreadcrumbs = false }: Props) => {
  const [isTablet, isDesktop] = mediaQuery('30rem', '60rem');
  const [isHamburgerIconActive, setHamburgerIconActive] = useState(false);
  const [isSettingsOnboardingNotificationVisible, setSettingsOnboardingNotificationVisible] = useState(
    shouldShowSettingsOnboarding
  );
  const { route } = useRouter();
  const primaryColor = '#0D83CD';
  const secondaryColor = '#0DD3C5';

  useEffect(() => {
    const handleRouteChange = () => setHamburgerIconActive(false);

    Router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  if (!app) {
    return (
      <Flex
        direction="horizontal"
        className={css.simpleHeader}
        backgroundColor="grape-4"
        color="white"
        gap="x2"
        alignChildrenVertical="middle"
        alignChildrenHorizontal={isDesktop ? 'start' : 'middle'}
        paddingHorizontal="x5"
        absolute
      >
        <Flex>
          <Icon name="Ship" />
        </Flex>
        <Flex direction="horizontal" alignChildrenVertical="middle" gap="x1">
          <Text size="x3">
            <Text inline weight="bold">
              Ship
            </Text>{' '}
            by Bitrise
          </Text>
          <BetaBadge />
        </Flex>
      </Flex>
    );
  }

  let { appSlug, title, avatarUrl, projectType } = app;

  const appLink = `https://app.bitrise.io/app/${appSlug}`,
    pageType = route.replace(/^\//, '');

  let pageTitle = null;
  let isRootPage = true;
  switch (pageType) {
    case 'settings':
      // @ts-ignore
      projectType = 'settings';
      pageTitle = 'Settings';
      break;
    case 'version':
      if (appVersion) {
        const { version, buildNumber } = appVersion;
        pageTitle = `${title} v${version} (${buildNumber})`;
      }
      break;
    case 'app':
    default:
      pageTitle = title;
  }

  if (['settings', 'version'].includes(pageType)) {
    isRootPage = false;
  }

  return (
    <Base className={css.navbar} container>
      <PlacementManager>
        <AddonBeam
          addonIcon="Ship"
          addonName="Ship"
          appLink={appLink}
          appName={title}
          appImage={avatarUrl}
          backgroundColor="grape-4"
          color="white"
          isInResponsiveView={!isDesktop}
          onHamburgerIconClick={() => setHamburgerIconActive(!isHamburgerIconActive)}
          isHamburgerIconActive={isHamburgerIconActive}
          container
        >
          <PlacementReference>
            {({ ref }) => (
              <Link href={`/settings?appSlug=${appSlug}`} as={`/apps/${appSlug}/settings`}>
                <a ref={ref}>
                  <AddonBeamLink Component="div" icon="Settings">
                    Settings
                  </AddonBeamLink>
                </a>
              </Link>
            )}
          </PlacementReference>
          <Placement visible={isSettingsOnboardingNotificationVisible} backgroundColor="grape-1">
            {() => (
              <PlacementArea withArrow>
                <PlacementArrow />
                <Flex direction="vertical" padding="x6" gap="x3" className={css.settingsOnboardingNotification}>
                  <Flex direction="horizontal">
                    <Flex direction="horizontal" alignChildrenVertical="middle" gap="x2" grow>
                      <Icon name="Lightbulb" color="grape-3" />
                      <Text size="x3" weight="bold" margin="x1" color="grape-3">
                        Setup Publishing
                      </Text>
                    </Flex>
                    <BitkitLink onClick={() => setSettingsOnboardingNotificationVisible(false)}>
                      <Icon name="CloseSmall" color="grape-5" />
                    </BitkitLink>
                  </Flex>

                  <Text size="x3" weight="medium" color="grape-5">
                    We really recommend you to setup publishing as a first step. You only need to do this once per
                    application, then you will be able to publish all versions to App Store Connect or Google Play
                    Console.
                  </Text>
                </Flex>
              </PlacementArea>
            )}
          </Placement>
          <Flex direction="horizontal" className={css.betaBadgeContainer}>
            <BetaBadge />
          </Flex>
        </AddonBeam>
      </PlacementManager>

      {!hideBreadcrumbs && (
        <Flex
          className={css.header}
          height="7rem"
          paddingVertical="x8"
          paddingHorizontal={isTablet ? 'x16' : 'x4'}
          direction="vertical"
          alignChildrenVertical="middle"
          style={{
            backgroundImage: `url('/static/header-bg.svg'), linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          {isRootPage ? (
            <PageTitle type={projectType} title={`${pageTitle}`} />
          ) : (
            <Link href={`/app?appSlug=${appSlug}`} as={`/apps/${appSlug}`}>
              <a>
                <Button level="light">
                  <Icon name="ArrowBack"></Icon>
                  <Text>All versions</Text>
                </Button>
              </a>
            </Link>
          )}
        </Flex>
      )}
      <Flex
        direction="vertical"
        alignChildrenVertical="end"
        className={cx(css.mobileMenu, { [css.mobileMenuVisible]: isHamburgerIconActive })}
        backgroundColor="grape-5"
        color="white"
      >
        <a href={appLink} target="_blank">
          <Flex padding="x4">
            <Flex alignChildren="middle" direction="horizontal" gap="x2">
              <Image borderRadius="x1" height="1.5rem" src={avatarUrl} width="1.5rem" />

              <Flex alignChildren="middle" direction="horizontal" gap="x1">
                <Text size="x3">{title}</Text>
                <Icon name="OpenInBrowser" />
              </Flex>
            </Flex>
          </Flex>
        </a>
        <Divider color="grape-4" />
        <Link href={`/settings?appSlug=${appSlug}`} as={`/apps/${appSlug}/settings`}>
          <a>
            <Flex direction="horizontal" alignChildren="middle" padding="x4">
              <Flex direction="horizontal" alignChildren="middle" gap="x1">
                <Icon name="Settings" />
                <Text size="x3" color="gray-1">
                  Settings
                </Text>
              </Flex>
            </Flex>
          </a>
        </Link>
        <Base paddingVertical="x12" />
      </Flex>
      {!isDesktop && (
        <Flex className={css.mobileBetaBadgeContainer} direction="vertical" alignChildren="middle">
          <BetaBadge style={{ marginRight: -190 }} />
        </Flex>
      )}
    </Base>
  );
};

const mapStateToProps = ({ app: { app }, appVersion: { appVersion } }: RootState) => ({ app, appVersion });

// @ts-ignore
export default connect(mapStateToProps)(Header);

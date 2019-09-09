import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  Base,
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

export type Props = {
  app?: App;
  appVersion: AppVersion | null;
  shouldShowSettingsOnboarding: boolean;
  hideBreadcrumbs?: boolean;
};

export const Header = ({ app, appVersion, shouldShowSettingsOnboarding, hideBreadcrumbs = false }: Props) => {
  const [isDesktop] = mediaQuery('60rem');
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
        <Flex>
          <Text size="x3">
            <Text inline weight="bold">
              Ship
            </Text>{' '}
            by Bitrise
          </Text>
        </Flex>
      </Flex>
    );
  }

  let { appSlug, title, avatarUrl, projectType } = app;

  const appLink = `https://app.bitrise.io/app/${appSlug}`,
    pageType = route.replace(/^\//, '');

  let pageTitle,
    breadcrumbs = null;
  switch (pageType) {
    case 'settings':
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
    breadcrumbs = (
      <Flex direction="horizontal" paddingHorizontal={isDesktop ? 'x0' : 'x4'}>
        <Link href={`/app?appSlug=${appSlug}`} as={`/apps/${appSlug}`}>
          <a>
            <Text size={isDesktop ? 'x4' : 'x3'} className={css.breadcrumbs}>
              « {title}
            </Text>
          </a>
        </Link>
      </Flex>
    );
  }

  return (
    <Base className={css.navbar}>
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
        </AddonBeam>
      </PlacementManager>

      {!hideBreadcrumbs && (
        <Flex
          className={css.header}
          direction="vertical"
          paddingVertical={breadcrumbs ? 'x5' : 'x8'}
          gap="x2"
          style={{
            backgroundImage: `url('/static/header-bg.svg'), linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          {breadcrumbs}
          <PageTitle type={projectType} title={`${pageTitle}`} smaller={!!breadcrumbs} />
        </Flex>
      )}
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
            <a>
              <Text size="x3" color="gray-1">
                Settings
              </Text>
            </a>
          </Link>
        </Flex>
      </Flex>
    </Base>
  );
};

const mapStateToProps = ({ app: { app }, appVersion: { appVersion } }: RootState) => ({ app, appVersion });

// @ts-ignore
export default connect(mapStateToProps)(Header);

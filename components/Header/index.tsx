import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  Notification
} from '@bitrise/bitkit';
import cx from 'classnames';

import { RootState } from '@/store';
import { App } from '@/models/app';
import { AppVersion } from '@/models';
import { mediaQuery } from '@/utils/media';

import css from './style.scss';
import PageTitle from './PageTitle';

export type Props = {
  app: App;
  appVersion: AppVersion;
  shouldShowSettingsOnboarding: boolean;
};

export const Header = ({
  app: { appSlug, title, avatarUrl, projectType },
  appVersion,
  shouldShowSettingsOnboarding
}: Props) => {
  const [isDesktop] = mediaQuery('60rem');
  const [isHamburgerIconActive, setHamburgerIconActive] = useState(false);
  const [isSettingsOnboardingNotificationVisible, setSettingsOnboardingNotificationVisible] = useState(
    shouldShowSettingsOnboarding
  );
  const { route } = useRouter();

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
      const { version, buildNumber } = appVersion;
      pageTitle = `${title} v${version} (${buildNumber})`;
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
    <Base>
      <PlacementManager>
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
          <Placement visible={isSettingsOnboardingNotificationVisible} placement="bottom-end">
            {() => (
              <Base className={css.settingsOnboardingNotification}>
                <Notification
                  type="inform"
                  icon="Lightbulb"
                  onRemove={() => {
                    setSettingsOnboardingNotificationVisible(false);
                  }}
                >
                  <Text size="x3" weight="bold" margin="x1">
                    Setup Publishing
                  </Text>
                  <Text>
                    We really recommend you to setup publishing as a first step. You only need to do this once per
                    application, then you will be able to publish all versions to App Store Connect or Google Play
                    Console.
                  </Text>
                </Notification>
              </Base>
            )}
          </Placement>
        </AddonBeam>
      </PlacementManager>

      <Flex className={css.header} direction="vertical" paddingVertical={breadcrumbs ? 'x5' : 'x8'} gap="x2">
        {breadcrumbs}
        <PageTitle projectType={projectType} title={pageTitle} smaller={!!breadcrumbs} />
      </Flex>
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

const mapStateToProps = ({ app, appVersion: { appVersion } }: RootState) => ({ app, appVersion });

// @ts-ignore
export default connect(mapStateToProps)(Header);

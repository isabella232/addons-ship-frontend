import Link from 'next/link';
import { Tabs, Tab, Flex, Dot, Text, Base } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { mediaQuery } from '@/utils/media';

type Props = {
  appSlug: string;
  versionId: string;
  selectedTab: string | undefined;
  showActivityBadge: boolean;
};

export default ({ appSlug, versionId, selectedTab, showActivityBadge }: Props) => {
  const [isTablet] = mediaQuery('30rem');
  const tab = (key: string) => (
    <Link
      as={`/apps/${appSlug}/versions/${versionId}/${key}`}
      href={`/version?appSlug=${appSlug}&versionId=${versionId}&selectedTab=${key}`}
    >
      <a>
        <Tab active={selectedTab === key} paddingHorizontal={isTablet ? 'x4' : 'x3'}>
          <Flex direction="horizontal" alignChildren="middle" gap="x1">
            {showActivityBadge && key === 'activity' && <Dot size=".5rem" backgroundColor="red-3" />}
            <Base style={{paddingTop: '0.125rem'}} height={isTablet ? '1.5rem' : 'auto'}>
              <Text size={isTablet ? 'x3' : 'x2'}>{startCase(key)}</Text>
            </Base>
          </Flex>
        </Tab>
      </a>
    </Link>
  );

  return (
    <Tabs gap={isTablet ? 'x4' : 'x0'} paddingHorizontal={isTablet ? 'x4' : 'x0'}>
      {tab('details')}
      {tab('devices')}
      {tab('qa')}
      {tab('activity')}
    </Tabs>
  );
};

import Link from 'next/link';
import { Tabs, Tab, Flex, Dot, Text, Base } from '@bitrise/bitkit';
import startCase from 'lodash/startCase';

import { mediaQuery } from '@/utils/media';

type Props = {
  tabs: { label: string; showBadge?: boolean }[];
  selectedTab: string | undefined;
  linkAsPrefix: string;
  linkHrefPrefix: string;
};

export default ({ tabs, selectedTab, linkAsPrefix, linkHrefPrefix }: Props) => {
  const [isTablet] = mediaQuery('30rem');

  return (
    <Tabs gap={isTablet ? 'x4' : 'x0'} paddingHorizontal={isTablet ? 'x4' : 'x0'}>
      {tabs.map(({ label, showBadge = false }, idx) => (
        <Link as={`${linkAsPrefix}${label}`} href={`${linkHrefPrefix}${label}`} key={idx}>
          <a>
            <Tab active={selectedTab === label} paddingHorizontal={isTablet ? 'x4' : 'x3'}>
              <Flex direction="horizontal" alignChildren="middle" gap="x1">
                {showBadge && <Dot size=".5rem" backgroundColor="red-3" />}
                <Base style={{ paddingTop: '0.125rem' }} height={isTablet ? '1.5rem' : 'auto'}>
                  <Text size={isTablet ? 'x3' : 'x2'}>{startCase(label)}</Text>
                </Base>
              </Flex>
            </Tab>
          </a>
        </Link>
      ))}
    </Tabs>
  );
};

import { Fragment } from 'react';
import { Flex, Skeleton, Card, CardContent, SkeletonBox, Base, Divider } from '@bitrise/bitkit';

export default () => {
  return (
    <Flex direction="vertical" container margin="x16">
      <Skeleton active maxWidth="60rem">
        <Card direction="vertical" gap="x10">
          <CardContent _padding="x4">
            <SkeletonBox height="5rem" margin="x1" />
            <SkeletonBox
              height="6rem"
              width="6rem"
              absolute
              borderRadius="x2"
              borderColor="gray-3"
              style={{ left: '2rem', top: '2rem' }}
            />
          </CardContent>
          <CardContent padding="x4">
            <SkeletonBox height="2rem" width="18rem" margin="x3" />
            <SkeletonBox height="1rem" margin="x1" />
          </CardContent>
        </Card>
        <Base margin="x16">
          <SkeletonBox height="2.5rem" width="14rem" margin="x2" />

          {[...Array(5)].map((_, idx) => (
            <Fragment key={idx}>
              <Flex direction="vertical" gap="x1" margin="x6">
                <Flex direction="horizontal" alignChildrenHorizontal="between">
                  <SkeletonBox height="2rem" width="16rem" margin="x1" />
                  <SkeletonBox height="1.5rem" width="10rem" margin="x1" />
                </Flex>
                <SkeletonBox height="1rem" margin="x1" />
              </Flex>
              <Divider color="gray-2" />
            </Fragment>
          ))}
        </Base>
      </Skeleton>
    </Flex>
  );
};

import React from 'react';
import { NextContext } from 'next';
import { DefaultErrorIProps } from 'next/error';
import { AddonFooter, Flex, Text } from '@bitrise/bitkit';

import Error404 from './Error404';
import Error500 from './Error500';

interface ErrorContext extends Omit<NextContext, 'err'> {
  err: DefaultErrorIProps;
}

export type Props = {
  statusCode: number | null;
  appSlug: string;
};

export default class Error extends React.Component<Props> {
  static getInitialProps({ res, err }: ErrorContext) {
    let statusCode = null;
    if (res) {
      ({ statusCode } = res);
    } else if (err) {
      ({ statusCode } = err);
    }

    return { statusCode };
  }

  render() {
    const { statusCode, appSlug } = this.props;

    return (
      <Flex direction="vertical" alignChildrenVertical="middle" grow backgroundColor="grape-5" color="aqua-1">
        {[401, 404].includes(statusCode as number) && <Error404 appSlug={appSlug} />}
        {statusCode === 500 && <Error500 />}
        {(!statusCode || ![401, 404, 500].includes(statusCode)) && (
          <Flex direction="vertical" grow alignChildrenVertical="middle">
            <Text align="middle" config="5" margin="x8">
              An unexpected error occured
            </Text>
          </Flex>
        )}
        <Flex paddingVertical="x10">
          <AddonFooter addonName="Ship" />
        </Flex>
      </Flex>
    );
  }
}

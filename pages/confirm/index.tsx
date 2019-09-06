import React, { Fragment } from 'react';
import { Notification, Flex } from '@bitrise/bitkit';

import shipApi from '@/services/ship-api';
import { PageContext } from '@/models';
import { App } from '@/models/app';
import { AppContact } from '@/models/settings';
import ShipHead from '@/components/ShipHead';

import View, { Props as ViewProps } from './view';

export type Props = {
  app?: App;
  appContact?: AppContact;
  error?: string;
};

export default class ConfirmEmail extends React.Component<Props> {
  static displayName = 'ConfirmEmail';
  static async getInitialProps({ query: { token } }: PageContext) {
    let app, appContact;

    try {
      ({ app, appContact } = await shipApi.confirmEmail(token as string));
    } catch (e) {
      return { error: 'Failed to confirm email address' };
    }

    return { app, appContact };
  }

  componentDidMount() {
    const { app, error } = this.props;

    if (!app && !error) {
      location.reload();
    }
  }

  render() {
    const { app, appContact, error } = this.props;

    let content;
    if (!app || !appContact) {
      content = (
        <Flex alignChildrenHorizontal="middle" padding="x16">
          <Notification type="alert">{error}</Notification>
        </Flex>
      );
    } else {
      const viewProps: ViewProps = {
        ...app,
        ...appContact,
        appIconUrl: app.avatarUrl,
        appTitle: app.title
      };

      content = <View {...viewProps} />;
    }

    return (
      <Fragment>
        <ShipHead>Confirm Email</ShipHead>
        {content}
      </Fragment>
    );
  }
}

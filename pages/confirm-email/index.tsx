import React from 'react';

import View, { Props as ViewProps } from './view';

export default class ConfirmEmail extends React.Component {
  render() {
    const viewProps: ViewProps = {
      appSlug: 'test-app-slug-1',
      appIconUrl:
        'https://concrete-userfiles-production.s3.us-west-2.amazonaws.com/repositories/0dbc45647ce84cb9/avatar/avatar.png',
      appTitle: 'Super App',
      platform: 'ios',
      notificationPreferences: {
        failedPublish: true,
        newVersion: true,
        successfulPublish: false
      }
    };

    return <View {...viewProps} />;
  }
}

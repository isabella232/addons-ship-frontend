import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { AppContact } from '@/models/settings';

import View from './view';

type Props = {
  appContacts: AppContact[];
};

type State = {
  hasModifications: boolean;
  appContacts: AppContact[];
};

export class NotificationSettings extends React.Component<Props, State> {
  state: State = {
    hasModifications: false,
    appContacts: this.props.appContacts
  };

  onAddEmail = (email: string) => {
    console.log('onAddEmail', email);
  };

  onNotificationPreferenceChanged = (email: string, key: string, value: boolean) => {
    const appContacts = this.state.appContacts.map(contact => {
      if (contact.email === email) {
        return {
          ...contact,
          notificationPreferences: {
            ...contact.notificationPreferences,
            [key]: value
          }
        };
      }

      return contact;
    });

    const hasModifications = !isEqual(appContacts, this.props.appContacts);

    this.setState({ appContacts, hasModifications });
  };

  onSave = () => {
    console.log('onSave');
  };

  onCancel = () => {
    const { appContacts } = this.props;

    this.setState({ appContacts, hasModifications: false });
  };

  render() {
    const { appContacts, hasModifications } = this.state;

    const props = {
      onAddEmail: this.onAddEmail,
      onNotificationPreferenceChanged: this.onNotificationPreferenceChanged,
      appContacts,
      onSave: hasModifications ? this.onSave : undefined,
      onCancel: this.onCancel
    };

    return <View {...props} />;
  }
}

export default connect(() => ({
  appContacts: [
    {
      email: 'gergo.ovari@bitrise.io',
      isConfirmed: true,
      notificationPreferences: {
        newVersion: true,
        successfulPublish: true,
        failedPublish: true
      }
    },
    {
      email: 'jozsef.eros@bitrise.io',
      isConfirmed: false,
      notificationPreferences: {
        newVersion: false,
        successfulPublish: true,
        failedPublish: true
      }
    },
    {
      email: 'gergely.bekesi@bitrise.io',
      isConfirmed: true,
      notificationPreferences: {
        newVersion: true,
        successfulPublish: false,
        failedPublish: true
      }
    }
  ]
}))(NotificationSettings);

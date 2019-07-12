import React from 'react';

import { AppContact } from '@/models/settings';

import View from './view';

type State = {
  appContacts: AppContact[];
};

export default class NotificationSettings extends React.Component {
  state: State = {
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

    this.setState({ appContacts });
  };

  render() {
    const { appContacts } = this.state;

    const props = {
      onAddEmail: this.onAddEmail,
      onNotificationPreferenceChanged: this.onNotificationPreferenceChanged,
      appContacts
    };

    return <View {...props} />;
  }
}

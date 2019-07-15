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
  updatedAppContacts: AppContact[];
};

export class NotificationSettings extends React.Component<Props, State> {
  state: State = {
    hasModifications: false,
    updatedAppContacts: this.props.appContacts
  };

  onAddEmail = (email: string) => {
    console.log('onAddEmail', email);
  };

  onNotificationPreferenceChanged = (email: string, key: string, value: boolean) => {
    const updatedAppContacts = this.state.updatedAppContacts.map(contact => {
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

    const hasModifications = !isEqual(updatedAppContacts, this.props.appContacts);

    this.setState({ updatedAppContacts, hasModifications });
  };

  onDeleteContact = (email: string) => {
    const updatedAppContacts = this.state.updatedAppContacts.map(contact => {
      if (contact.email === email) {
        return {
          ...contact,
          isMarkedForDelete: true
        };
      }

      return contact;
    });

    this.setState({ updatedAppContacts, hasModifications: true });
  };

  onSave = () => {
    console.log('onSave');
  };

  onCancel = () => {
    const { appContacts } = this.props;

    this.setState({ updatedAppContacts: appContacts, hasModifications: false });
  };

  render() {
    const { updatedAppContacts, hasModifications } = this.state;

    const props = {
      appContacts: updatedAppContacts,
      onAddEmail: this.onAddEmail,
      onNotificationPreferenceChanged: this.onNotificationPreferenceChanged,
      onDeleteContact: this.onDeleteContact,
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

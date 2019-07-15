import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { AppContact } from '@/models/settings';
import { RootState } from '@/store';
import { addAppContact } from '@/ducks/settings';

import View from './view';

type Props = {
  appSlug: string;
  appContacts: AppContact[];
  addAppContact: typeof addAppContact;
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

  componentDidUpdate({ appContacts: prevAppContacts }: Props) {
    const { appContacts } = this.props;

    if (prevAppContacts.length !== appContacts.length) {
      this.setState({ updatedAppContacts: appContacts, hasModifications: false });
    }
  }

  onAddEmail = (email: string) => {
    const { appSlug, addAppContact } = this.props;

    addAppContact(appSlug, email);
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

const mapStateToProps = ({ settings: { appContacts } }: RootState) => ({ appContacts }),
  mapDispatchToProps = { addAppContact };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(NotificationSettings);

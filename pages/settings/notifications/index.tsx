import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { AppContact } from '@/models/settings';
import { RootState } from '@/store';
import { addAppContact, updateAppContact, deleteAppContact } from '@/ducks/settings';

import View from './view';

type Props = {
  appSlug: string;
  appContacts: AppContact[];
  addAppContact: typeof addAppContact;
  updateAppContact: typeof updateAppContact;
  deleteAppContact: typeof deleteAppContact;
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
    if (!email) return;

    addAppContact(appSlug, email);
  };

  onNotificationPreferenceChanged = (email: string, key: string, value: boolean) => {
    const updatedAppContacts = this.state.updatedAppContacts.map(contact => {
      if (contact.email === email) {
        return {
          ...contact,
          isMarkedForUpdate: true,
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
          isMarkedForDelete: true,
          isMarkedForUpdate: false
        };
      }

      return contact;
    });

    this.setState({ updatedAppContacts, hasModifications: true });
  };

  onSave = () => {
    const { appSlug, updateAppContact, deleteAppContact } = this.props;
    const { updatedAppContacts, hasModifications } = this.state;

    if (!hasModifications) return;

    updatedAppContacts
      .filter(({ isMarkedForUpdate, isMarkedForDelete }) => isMarkedForUpdate || isMarkedForDelete)
      .forEach(({ isMarkedForUpdate, isMarkedForDelete, ...appContact }) => {
        if (isMarkedForUpdate) {
          updateAppContact(appSlug, appContact);
        }

        if (isMarkedForDelete) {
          deleteAppContact(appSlug, appContact);
        }
      });

    this.setState({ hasModifications: false });
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
  mapDispatchToProps = { addAppContact, updateAppContact, deleteAppContact };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(NotificationSettings);

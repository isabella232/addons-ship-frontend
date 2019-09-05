import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { AppContact } from '@/models/settings';
import { RootState } from '@/store';
import { addAppContact, updateAppContact, deleteAppContact } from '@/ducks/settings';
import { listAppContacts } from '@/ducks/settings';

import View from './view';

export type Props = {
  appSlug: string;
  appContacts: AppContact[];
  hasLoaded: boolean;
  listAppContacts: typeof listAppContacts;
  addAppContact: typeof addAppContact;
  updateAppContact: typeof updateAppContact;
  deleteAppContact: typeof deleteAppContact;
};

type State = {
  email: string;
  isAddingEmail: boolean;
  hasModifications: boolean;
  updatedAppContacts: AppContact[];
  error?: string;
};

export class NotificationSettings extends React.Component<Props, State> {
  state: State = {
    email: '',
    isAddingEmail: false,
    hasModifications: false,
    updatedAppContacts: this.props.appContacts
  };

  componentDidMount() {
    const { appSlug, listAppContacts } = this.props;

    listAppContacts(appSlug);
  }

  componentDidUpdate({ appContacts: prevAppContacts }: Props) {
    const { appContacts } = this.props;

    if (prevAppContacts.length !== appContacts.length) {
      if (this.state.isAddingEmail) {
        this.setState({ email: '' });
      }
      this.setState({ updatedAppContacts: appContacts, hasModifications: false, isAddingEmail: false });
    }
  }

  onEmailChange = (email: string) => {
    this.setState({ email });
  };

  onAddEmail = (email: string) => {
    const { appSlug, addAppContact, appContacts } = this.props;
    if (!email) return;

    if (appContacts.find(contact => contact.email === email)) {
      this.setState({ error: 'Email already in contact list' });
      return;
    }

    this.setState({ error: undefined, isAddingEmail: true });

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
    const { hasLoaded } = this.props;
    const { email, isAddingEmail, updatedAppContacts, hasModifications, error } = this.state;

    const props = {
      hasLoaded,
      appContacts: updatedAppContacts,
      email,
      onEmailChange: this.onEmailChange,
      onAddEmail: this.onAddEmail,
      isAddingEmail: isAddingEmail,
      onNotificationPreferenceChanged: this.onNotificationPreferenceChanged,
      onDeleteContact: this.onDeleteContact,
      onSave: hasModifications ? this.onSave : undefined,
      onCancel: this.onCancel,
      error
    };

    return <View {...props} />;
  }
}

const mapStateToProps = ({ settings: { appContacts, hasAppContactsLoaded } }: RootState) => ({
    appContacts,
    hasLoaded: hasAppContactsLoaded
  }),
  mapDispatchToProps = { listAppContacts, addAppContact, updateAppContact, deleteAppContact };

export default connect(
  mapStateToProps,
  mapDispatchToProps
  // @ts-ignore
)(NotificationSettings);

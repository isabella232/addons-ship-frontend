import React from 'react';
import View from './view';

export default class NotificationSettings extends React.Component {
  onAddEmail = (email: string) => {
    console.log('onAddEmail', email);
  };

  render() {
    const props = {
      onAddEmail: this.onAddEmail
    };

    return <View {...props} />;
  }
}

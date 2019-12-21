import React, {Component} from 'react';
import {View} from 'react-native';
import {LoginButton} from 'react-native-fbsdk';

export default class FBLoginButton extends React.Component {
  render() {
    return (
      <LoginButton
        publishPermissions={[
          'email',
          'user_birthday',
          'user_age_range',
          'user_photos',
        ]}
        onLoginFinished={(error, result) => {
          if (error) {
            alert('Login failed with error: ' + error.message);
          } else if (result.isCancelled) {
            alert('Login was cancelled');
          } else {
            alert(
              'Login was successful with permissions: ' +
                result.grantedPermissions,
            );
          }
        }}
        onLogoutFinished={() => alert('User logged out')}
      />
    );
  }
}

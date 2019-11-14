import React from 'react';
import {
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

const defaultUserProfileImage = require('../../assets/user-filler.png');

/**
 * A generic component which allows the user to click on their image and edit/update user
 * specific information.
 */
export default class UserSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userProfileImage = this.props.userProfileImage
      ? this.props.userProfileImage
      : defaultUserProfileImage;

    return (
      <TouchableOpacity
        onPress={this.props.onPressFunc}
        style={{
          marginTop: '5%',
          borderRadius: 60,
        }}>
        <Image source={userProfileImage} style={{height: 40, width: 40}} />
      </TouchableOpacity>
    );
  }
}

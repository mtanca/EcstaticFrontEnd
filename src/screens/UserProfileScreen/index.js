import React from 'react';
import {Text} from 'react-native';

export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigate} = this.props.navigation;

    return <Text> USER PROFILE SCREEN </Text>;
  }
}

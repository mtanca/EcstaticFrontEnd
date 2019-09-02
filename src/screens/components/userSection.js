import React from "react";
import {View, Text, ScrollView, Image, StyleSheet} from "react-native";

const defaultUserProfileImage = require('../../assets/user-filler.png')

/**
 * A generic component which allows the user to click on their image and edit/update user
 * specific information.
*/
class UserSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const userProfileImage = this.props.userProfileImage ? this.props.userProfileImage : defaultUserProfileImage

    return(
      <View style={{marginLeft: 5, marginTop: '5%', borderRadius: 60, marginBottom: '5%'}}>
        <Image
          source={userProfileImage}
          style={{height: 40, width: 40}}
        />
      </View>
    )
  }
}

export default UserSection

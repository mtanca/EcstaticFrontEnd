import React from "react";
import {Text} from "react-native";


class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Text> FORGOT PASSWORD SCREEN </Text>
    )
  }
}

export default ForgotPasswordScreen

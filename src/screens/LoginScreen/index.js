import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      isAllFieldsFilled: true,
    }
  }

  updateField = (hash) => {
    this.setState(hash)
    this._enableSumbitButton()
  }

  _enableSumbitButton = () => {
    const fieldsNotToCheck = ["isAllFieldsFilled"]

    let requiredBlankFields = Object.keys(this.state)
                                    .filter(key => !fieldsNotToCheck.includes(key) && this.state[key] == "")

    if(requiredBlankFields.length == 0) {
      this.setState({
        isAllFieldsFilled: false
      })
    } else {
      this.setState({
        isAllFieldsFilled: true
      })
    }
  }

  handleSubmit = () => {
    fetch('https://mywebsite.com/endpoint/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      }),
    });
  }

  render() {
    return (
        <View>
        <FormLabel> Email Name </FormLabel>
          <FormInput onChangeText={(email) => this.updateField({email: email})}/>
        <FormLabel> Password </FormLabel>
          <FormInput secureTextEntry={true} onChangeText={(password) => this.updateField({password: password})}/>

        <Button
          onPress={() => this.handleSubmit()}
          title="Login"
          color="#3FF1BF"
          disabled={this.state.isAllFieldsFilled}
        />
      </View>
    )
  }
}

export default LoginScreen

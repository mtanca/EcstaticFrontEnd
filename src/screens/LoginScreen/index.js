import React from "react";
import {View, Text, Button, StyleSheet, Dimensions,} from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

var FBLoginButton = require('./FBLoginButton');

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
    fetch('http://0.0.0.0:4000/sessions/new', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        registering_as: "patient"
      }),
    }).then((response) => {
      response = JSON.parse(response._bodyText)
      if(response.created === true){
        this._storeData(response)
        this.setState({
          canNavigate: true
        })
      } else {
        this._handleErrors(response.errors)
      }
    })
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.container}>
            <FBLoginButton />
          </View>

        <View>
          <FormLabel> Email Name </FormLabel>
            <FormInput onChangeText={(email) => this.updateField({email: email})}/>
          <FormLabel> Password </FormLabel>
            <FormInput secureTextEntry={true} onChangeText={(password) => this.updateField({password: password})}/>
        </View>

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

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 60,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default LoginScreen

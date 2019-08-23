import React from "react";
import {View, Text, Button, StyleSheet, Dimensions,} from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import PropTypes from 'prop-types';
import {FBLogin, FBLoginManager} from 'react-native-facebook-login';

var FBLoginButton = require('./FBLoginButton');
import RegistrationScreen from '../RegistrationScreen';


class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      isAllFieldsFilled: true,
      buttonColor: "#39f3bb"
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
        isAllFieldsFilled: false,
        buttonColor: "#39f3bb"
      })
    } else {
      this.setState({
        isAllFieldsFilled: true,
        buttonColor: "#39f3bb"
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
    const {navigate} = this.props.navigation;

    return (
      <View>
        <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 20}}>Log In</Text>
        <View style={styles.container}>
          <View style={styles.container}>
            <FBLogin />
          </View>

        <View>
          <FormLabel labelStyle={{fontWeight: 'bold'}}> Email or username </FormLabel>
            <FormInput
              containerStyle={{backgroundColor: "#f2f4f7", placeholder: "Hello world", value: "hello", defaultValue: "xxxxx"}}
              onChangeText={(email) => this.updateField({email: email})}
            />
          <FormLabel> Password </FormLabel>
            <FormInput
              inputStyle={{backgroundColor: "#f2f4f7", placeholder: "Hello world", value: "world", defaultValue: "xxxxx"}}
              secureTextEntry={true}
              onChangeText={(password) => this.updateField({password: password})}
            />
            <Text style={{marginLeft: 15, marginTop: 5, color: '#00b1f1', fontWeight: 'bold'}}> Forgot Password? </Text>
        </View>
        <View style={{marginTop: 50}}>
          <Button
            onPress={() => this.handleSubmit()}
            title="Login"
            color={this.state.buttonColor}
            disabled={this.state.isAllFieldsFilled}
          />
        </View>
        </View>

        <View style={styles.signUp}>
          <Text style= {{color: "#798498", textAlign: 'center'}}> Already have an account?</Text>
          <Text
            onPress={() => navigate("RegistrationScreen", {navigation: navigate.navigate})}
            style={{fontWeight: 'bold'}}
          > Sign Up
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUp: {
    marginTop: 80,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default LoginScreen

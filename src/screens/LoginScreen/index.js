import React from "react";
import {View, Text, Button, StyleSheet, Dimensions} from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import AsyncStorage from '@react-native-community/async-storage';


import MainScreen from '../MainScreen';
import RegistrationScreen from '../RegistrationScreen';
import ForgotPasswordScreen from '../ForgotPasswordScreen';
import HomeScreen from '../HomeScreen';

const FBLoginButton = require('./FBLoginButton');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      isAllFieldsFilled: true,
      loginErrors: false,
    }

    this._storeData = this._storeData.bind(this)
    this.navigate = this._navigate.bind(this)
  }

  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@userId', data.userId + "")
      await AsyncStorage.setItem('@isLoggedIn', 'true')
    } catch (e) {
      // saving error
    }
  }

  updateField = (hash) => {
    this.setState(hash)
    this._enableSumbitButton()
  }

  _navigate = () => {
    this.props.navigation.navigate("HomeScreen", {navigation: this.props.navigation.navigate})
  }

  _enableSumbitButton = () => {
    const fieldsNotToCheck = ["isAllFieldsFilled", "loginErrors"]

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
    fetch("http://192.168.1.14:4000/api/sessions", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this._storeData(responseJson.data)
        if(responseJson.data.isAuthenticated) {
          this.setState({
            canNavigate: true,
            loginHasErrors: false
          })
        } else {
          this.setState({
            loginHasErrors: true
          })
        }
      })
  }

  render() {
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    let signUpMarginTopScalor = null

    if(window.height > 748 && window.width > 384) {
      signUpMarginTopScalor = "37%"
    } else if (window.height > 592 && window.width > 384) {
      signUpMarginTopScalor = "25%"
    } else {
      signUpMarginTopScalor = "15%"
    }

    return (
      <View style={styles.container}>
        <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 20}}>Log In</Text>
        <View style={styles.contentContainer}>
          <FBLoginButton />

          <View style={{marginTop: '10%'}}>
          {
            this.state.loginHasErrors &&
            <Text style={{marginLeft: 15, fontWeight: 'bold', color: 'red'}}>Invalid username or password. Please try again.</Text>
          }
            <FormLabel labelStyle={{fontWeight: 'bold'}}> Email or username </FormLabel>
            <FormInput
              containerStyle={{backgroundColor: "#f2f4f7"}}
              onChangeText={(email) => this.updateField({email: email})}
            />
            <FormLabel> Password </FormLabel>
            <FormInput
              inputStyle={{backgroundColor: "#f2f4f7"}}
              secureTextEntry={true}
              onChangeText={(password) => this.updateField({password: password})}
            />

            <Text
              onPress={() => navigate("ForgotPasswordScreen", {navigation: navigate.navigate})}
              style={styles.forgotPasswordButton}> Forgot Password?
            </Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <Button
              onPress={() => this.handleSubmit()}
              title="Login"
              color={this.state.buttonColor}
              disabled={this.state.isAllFieldsFilled}
            />
          </View>
        </View>

        <View style={{
            marginTop: signUpMarginTopScalor,
            width: '100%',
            height: 50,
            justifyContent: 'center',
            flexDirection:'row',
            flexWrap:'wrap',
            alignItems: 'center'
          }}
        >
          <Text style= {{color: "#798498", textAlign: 'center'}}> Already have an account?</Text>
          <Text
            onPress={() => navigate("RegistrationScreen", {navigation: navigate.navigate})}
            style={{fontWeight: 'bold'}}
          > Sign Up
          </Text>
        </View>


        {this.state.canNavigate && this._navigate()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordButton: {
    marginLeft: 15,
    marginTop: 5,
    color: '#00b1f1',
    fontWeight: 'bold'
  }
})

export default LoginScreen

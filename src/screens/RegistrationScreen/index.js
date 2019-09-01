import React from "react";
import {View, Text, Button, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView} from "react-native";

import RegistrationScreenTwo from './two.js'
import EcstaticButton from '../components/ecstaticButton.js'

import FBLoginButton from '../components/FBLoginButton';
import { FormLabel, FormInput, FormValidationMessage, Icon } from 'react-native-elements'

class RegistrationScreenOne extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      nextButtonColor: 'rgba(57,243,187, 0.5)',
      isAllFieldsFilled: false,
      email: '',
      password: '',
      confirmPassword: '',
      registrationErrors: null,
      isDisabled: true
    }

    this.updateField = this.updateField.bind(this)
    this._enableSumbitButton = this._enableSumbitButton.bind(this)
  }

  updateField = (hash) => {
    this.setState(hash)
    this._enableSumbitButton()
  }


  _enableSumbitButton = () => {
    const fieldsNotToCheck = ["isAllFieldsFilled", "registrationErrors", "nextButtonColor"]

    let requiredBlankFields = Object.keys(this.state)
                                    .filter(key => !fieldsNotToCheck.includes(key) && this.state[key] == "")

    if(requiredBlankFields.length == 0) {
      this.setState({
        isAllFieldsFilled: true,
        nextButtonColor: "#39f3bb",
        isDisabled: false,
      })
    } else {
      this.setState({
        isAllFieldsFilled: false,
        nextButtonColor: 'rgba(57,243,187, 0.5)',
        isDisabled: true
      })
    }
  }

  _navigate = () => {
    _storeData(this.state)
  }

  // We need to store the data on the disk in the event the user fills out the first registration
  // screen, but does not complete the enitre registration process. Doing this allows us to go
  // directly to the last registration screen when the app loads up.
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('@email', data.email)
      // TODO passwords should be hashed!!!
      await AsyncStorage.setItem('@password', data.password)
      await AsyncStorage.setItem('@confirmedPassword', data.confirmPassword)
    } catch (e) {
      // saving error
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    const window = Dimensions.get('window');

    let logInMarginTopScalor = null
    let nextButtonMarginTopScalor = null
    let formHeightScalor = null

    if(window.height > 748 && window.width > 384) {
      logInMarginTopScalor = "8%"
      nextButtonMarginTopScalor = 75
      formHeightScalor = '12%'
    } else if (window.height > 592 && window.width > 384) {
      logInMarginTopScalor = "6%"
      nextButtonMarginTopScalor = 75
      formHeightScalor = '12%'
    } else {
      logInMarginTopScalor = 10
      nextButtonMarginTopScalor = 30
      formHeightScalor = '10%'
    }

    return(
      <View>
        <Text style={{marginLeft: 5, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>Account Creation</Text>
        <View style={styles.contentContainer}>
          <FBLoginButton />
        </View>
        <Text style={{marginTop: '3%', textAlign: 'center'}}>or</Text>

        <View style={{marginLeft: '5%'}}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Email</Text>
          <View style={styles.formContainer}>
            <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="envelope" size={15} color="#b9bec9"/>
            <TextInput
              style={styles.inputStyle}
                autoCorrect={false}
                placeholder={"Enter your email address"}
                onChangeText={(email) => this.updateField({email: email})}
              />
          </View>

          <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>Create Password</Text>
          <View style={styles.formContainer}>
            <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="lock-alt" size={15} color="#b9bec9"/>
            <TextInput
              style={styles.inputStyle}
                autoCorrect={false}
                secureTextEntry={true}
                placeholder={"Enter new password"}
                onChangeText={(password) => this.updateField({password: password})}
              />
          </View>

          <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>Confirm Password</Text>
          <View style={styles.formContainer}>
            <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="lock-alt" size={15} color="#b9bec9"/>
            <TextInput
              style={styles.inputStyle}
                autoCorrect={false}
                secureTextEntry={true}
                placeholder={"Confirm new password"}
                onChangeText={(confirmPassword) => this.updateField({confirmPassword: confirmPassword})}
              />
          </View>

          <EcstaticButton
            buttonMarginTopScalor={nextButtonMarginTopScalor}
            buttonColor={this.state.nextButtonColor}
            isDisabled={this.state.isDisabled}
            buttonText={"Next"}
            navigationScreen={"RegistrationScreenTwo"}
            navigation={this.props.navigation}
            onPressFunc={() => navigate("RegistrationScreenTwo", {navigation: navigate})}
          />

          <View style={{flexDirection:'row', flexWrap:'wrap', alignItems: 'center', justifyContent: 'center', marginTop: logInMarginTopScalor}}>
            <Text style= {{color: "#798498", textAlign: 'center', marginTop: '6%'}}> Already have an account?</Text>
            <Text
              onPress={() => navigate("LoginScreen", {navigation: navigate.navigate})}
              style={{fontWeight: 'bold'}}
            > Log In
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
  formContainer: {
  flexDirection: 'row',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 5,
  marginRight: '5%'
  },
  inputStyle: {
    flex: 1,
  }
})

export default RegistrationScreenOne;

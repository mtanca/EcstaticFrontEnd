import React from "react";
import {View, Text, Button, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView} from "react-native";
import {FormLabel, FormInput, FormValidationMessage, Icon} from 'react-native-elements'

import EcstaticButton from '../components/ecstaticButton.js'

class RegistrationScreenTwo extends React.Component {
  constructor(props) {
    super(props)

    this.state ={
      nextButtonColor: 'rgba(57,243,187, 0.5)',
      isAllFieldsFilled: false,
      username: '',
      firstName: '',
      lastName: '',
      age: '',
      giveawayUUID: '',
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

  render() {
    const {navigate} = this.props.navigation;
    const window = Dimensions.get('window');

    let logInMarginTopScalor = null
    let completeButtonMarginTopScalor = null
    let formHeightScalor = null

    if(window.height > 748 && window.width > 384) {
      logInMarginTopScalor = "8%"
      completeButtonMarginTopScalor = 50
      formHeightScalor = '12%'
    } else if (window.height > 592 && window.width > 384) {
      logInMarginTopScalor = "6%"
      completeButtonMarginTopScalor = 50
      formHeightScalor = '12%'
    } else {
      logInMarginTopScalor = 10
      completeButtonMarginTopScalor = 25
      formHeightScalor = '10%'
    }

    return(
      <ScrollView>
        <Text style={{marginLeft: 5, marginTop: 10, fontWeight: 'bold', fontSize: 20}}>Account Creation</Text>
        <View style={{width: '95%'}}>
          <Text style={{marginLeft: '5%', marginTop: '3%', color: "#798498"}}>You’re almost there! We just need a little more information to properly setup your account.</Text>
        </View>

        <View style={{marginTop: '5%', marginLeft: '5%'}}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Create Username</Text>
          <View style={styles.formContainer}>
            <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="envelope" size={15} color="#b9bec9"/>
            <TextInput
              style={styles.inputStyle}
                autoCorrect={false}
                placeholder={"Enter new username"}
                onChangeText={(username) => this.updateField({username: username})}
              />
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>First Name</Text>
            <Text style={{marginTop: 15, marginLeft: '32%', paddingBottom: 5, fontWeight: 'bold'}}>Last Name</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={Object.assign({}, styles.formContainer, {width: '45%'})}>
              <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="lock-alt" size={15} color="#b9bec9"/>
              <TextInput
                autoCorrect={false}
                placeholder={"Enter first name"}
                onChangeText={(firstName) => this.updateField({firstName: firstName})}
              />
            </View>

            <View style={Object.assign({}, styles.formContainer, {width: '45%'})}>
              <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="lock-alt" size={15} color="#b9bec9"/>
              <TextInput
                autoCorrect={false}
                placeholder={"Enter last name"}
                onChangeText={(lastName) => this.updateField({lastName: lastName})}
              />
            </View>
          </View>

            <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>Age</Text>
            <View style={styles.formContainer}>
              <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="envelope" size={15} color="#b9bec9"/>
              <TextInput
                style={styles.inputStyle}
                  autoCorrect={false}
                  placeholder={"Enter your age"}
                  onChangeText={(age) => this.updateField({age: age})}
                />
            </View>

            <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>Enter Invite Code</Text>
            <View style={styles.formContainer}>
              <Icon containerStyle={{marginLeft: 10, marginBottom: 5}} name="envelope" size={15} color="#b9bec9"/>
              <TextInput
                style={styles.inputStyle}
                  autoCorrect={false}
                  placeholder={"Enter code received in your invite"}
                  onChangeText={(giveawayUUID) => this.updateField({giveawayUUID: giveawayUUID})}
                />
            </View>

          <EcstaticButton
            buttonMarginTopScalor={completeButtonMarginTopScalor}
            buttonColor={this.state.nextButtonColor}
            isDisabled={this.state.isDisabled}
            buttonText={"Complete"}
            navigationScreen={"GiveAwayShowScreen"}
            navigation={this.props.navigation}
            onPressFunc={() => navigate("GiveAwayShowScreen", {navigation: navigate})}
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
      </ScrollView>
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

export default RegistrationScreenTwo

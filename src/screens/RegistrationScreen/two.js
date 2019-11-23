import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import EcstaticButton from '../components/ecstaticButton.js';

import {IP_ADDRESS} from '../../constants/constants.js';

class RegistrationScreenTwo extends React.Component {
  constructor(props) {
    super(props);

    const registrationScreenOneProps = this.props.navigation.state.params.props;

    this.state = {
      nextButtonColor: 'rgba(57,243,187, 0.5)',
      isAllFieldsFilled: false,
      username: '',
      firstName: '',
      lastName: '',
      canNavigate: false,
      age: '',
      giveawayUUID: '',
      registrationErrors: null,
      registrationHasErrors: false,
      isDisabled: true,
      registrationScreenOneProps: registrationScreenOneProps,
    };

    this.updateField = this.updateField.bind(this);
    this._enableSumbitButton = this._enableSumbitButton.bind(this);
  }

  updateField = hash => {
    this.setState(hash);
    this._enableSumbitButton();
  };

  _enableSumbitButton = () => {
    const fieldsNotToCheck = [
      'canNavigate',
      'isAllFieldsFilled',
      'registrationErrors',
      'nextButtonColor',
      'isDisabled',
      'registrationScreenOneProps',
      'registrationHasErrors',
      'registrationErrors',
    ];

    let requiredBlankFields = Object.keys(this.state).filter(
      key => !fieldsNotToCheck.includes(key) && this.state[key] == '',
    );

    if (requiredBlankFields.length == 0) {
      this.setState({
        isAllFieldsFilled: true,
        nextButtonColor: '#39f3bb',
        isDisabled: false,
      });
    } else {
      this.setState({
        isAllFieldsFilled: false,
        nextButtonColor: 'rgba(57,243,187, 0.5)',
        isDisabled: true,
      });
    }
  };

  _navigate = () => {
    this.props.navigation.navigate('BetaHomeScreen', {
      navigation: this.props.navigation.navigate,
      giveawayId: this.state.giveawayId,
    });
  };

  _storeData = async data => {
    try {
      await AsyncStorage.setItem('@userId', data.userId + '');
      await AsyncStorage.setItem('@isLoggedIn', 'true');
      await AsyncStorage.setItem('@giveawayId', data.giveawayId + '');
      await AsyncStorage.setItem('@userFirstName', this.state.firstName + '');
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  handleSubmit = () => {
    fetch(`http://${IP_ADDRESS}:4000/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.registrationScreenOneProps.email.toLowerCase(),
        password: this.state.registrationScreenOneProps.password,
        confirm_password: this.state.registrationScreenOneProps.confirmPassword,
        age: this.state.age,
        username: this.state.username.toLowerCase(),
        first_name: this.state.firstName.toLowerCase(),
        last_name: this.state.lastName.toLowerCase(),
        giveawayUUID: this.state.giveawayUUID,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.errors == null) {
          this._storeData(responseJson.data);
          this.setState({
            canNavigate: true,
            registrationHasErrors: false,
            giveawayId: responseJson.data.giveawayId,
          });
        } else {
          this.setState({
            registrationHasErrors: true,
            registrationErrors: responseJson.data.errors,
          });
        }
      });
  };

  render() {
    const {navigate} = this.props.navigation;
    const window = Dimensions.get('window');

    let logInMarginTopScalor = null;
    let completeButtonMarginTopScalor = null;
    let formHeightScalor = null;

    if (window.height > 748 && window.width > 384) {
      logInMarginTopScalor = '8%';
      completeButtonMarginTopScalor = 50;
      formHeightScalor = '12%';
    } else if (window.height > 592 && window.width > 384) {
      logInMarginTopScalor = '6%';
      completeButtonMarginTopScalor = 50;
      formHeightScalor = '12%';
    } else {
      logInMarginTopScalor = 10;
      completeButtonMarginTopScalor = 25;
      formHeightScalor = '10%';
    }

    return (
      <ScrollView>
        <Text
          style={{
            marginLeft: 5,
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Account Creation
        </Text>
        <View style={{width: '95%'}}>
          <Text style={{marginLeft: '5%', marginTop: '3%', color: '#798498'}}>
            You’re almost there! We just need a little more information to
            properly setup your account.
          </Text>
        </View>

        {this.state.registrationHasErrors && (
          <Text style={{marginLeft: 15, fontWeight: 'bold', color: 'red'}}>
            {this.state.registrationErrors}
          </Text>
        )}

        <View style={styles.mainFormContainer}>
          <View style={styles.formContainer}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Create Username
            </Text>
            <View style={styles.formBody}>
              <Icon
                style={{marginLeft: 10}}
                name="user"
                size={15}
                color="#b9bec9"
              />
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                placeholder={'Enter new username'}
                onChangeText={username =>
                  this.updateField({username: username})
                }
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={{flexDirection: 'column', width: '45%'}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                First Name
              </Text>
              <View>
                <View style={styles.formBody}>
                  <TextInput
                    style={{marginLeft: 5}}
                    autoCorrect={false}
                    placeholder={'Enter first name'}
                    onChangeText={firstName =>
                      this.updateField({firstName: firstName})
                    }
                  />
                </View>
              </View>
            </View>

            <View
              style={{flexDirection: 'column', marginLeft: '5%', width: '45%'}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Last Name
              </Text>
              <View>
                <View style={styles.formBody}>
                  <TextInput
                    style={{marginLeft: 5}}
                    autoCorrect={false}
                    placeholder={'Enter last name'}
                    onChangeText={lastName =>
                      this.updateField({lastName: lastName})
                    }
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Age</Text>
            <View style={styles.formBody}>
              <Icon
                style={{marginLeft: 10}}
                name="calendar"
                size={15}
                color="#b9bec9"
              />
              <TextInput
                style={styles.inputStyle}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                autoCorrect={false}
                placeholder={'Enter your age'}
                onChangeText={age => this.updateField({age: age})}
              />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Enter Invite Code
            </Text>
            <View style={styles.formBody}>
              <Icon
                style={{marginLeft: 10}}
                name="key"
                size={15}
                color="#b9bec9"
              />
              <TextInput
                style={styles.inputStyle}
                autoCorrect={false}
                placeholder={'Enter code received in your invite'}
                onChangeText={giveawayUUID =>
                  this.updateField({giveawayUUID: giveawayUUID})
                }
              />
            </View>
          </View>
        </View>

        <View>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <EcstaticButton
                buttonMarginTopScalor={completeButtonMarginTopScalor}
                buttonColor={this.state.nextButtonColor}
                isDisabled={this.state.isDisabled}
                buttonText={'Complete'}
                navigationScreen={'BetaHomeScreen'}
                navigation={this.props.navigation}
                onPressFunc={() => this.handleSubmit()}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: logInMarginTopScalor,
            }}>
            <Text
              style={{color: '#798498', textAlign: 'center', marginTop: '6%'}}>
              {' '}
              Already have an account?
            </Text>
            <Text
              onPress={() =>
                navigate('LoginScreen', {navigation: navigate.navigate})
              }
              style={{fontWeight: 'bold'}}>
              {' '}
              Log In
            </Text>
          </View>
        </View>

        {this.state.canNavigate && this._navigate()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainFormContainer: {
    marginLeft: '5%',
    width: '95%',
  },
  formContainer: {
    marginTop: 15,
    width: '95%',
  },
  formBody: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    marginLeft: 5,
  },
});

export default RegistrationScreenTwo;

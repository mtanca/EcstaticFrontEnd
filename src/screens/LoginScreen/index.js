import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import EcstaticButton from '../components/ecstaticButton.js';

import {IP_ADDRESS} from '../../constants/constants.js';

import FBLoginButton from '../components/FBLoginButton';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isAllFieldsFilled: false,
      loginErrors: false,
      buttonColor: 'rgba(57,243,187, 0.5)',
      isDisabled: true,
    };

    this._storeData = this._storeData.bind(this);
    this.navigate = this._navigate.bind(this);
  }

  _storeData = async data => {
    try {
      await AsyncStorage.setItem('@userId', data.userId + '');
      await AsyncStorage.setItem('@userFirstName', data.userFirstName + '');
      await AsyncStorage.setItem('@isLoggedIn', 'true');
      await AsyncStorage.setItem('@giveawayId', data.giveawayId + '');
    } catch (e) {
      // saving error
    }
  };

  updateField = hash => {
    this.setState(hash);
    this._enableSumbitButton();
  };

  _navigate = () => {
    this.props.navigation.navigate('BetaHomeScreen', {
      navigation: this.props.navigation.navigate,
      giveawayId: this.state.giveawayId,
    });
  };

  _enableSumbitButton = () => {
    const fieldsNotToCheck = ['isAllFieldsFilled', 'loginErrors'];

    let requiredBlankFields = Object.keys(this.state).filter(
      key => !fieldsNotToCheck.includes(key) && this.state[key] == '',
    );

    if (requiredBlankFields.length == 0) {
      this.setState({
        isAllFieldsFilled: true,
        buttonColor: '#39f3bb',
        isDisabled: false,
      });
    } else {
      this.setState({
        isAllFieldsFilled: false,
        buttonColor: 'rgba(57,243,187, 0.5)',
        isDisabled: true,
      });
    }
  };

  handleSubmit = () => {
    fetch(`http://${IP_ADDRESS}:4000/api/sessions`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this._storeData(responseJson.data);

        if (responseJson.data.isAuthenticated) {
          this.setState({
            canNavigate: true,
            loginHasErrors: false,
            giveawayId: responseJson.data.giveawayId,
          });
        } else {
          this.setState({
            loginHasErrors: true,
          });
        }
      });
  };

  render() {
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    let signUpMarginTopScalor = null;

    if (window.height > 748 && window.width > 384) {
      signUpMarginTopScalor = '37%';
    } else if (window.height > 592 && window.width > 384) {
      signUpMarginTopScalor = '25%';
    } else {
      signUpMarginTopScalor = '15%';
    }

    return (
      <View>
        <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 20}}>
          Log In
        </Text>
        <View style={styles.facebookBtnContainer}>
          <FBLoginButton />
        </View>

        <View style={{marginTop: '10%'}}>
          {this.state.loginHasErrors && (
            <Text style={{marginLeft: 15, fontWeight: 'bold', color: 'red'}}>
              Invalid username or password. Please try again.
            </Text>
          )}

          <View style={styles.mainFormContainer}>
            <View style={styles.formContainer}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Email or username
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
                  onChangeText={email => this.updateField({email: email})}
                />
              </View>
            </View>

            <View style={styles.formContainer}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Password
              </Text>
              <View style={styles.formBody}>
                <Icon
                  style={{marginLeft: 10}}
                  name="unlock-alt"
                  size={15}
                  color="#b9bec9"
                />
                <TextInput
                  style={styles.inputStyle}
                  autoCorrect={false}
                  secureTextEntry={true}
                  placeholder={'Enter new password'}
                  onChangeText={password =>
                    this.updateField({password: password})
                  }
                />
              </View>
            </View>
          </View>

          <Text
            onPress={() =>
              navigate('ForgotPasswordScreen', {
                navigation: navigate.navigate,
              })
            }
            style={styles.forgotPasswordButton}>
            {' '}
            Forgot Password?
          </Text>
        </View>

        <View style={{marginTop: '5%'}}>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <EcstaticButton
                buttonMarginTopScalor={0}
                buttonColor={this.state.buttonColor}
                isDisabled={this.state.isDisabled}
                buttonText={'Log In'}
                navigationScreen={'BetaHomeScreen'}
                navigation={this.props.navigation}
                onPressFunc={() => this.handleSubmit()}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: signUpMarginTopScalor,
              width: '100%',
              height: 50,
              justifyContent: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Text style={{color: '#798498', textAlign: 'center'}}>
              {' '}
              Already have an account?
            </Text>
            <Text
              onPress={() =>
                navigate('RegistrationScreenOne', {
                  navigation: navigate.navigate,
                })
              }
              style={{fontWeight: 'bold'}}>
              {' '}
              Sign Up
            </Text>
          </View>
        </View>

        {this.state.canNavigate && this._navigate()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  facebookBtnContainer: {
    alignItems: 'center',
    marginTop: '10%',
  },
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
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordButton: {
    marginLeft: 15,
    marginTop: 5,
    color: '#00b1f1',
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    marginLeft: 5,
  },
});

export default LoginScreen;

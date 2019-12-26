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

import RegistrationScreenTwo from './two.js';

import EcstaticButton from '../components/ecstaticButton.js';

import Icon from 'react-native-vector-icons/FontAwesome';

import {facebookService} from '../../services/Facebook.js';

import {LOCAL_SERVER} from '../../constants/localServer.js';
import {REMOTE_SERVER} from '../../constants/remoteServer.js';

import AsyncStorage from '@react-native-community/async-storage';

class RegistrationScreenOne extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextButtonColor: 'rgba(57,243,187, 0.5)',
      isAllFieldsFilled: false,
      email: '',
      password: '',
      confirmPassword: '',
      registrationErrors: null,
      isDisabled: true,
      profile: null,
      navigateTo: '',
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
      'isAllFieldsFilled',
      'registrationErrors',
      'nextButtonColor',
      'isDisabled',
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

  // We need to store the data on the disk in the event the user fills out the first registration
  // screen, but does not complete the enitre registration process. Doing this allows us to go
  // directly to the last registration screen when the app loads up.
  _storeData = async data => {
    try {
      await AsyncStorage.setItem('@email', data.email);
      // TODO passwords should be hashed!!!
      await AsyncStorage.setItem('@password', data.password);
      await AsyncStorage.setItem('@confirmedPassword', data.confirmPassword);
    } catch (e) {
      // saving error
    }
  };

  _storeOauthData = async data => {
    const userFirstName = data.userFirstName || data.user.first_name;
    const userId = data.userId || data.user.id;
    const giveawayId = data.giveawayId || data.give_away_id;

    try {
      await AsyncStorage.setItem('@userId', userId + '');
      await AsyncStorage.setItem('@isLoggedIn', 'true');
      await AsyncStorage.setItem('@giveawayId', giveawayId + '');
      await AsyncStorage.setItem('@userFirstName', userFirstName + '');
    } catch (e) {
      // saving error
    }
  };

  _loadData = async () => {
    const profile = await facebookService.fetchProfile();
    let userFirstName = '';

    if (profile) {
      this.setState({
        profile: profile,
        navigateTo: 'OauthGiveAwayVerificationScreen',
      });
      this.handleFaceBookOauthLogin(profile);
    }
  };

  handleFaceBookOauthLogin = facebookProfile => {
    fetch(`${REMOTE_SERVER}/api/users/oauth/${facebookProfile.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.data.user && !responseJson.data.errors) {
          this._storeOauthData(responseJson.data);

          this.setState({
            userId: responseJson.data.user.id,
            userFirstName: responseJson.data.user.first_name,
            navigateTo: 'BetaHomeScreen',
            canNavigate: true,
            loginHasErrors: false,
          });
        } else {
          this._createUserByFaceBookOauth(facebookProfile);
        }
      });
  };

  _createUserByFaceBookOauth = facebookProfile => {
    fetch(`${REMOTE_SERVER}/api/users/oauth/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        facebook_profile_id: facebookProfile.id,
        first_name: facebookProfile.name,
        image: facebookProfile.avatar,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        if (responseJson.data.user && !responseJson.data.errrors) {
          this.setState({
            navigateTo: 'OauthGiveAwayVerificationScreen',
            canNavigate: true,
            loginHasErrors: false,
            userId: responseJson.data.user.id,
          });
        } else {
          this.setState({
            loginHasErrors: true,
          });
        }
      });
  };

  _handleNavigation = navigate => {
    if (this.state.navigateTo === 'RegistrationScreenTwo') {
      navigate('RegistrationScreenTwo', {
        navigation: navigate,
        props: this.state,
      });
    } else if (this.state.navigateTo === 'OauthGiveAwayVerificationScreen') {
      navigate('OauthGiveAwayVerificationScreen', {
        userId: this.state.userId,
        navigation: this.props.navigation.navigate,
        userFirstName: this.state.userFirstName,
      });
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    const window = Dimensions.get('window');

    let logInMarginTopScalor = null;
    let nextButtonMarginTopScalor = null;
    let formHeightScalor = null;

    if (window.height > 748 && window.width > 384) {
      logInMarginTopScalor = '8%';
      nextButtonMarginTopScalor = 75;
      formHeightScalor = '12%';
    } else if (window.height > 592 && window.width > 384) {
      logInMarginTopScalor = '6%';
      nextButtonMarginTopScalor = 75;
      formHeightScalor = '12%';
    } else {
      logInMarginTopScalor = 10;
      nextButtonMarginTopScalor = 30;
      formHeightScalor = '10%';
    }

    return (
      <View>
        <Text
          style={{
            marginLeft: 5,
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Account Creation
        </Text>
        <View style={styles.facebookBtnContainer}>
          {facebookService.makeLoginButton(accessToken => {
            this._loadData();
          })}
        </View>
        <Text style={{marginTop: '3%', textAlign: 'center'}}>or</Text>

        <View style={styles.mainFormContainer}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Email</Text>
          <View style={styles.formContainer}>
            <Icon
              style={{marginLeft: 10}}
              name="envelope"
              size={15}
              color="#b9bec9"
            />
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              keyboardType={'email-address'}
              placeholder={'Enter your email address'}
              onChangeText={email => this.updateField({email: email})}
            />
          </View>

          <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
            Create Password
          </Text>
          <View style={styles.formContainer}>
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
              onChangeText={password => this.updateField({password: password})}
            />
          </View>

          <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
            Confirm Password
          </Text>
          <View style={styles.formContainer}>
            <Icon
              style={{marginLeft: 10, alignSelf: 'center'}}
              name="unlock-alt"
              size={15}
              color="#b9bec9"
            />
            <TextInput
              style={styles.inputStyle}
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={'Confirm new password'}
              onChangeText={confirmPassword =>
                this.updateField({confirmPassword: confirmPassword})
              }
            />
          </View>
        </View>

        <View>
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <EcstaticButton
                buttonMarginTopScalor={nextButtonMarginTopScalor}
                buttonColor={this.state.nextButtonColor}
                isDisabled={this.state.isDisabled}
                buttonText={'Next'}
                navigationScreen={'RegistrationScreenTwo'}
                navigation={this.props.navigation}
                onPressFunc={() => this._handleNavigation(navigate)}
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
  },
  formContainer: {
    width: '95%',
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

export default RegistrationScreenOne;

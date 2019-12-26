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

import EcstaticButton from '../components/ecstaticButton.js';

import LOCAL_SERVER from '../../constants/localServer.js';
import REMOTE_SERVER from '../../constants/remoteServer.js';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

export default class OauthGiveAwayVerificationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAllFieldsFilled: false,
      buttonColor: 'rgba(57,243,187, 0.5)',
      isDisabled: true,
      giveawayUuid: null,
      userId: null,
      hasErrors: null,
      canNavigate: false,
    };
  }

  componentDidMount() {
    const userId = this.props.navigation.state.params.userId;
    this.setState({userId: userId});
  }

  updateField = hash => {
    this.setState(hash);
    this._enableSumbitButton();
  };

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

  handleSubmit = () => {
    fetch(`${LOCAL_SERVER}/api/users/${this.state.userId}/giveaways`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        give_away_uuid: this.state.giveawayUuid,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        if (!responseJson.data.errors) {
          this._storeData(responseJson.data);

          this.setState({
            navigateTo: 'BetaHomeScreen',
            canNavigate: true,
            hasErrors: false,
            giveawayId: responseJson.data.giveawayId,
            userId: responseJson.data.userId,
          });
        } else {
          this.setState({
            hasErrors: true,
          });
        }
      });
  };

  _handleNavigation = () => {
    this.props.navigation.navigate('BetaHomeScreen', {
      navigation: this.props.navigation.navigate,
      giveawayId: this.state.giveawayId,
      userFirstName: this.state.userFirstName,
      userId: this.state.userId,
    });
  };

  _enableSumbitButton = () => {
    const fieldsNotToCheck = [
      'canNavigate',
      'isAllFieldsFilled',
      'hasErrors',
      'isDisabled',
      'userId',
    ];

    let requiredBlankFields = Object.keys(this.state).filter(
      key => !fieldsNotToCheck.includes(key) && this.state[key] == '',
    );

    console.log('requiredBlankFields: ' + requiredBlankFields);

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

  render() {
    return (
      <View style={styles.mainFormContainer}>
        <View style={{marginTop: '5%', justifyContent: 'center'}}>
          <Text>
            One last step! Please enter the invite code you received below.
          </Text>
        </View>

        {this.state.hasErrors && (
          <Text style={{marginLeft: 15, fontWeight: 'bold', color: 'red'}}>
            The invite code you entered is invalid. Please try again or contact
            us at help@getecstatic.com
          </Text>
        )}

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
              placeholder={'deef515d-8277-42fc-bda6-db568f13d2d8'}
              onChangeText={giveawayUuid =>
                this.updateField({giveawayUuid: giveawayUuid})
              }
            />
          </View>
        </View>

        <View style={{marginTop: '5%'}}>
          <View>
            <View style={{width: '95%'}}>
              <EcstaticButton
                buttonMarginTopScalor={0}
                buttonColor={this.state.buttonColor}
                isDisabled={this.state.isDisabled}
                buttonText={'Enter'}
                navigationScreen={'BetaHomeScreen'}
                navigation={this.props.navigation}
                onPressFunc={() => this.handleSubmit()}
              />
            </View>
          </View>
        </View>
        {this.state.canNavigate && this._handleNavigation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainFormContainer: {
    marginLeft: '5%',
    width: '95%',
  },
  formContainer: {
    marginTop: '5%',
    width: '95%',
    justifyContent: 'center',
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

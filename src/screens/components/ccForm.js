import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import RNPickerSelect from 'react-native-picker-select';

import LOCAL_SERVER from '../../constants/localServer.js';
import REMOTE_SERVER from '../../constants/remoteServer.js';

var countries = require('country-data').countries;

export default class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      isAllFieldsFilled: false,
      isSubmitButtonEnabled: false,
      submitButtonColor: 'rgba(57,243,187, 0.5)',
      ccNumber: '',
      expMonth: '',
      expYear: '',
      cvvNumber: '',
      zipCode: '',
      country: 'United States',

      hasSubmissionErrors: false,
      submissionErrors: '',
    };
  }

  componentDidMount() {
    this.getUserID();
  }

  renderCountries = () => {
    const arr = countries.all.map(c => c.name).sort();
    const uniqueCountries = new Set(arr);

    return [...uniqueCountries].map(c => ({label: c, value: c}));
  };

  getUserID = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');

      this.setState({
        userId: userId,
      });
    } catch (e) {
      console.log(err);
    }
  };

  updateField = hash => {
    this.setState(hash);
    this._enableSumbitButton(hash);
  };

  _enableSumbitButton = hash => {
    const fieldsNotToCheck = [
      'userId',
      'submitButtonColor',
      'isSubmitButtonEnabled',
      'isAllFieldsFilled',
      'submissionErrors',
    ];

    let currentKey = Object.keys(hash)[0];

    // Add current element to state for filter below for most up-to-date info
    this.state[currentKey] = hash[currentKey];

    let requiredBlankFields = Object.keys(this.state).filter(
      key => !fieldsNotToCheck.includes(key) && this.state[key] == '',
    );

    if (requiredBlankFields.length == 0 && this.allFieldLengthsVerfied(hash)) {
      this.setState({
        isAllFieldsFilled: true,
        submitButtonColor: '#39f3bb',
        isSubmitButtonEnabled: false,
      });
    } else {
      this.setState({
        isAllFieldsFilled: false,
        submitButtonColor: 'rgba(57,243,187, 0.5)',
        isSubmitButtonEnabled: true,
      });
    }
  };

  allFieldLengthsVerfied = hash => {
    const minFieldLengths = {
      ccNumber: 10,
      expMonth: 1,
      expYear: 4,
      cvvNumber: 3,
      zipCode: 5,
    };

    let currentKey = Object.keys(hash)[0];

    // Add current element to state for filter below for most up-to-date info
    this.state[currentKey] = hash[currentKey];

    if (
      this.state.ccNumber.length >= minFieldLengths.ccNumber &&
      this.state.expMonth.length >= minFieldLengths.expMonth &&
      this.state.expYear.length >= minFieldLengths.expYear &&
      this.state.cvvNumber.length >= minFieldLengths['cvvNumber'] &&
      this.state.zipCode.length >= minFieldLengths.zipCode
    ) {
      return true;
    } else {
      return false;
    }
  };

  _renderCardNumberField = () => {
    return (
      <View style={{marginTop: 15}}>
        <Text style={styles.formLabel}>Card Number</Text>
        <View style={styles.formContainer}>
          <Icon
            style={{marginLeft: 10}}
            name="credit-card"
            size={15}
            color="#b9bec9"
          />
          <TextInput
            allowFontScaling={true}
            keyboardType={'number-pad'}
            autoCompleteType={'cc-number'}
            style={styles.inputStyle}
            autoCorrect={false}
            placeholder={'1234'}
            returnKeyType={'done'}
            onChangeText={ccNumber => this.updateField({ccNumber: ccNumber})}
          />
        </View>
      </View>
    );
  };

  _renderEXPAndYearFields = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={styles.formLabel}>Exp. Month</Text>
          <View style={Object.assign({}, styles.formContainer, {width: '95%'})}>
            <TextInput
              allowFontScaling={true}
              maxLength={2}
              keyboardType={'number-pad'}
              autoCompleteType={'cc-exp'}
              style={{marginLeft: 5, width: '100%'}}
              autoCorrect={false}
              placeholder={'MM'}
              returnKeyType={'done'}
              onChangeText={expMonth => this.updateField({expMonth: expMonth})}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.formLabel}>Exp. Year</Text>
          <View
            style={Object.assign({}, styles.formContainer, {width: '100%'})}>
            <TextInput
              allowFontScaling={true}
              maxLength={4}
              keyboardType={'number-pad'}
              returnKeyType={'done'}
              autoCompleteType={'cc-csc'}
              style={{marginLeft: 5, width: '100%'}}
              autoCorrect={false}
              placeholder={'2020'}
              onChangeText={expYear => this.updateField({expYear: expYear})}
            />
          </View>
        </View>
      </View>
    );
  };

  _renderCVVField = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 25,
          width: '47.5%',
          marginTop: 15,
        }}>
        <Text style={styles.formLabel}>CVV</Text>
        <View style={styles.formContainer}>
          <TextInput
            allowFontScaling={true}
            maxLength={4}
            keyboardType={'number-pad'}
            autoCompleteType={'cc-csc'}
            style={{marginLeft: 5, width: '100%'}}
            autoCorrect={false}
            placeholder={'123'}
            returnKeyType={'done'}
            onChangeText={cvvNumber => this.updateField({cvvNumber: cvvNumber})}
          />
        </View>
      </View>
    );
  };

  _renderCountryField = () => {
    return (
      <View style={{width: '100%'}}>
        <Text style={styles.formLabel}>Country</Text>
        <RNPickerSelect
          placeholder={{
            label: 'United States',
            value: 'United States',
          }}
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 10,
              right: 12,
            },
          }}
          onValueChange={value => console.log(value)}
          items={this.renderCountries()}
          textInputProps={{
            marginLeft: 10,
            color: 'black',
          }}
          Icon={() => {
            return <Icon name="md-arrow-down" size={24} color="#b9bec9" />;
          }}
        />
      </View>
    );
  };

  _renderZipCodeField = () => {
    return (
      <View style={{marginTop: 15}}>
        <Text style={styles.formLabel}>Zip Code</Text>
        <View style={styles.formContainer}>
          <TextInput
            allowFontScaling={true}
            maxLength={5}
            keyboardType={'number-pad'}
            autoCompleteType={'cc-number'}
            style={styles.inputStyle}
            autoCorrect={false}
            returnKeyType={'done'}
            onChangeText={zipCode => this.updateField({zipCode: zipCode})}
          />
        </View>
      </View>
    );
  };

  handleSubmit = () => {
    fetch(`${LOCAL_SERVER}/api/users/${this.state.userId}/payments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ccNumber: this.state.ccNumber,
        expMonth: this.state.expMonth,
        expYear: this.state.expYear,
        cvvNumber: this.state.cvvNumber,
        country: this.state.country,
        zipCode: this.state.zipCode,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.isValid === true) {
          return this.props.navigation.navigate('UserPaymentsScreen', {
            navigation: this.props.navigation.navigate,
          });
        } else {
          this.setState({
            hasSubmissionErrors: true,
            submissionErrors: responseJson.data.error,
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasSubmissionErrors && (
          <View style={{alignItems: 'center'}}>
            <Text> {this.state.submissionErrors} </Text>
          </View>
        )}
        {this._renderCardNumberField()}
        {this._renderEXPAndYearFields()}
        {this._renderCVVField()}
        {this._renderCountryField()}
        {this._renderZipCodeField()}

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => this.handleSubmit()}
            disabled={this.isSubmitButtonEnabled}
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: this.state.submitButtonColor,
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Save </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    width: '95%',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'red',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    alignItems: 'center',
  },
  formLabel: {
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    width: '100%',
    marginLeft: 10,
    alignSelf: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOSContainer: {
    marginLeft: -10,
    justifyContent: 'flex-start',
  },
  inputIOS: {
    height: 50,
    borderRadius: 10,
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  inputAndroid: {
    borderRadius: 10,
    height: 50,
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

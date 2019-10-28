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

import {IP_ADDRESS} from '../../constants/constants.js';

var countries = require('country-data').countries;

export default class AddUserCreditCard extends React.Component {
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

      hasCCNumberError: false,
      hasexpMonthError: false,
      hasEXPYearError: false,
      hasZipCodeError: false,
      hasCVVNumberError: false,

      hasSubmissionErrors: false,
      submissionErrors: '',
    };
  }

  componentDidMount() {
    this.getUserID();
  }

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
      'submitButtonColor',
      'isSubmitButtonEnabled',
      'isAllFieldsFilled',
      'hasCCNumberError',
      'hasexpMonthError',
      'hasEXPYearError',
      'hasZipCodeError',
      'hasCVVNumberError',
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

  verifyFieldLength = hash => {
    const minFieldLengths = {
      ccNumber: 10,
      expMonth: 1,
      expYear: 4,
      cvvNumber: 3,
      zipCode: 5,
    };

    const errorKeys = {
      ccNumber: 'hasCCNumberError',
      expMonth: 'hasexpMonthError',
      expYear: 'hasEXPYearError',
      cvvNumber: 'hasCVVNumberError',
      zipCode: 'hasZipCodeError',
    };

    let currentKey = Object.keys(hash)[0];
    let currentValue = this.state[currentKey];

    result = {};

    if (currentValue.length < minFieldLengths[currentKey]) {
      result[errorKeys[currentKey]] = true;
      this.setState(result);
      return true;
    } else {
      result[errorKeys[currentKey]] = false;
      this.setState(result);
      return false;
    }
  };

  _renderCardNumberField = () => {
    return (
      <View>
        <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
          Card Number
        </Text>
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
            onChangeText={ccNumber => this.updateField({ccNumber: ccNumber})}
            onEndEditing={ccNumber =>
              this.verifyFieldLength({ccNumber: ccNumber})
            }
          />
        </View>
        {this.state.hasCCNumberError && (
          <Text>Card length must be a minimum of 10 digits</Text>
        )}
      </View>
    );
  };

  _renderEXPAndYearFields = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Exp. Month</Text>
          <View style={Object.assign({}, styles.formContainer, {width: '95%'})}>
            <TextInput
              allowFontScaling={true}
              maxLength={4}
              keyboardType={'number-pad'}
              autoCompleteType={'cc-exp'}
              style={{marginLeft: 5}}
              autoCorrect={false}
              placeholder={'MM'}
              onChangeText={expMonth => this.updateField({expMonth: expMonth})}
              onEndEditing={expMonth =>
                this.verifyFieldLength({expMonth: expMonth})
              }
            />
          </View>
          {this.state.hasexpMonthError && (
            <Text>Exp. date must be a minimum of 4 digits</Text>
          )}
        </View>

        <View style={{flex: 1}}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Exp. Year</Text>
          <View
            style={Object.assign({}, styles.formContainer, {width: '100%'})}>
            <TextInput
              allowFontScaling={true}
              maxLength={4}
              keyboardType={'number-pad'}
              autoCompleteType={'cc-csc'}
              style={{marginLeft: 5}}
              autoCorrect={false}
              placeholder={'2020'}
              onChangeText={expYear => this.updateField({expYear: expYear})}
              onEndEditing={expYear =>
                this.verifyFieldLength({expYear: expYear})
              }
            />
          </View>
          {this.state.hasEXPYearError && (
            <Text>Exp. yeah must be a minimum of 4 digits</Text>
          )}
        </View>
      </View>
    );
  };

  _renderCVVField = () => {
    return (
      <View
        style={{
          flex: 1,
          width: '47.5%',
          marginTop: 10,
        }}>
        <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>CVV</Text>
        <View style={styles.formContainer}>
          <TextInput
            allowFontScaling={true}
            maxLength={4}
            keyboardType={'number-pad'}
            autoCompleteType={'cc-csc'}
            style={{marginLeft: 5}}
            autoCorrect={false}
            placeholder={'123'}
            onChangeText={cvvNumber => this.updateField({cvvNumber: cvvNumber})}
          />
        </View>
        {this.state.hasCVVNumberError && (
          <Text>cvv number must be a minimum of 3 digits</Text>
        )}
      </View>
    );
  };

  _renderCountryField = () => {
    return (
      <View>
        <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Country</Text>
        <View style={styles.formContainer}>
          <Picker
            selectedValue={this.state.country}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            selectedValue={'United States'}
            onValueChange={(countryName, itemIndex) =>
              this.setState({country: countryName})
            }>
            {countries.all.map(c => (
              <Picker.Item
                style={{alignSelf: 'center'}}
                label={c.name}
                value={c.name}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  };

  _renderZipCodeField = () => {
    return (
      <View>
        <Text style={{marginTop: 10, paddingBottom: 5, fontWeight: 'bold'}}>
          Zip Code
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            allowFontScaling={true}
            maxLength={5}
            keyboardType={'number-pad'}
            autoCompleteType={'cc-number'}
            style={styles.inputStyle}
            autoCorrect={false}
            onChangeText={zipCode => this.updateField({zipCode: zipCode})}
          />
        </View>
        {this.state.hasZipCodeError && (
          <Text>zip code must be a minimum of 5 digits</Text>
        )}
      </View>
    );
  };

  handleSubmit = () => {
    fetch(`http://${IP_ADDRESS}:4000/api/users/${this.state.userId}/payments`, {
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
              height: 30,
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
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 10,
    alignItems: 'center',
  },
  inputStyle: {
    flex: 1,
    width: '100%',
    marginLeft: 10,
    alignSelf: 'center',
  },
});

import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddUserCreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _rendeCardNumberField = () => {
    return (
      <View>
        <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
          Card Number
        </Text>
        <View style={styles.formContainer}>
          <Icon
            style={{marginLeft: 10, alignSelf: 'center'}}
            name="credit-card"
            size={15}
            color="#b9bec9"
          />
          <TextInput
            keyboardType={'number-pad'}
            autoCompleteType={'cc-number'}
            style={styles.inputStyle}
            autoCorrect={false}
            placeholder={'1234'}
          />
        </View>
      </View>
    );
  };

  _renderEXPAndCVVNameFields = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          marginTop: 15,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Exp. Date</Text>
          <View style={styles.formContainer}>
            <TextInput
              keyboardType={'number-pad'}
              autoCompleteType={'cc-exp'}
              style={{marginLeft: 5, width: '45%'}}
              autoCorrect={false}
              placeholder={'MM/YY'}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>CVV</Text>
          <View style={styles.formContainer}>
            <TextInput
              keyboardType={'number-pad'}
              autoCompleteType={'cc-csc'}
              style={{marginLeft: 5}}
              autoCorrect={false}
              placeholder={'123'}
            />
          </View>
        </View>
      </View>
    );
  };

  _renderCountryField = () => {
    return (
      <View>
        <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
          Country
        </Text>
        <View style={styles.formContainer}>
          <Icon
            style={{marginLeft: 10, alignSelf: 'center'}}
            name="flag"
            size={15}
            color="#b9bec9"
          />
          <TextInput
            textContentType={'countryName'}
            style={styles.inputStyle}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  _renderZipCodeField = () => {
    return (
      <View>
        <Text style={{marginTop: 15, paddingBottom: 5, fontWeight: 'bold'}}>
          Zip Code
        </Text>
        <View style={styles.formContainer}>
          <TextInput
            keyboardType={'number-pad'}
            autoCompleteType={'cc-number'}
            style={styles.inputStyle}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._rendeCardNumberField()}
        {this._renderEXPAndCVVNameFields()}
        {this._renderCountryField()}
        {this._renderZipCodeField()}

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#39f3bb',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}> Save </Text>
          </View>
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
  header: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingBottom: 10,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  formContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 5,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
  },
});

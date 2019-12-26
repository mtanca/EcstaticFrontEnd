import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {LOCAL_SERVER} from '../../constants/localServer.js';
import {REMOTE_SERVER} from '../../constants/localServer.js';

import AsyncStorage from '@react-native-community/async-storage';

import {FormattedCurrency} from 'react-native-globalize';

const moment = require('moment');

const noPaymentHistory = require('../../assets/no-payment-history.png');
const visaLogo = require('../../assets/visa-logo.png');

export default class UserPaymentHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPaymentHistoryData: null,
    };
  }

  componentDidMount() {
    this._fetchUserPaymentHistory();
  }

  _fetchUserPaymentHistory = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`${REMOTE_SERVER}/api/users/${userId}/payments_history`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data.paymentHistory);
          console.log(responseJson.data.paymentHistory);
          const paymentHistory = responseJson.data.paymentHistory;
          this.setState({
            userPaymentHistoryData:
              paymentHistory.length === 0 ? false : paymentHistory,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _renderNoPaymentHistory = () => {
    return (
      <View style={styles.container}>
        <Image source={noPaymentHistory} />
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>No Payments</Text>
          <Text style={{marginTop: 10, textAlign: 'center', color: '#798498'}}>
            Haven’t made a purchase yet? No problem. Make a purchase at your own
            time.
          </Text>
        </View>
      </View>
    );
  };

  _renderCardBrand = brand => {
    if (brand === 'Visa') {
      return <Image source={visaLogo} style={{marginLeft: 10}} />;
    } else {
      return (
        <Icon
          style={{marginLeft: 10}}
          name="shopping-bag"
          size={15}
          color="black"
        />
      );
    }
  };

  _renderPaymentHistory = () => {
    return (
      <ScrollView>
        {this.state.userPaymentHistoryData.map(paymentHistory => (
          <View
            style={{
              alignItems: 'center',
              height: 40,
              flexDirection: 'row',
              flexWrap: 'wrap',
              borderWidth: 1,
              borderTopColor: 'rgba(0, 0, 0, 0.05)',
              borderLeftColor: 'white',
              borderRightColor: 'white',
              borderBottomColor: 'rgba(0, 0, 0, 0.05)',
            }}>
            {this._renderCardBrand(paymentHistory.card_brand)}
            <Text style={{marginLeft: 20, fontWeight: 'bold'}}>
              {moment.unix(paymentHistory.created).format('MMM Do')} {'\n'}
              {paymentHistory.brand} {paymentHistory.card_last4}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
                marginLeft: '5%',
              }}>
              <Text style={{fontWeight: 'bold'}}>
                ${(paymentHistory.amount / 100).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  _renderLoading = () => {
    return (
      <View style={{flex: 1}}>
        <LottieView
          source={require('../../assets/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  _renderScreen = () => {
    if (this.state.userPaymentHistoryData === null) {
      return this._renderLoading();
    } else if (this.state.userPaymentHistoryData === false) {
      return this._renderNoPaymentHistory();
    } else {
      return this._renderPaymentHistory();
    }
  };

  render() {
    return this._renderScreen();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  navigation: {
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    justifyContent: 'flex-end',
  },
});

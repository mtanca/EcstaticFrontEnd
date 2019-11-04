import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserSection from '../components/userSection.js';

import UserPaymentHistoryScreen from './paymentHistory.js';
import CreditCardForm from '../components/ccForm.js';
import UserNavigationBar from '../components/userNavigationBar';

import {IP_ADDRESS} from '../../constants/constants.js';

import AsyncStorage from '@react-native-community/async-storage';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const visaLogo = require('../../assets/visa-logo.png');
const amexLogo = require('../../assets/amex.png');
const discoverLogo = require('../../assets/discover.png');
const dinersClubLogo = require('../../assets/dinersClub.png');
const jcbLogo = require('../../assets/jcb.png');

export default class UserPaymentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userPaymentData: null,
      userDefaultPaymentData: null,
    };
  }

  componentDidMount() {
    this._fetchUserPaymentData();
  }

  _fetchUserPaymentData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`http://${IP_ADDRESS}:4000/api/users/${userId}/payments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data.cards);
          this.setState({
            userPaymentData: responseJson.data.cards,
            userDefaultPaymentData: responseJson.data.defaultCard,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View
          style={styles.userInfo}
          onLayout={event => this.measureView(event)}>
          <UserSection hasData={null} data={null} />
        </View>
        {this.state.userSectionWidthOffset && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={{
                fontWeight: 'bold',
                fontSize: 40,
                // offset the text by the width of the userSection
                marginLeft: this.state.userSectionWidthOffset * -1,
              }}>
              Payment
            </Text>
          </View>
        )}
      </View>
    );
  };

  measureView(event) {
    this.setState({
      userSectionWidthOffset: event.nativeEvent.layout.width,
    });
  }

  _renderNoDefaultPayment = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('UserPaymentHistoryScreen', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          marginTop: 10,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon
          style={{marginLeft: 10}}
          name="credit-card"
          size={20}
          color="black"
        />
        <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold'}}>
          No card on default
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginLeft: '5%',
          }}
        />
      </TouchableOpacity>
    );
  };

  _renderDefaultCard = () => {
    const defaultCard = this.state.userDefaultPaymentData;
    const navigationScreen = 'CreditCardForm';
    if (defaultCard) {
      return this._renderPaymentInformation(navigationScreen, defaultCard);
    } else {
      return this._renderNoDefaultPayment();
    }
  };

  _renderCardBrand = brand => {
    const brandsLogoMapper = {
      Visa: visaLogo,
      'American Express': amexLogo,
      Discover: discoverLogo,
    };

    const logo = brandsLogoMapper[brand];

    if (logo) {
      return <Image source={logo} style={{marginLeft: 10}} />;
    } else {
      return (
        <Icon
          style={{marginLeft: 10}}
          name="shopping-bag"
          size={20}
          color="black"
        />
      );
    }
  };

  // Make into component
  _renderPaymentInformation = (navigationScreen, paymentMethod) => {
    return (
      <GestureRecognizer onSwipeLeft={this.onSwipeLeft}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(navigationScreen, {
              navigation: this.props.navigation.navigate,
            })
          }
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            alignItems: 'center',
            height: 50,
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.05)',
            borderLeftColor: 'white',
            borderRightColor: 'white',
            borderBottomColor: 'rgba(0, 0, 0, 0.05)',
          }}>
          {this._renderCardBrand(paymentMethod.brand)}
          <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 15}}>
            {paymentMethod.brand} {paymentMethod.last4}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              marginLeft: '5%',
            }}>
            <Icon
              style={{marginLeft: 10}}
              name="chevron-right"
              size={20}
              color="#798498"
            />
          </View>
        </TouchableOpacity>
      </GestureRecognizer>
    );
  };

  _renderUserPaymentMethods = () => {
    const navigationScreen = 'CreditCardForm';
    return (
      <View>
        {this.state.userPaymentData &&
          this.state.userPaymentData.map(paymentMethod =>
            this._renderPaymentInformation(navigationScreen, paymentMethod),
          )}
        {this._renderAddCard()}
      </View>
    );
  };

  _renderAddCard = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('CreditCardForm', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon style={{marginLeft: 15}} name="plus" size={20} color="#0076ff" />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 15,
            color: '#0076ff',
            fontWeight: 'bold',
          }}>
          Add Card
        </Text>
      </TouchableOpacity>
    );
  };

  _renderUserPaymentHistory = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('UserPaymentHistoryScreen', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          marginTop: 10,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon
          style={{marginLeft: 10}}
          name="shopping-bag"
          size={20}
          color="black"
        />
        <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold'}}>
          Payment History
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginLeft: '5%',
          }}>
          <Icon
            style={{marginLeft: 10}}
            name="chevron-right"
            size={20}
            color="#798498"
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderOne = () => {
    return (
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          marginBottom: 10,
        }}>
        <Text
          adjustsFontSizeToFit={true}
          allowFontScaling={true}
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Payment Default
        </Text>
      </View>
    );
  };

  _renderTwo = () => {
    return (
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          marginBottom: 10,
        }}>
        <Text
          adjustsFontSizeToFit={true}
          allowFontScaling={true}
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Payment Methods
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        {this._renderOne()}

        {this._renderDefaultCard()}

        {this._renderTwo()}

        {this._renderUserPaymentMethods()}

        <View style={{marginTop: '5%'}}>
          {this._renderUserPaymentHistory()}
        </View>

        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <UserNavigationBar navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: '5%',
    flexDirection: 'row',
    borderWidth: 1,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  userInfo: {
    marginLeft: 10,
  },
});

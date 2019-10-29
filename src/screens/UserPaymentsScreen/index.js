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
import AddUserCreditCardScreen from './addCreditCard.js';

import {IP_ADDRESS} from '../../constants/constants.js';

import AsyncStorage from '@react-native-community/async-storage';

const visaLogo = require('../../assets/visa-logo.png');

export default class UserPaymentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userPaymentData: null,
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

  renderNavigationBar = () => {
    return (
      <View style={styles.navigation}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('GiveAwayShowScreen', {
                navigation: this.props.navigation.navigate,
                // FIX ME!!!
                giveaway: 1,
              })
            }
            style={{flex: 1, alignItems: 'center'}}>
            <Icon name="home" size={30} color="#1E1E1E" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserPaymentsScreen', {
                  navigation: this.props.navigation.navigate,
                  userId: 1,
                })
              }
              style={{flex: 1, alignItems: 'center'}}>
              <Icon name="credit-card" size={30} color="#1E1E1E" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="comments" size={30} color="#1E1E1E" />
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            height: 5,
            width: '45%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  _renderDefaultCard = () => {
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

  _renderCardBrand = brand => {
    if (brand === 'Visa') {
      return <Image source={visaLogo} style={{marginLeft: 10}} />;
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

  _renderUserPaymentMethods = () => {
    return (
      <View>
        {this.state.userPaymentData &&
          this.state.userPaymentData.map(paymentMethod => (
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
          ))}
        {this._renderAddCard()}
      </View>
    );
  };

  _renderAddCard = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('AddUserCreditCardScreen', {
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
          {this.renderNavigationBar()}
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
  userInfo: {
    marginLeft: 10,
  },
});

import React from 'react';

import {Text} from 'react-native';

import {LOCAL_SERVER, REMOTE_SERVER} from '../../constants/constants.js';

import AsyncStorage from '@react-native-community/async-storage';

export default class EditDefaultCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPaymentData: null,
      userDefaultPaymentData: null,
    };
  }

  componentWillMount() {
    this._fetchUserPaymentData();
  }

  _fetchUserPaymentData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`${REMOTE_SERVER}/api/users/${userId}/payments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          const defaultCard = responseJson.data.defaultCard;

          console.log(responseJson.data.cards);
          this.setState({
            userPaymentData: responseJson.data.cards,
            userDefaultPaymentData: defaultCard === [] ? false : defaultCard,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  render() {
    return <Text> EDIT DEFAULT CARD PAGE </Text>;
  }
}

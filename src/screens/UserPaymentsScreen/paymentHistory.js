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
const noPaymentHistpry = require('../../assets/no-payment-history.png');

export default class UserPaymentHistoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userPaymentData: null,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={noPaymentHistpry} />
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

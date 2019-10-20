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

import AsyncStorage from '@react-native-community/async-storage';

const commentTextSVG = require('../../assets/comment_text.svg');
const creditCardSVG = require('../../assets/credit_card.svg');
const homeSVG = require('../../assets/home_vs.svg');
const ninja = require('../../assets/Ninja.png');

import UserSection from '../components/userSection.js';

import {IP_ADDRESS} from '../../constants/constants.js';

export default class BetaHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userGiveAwayData: null,
    };
  }

  componentDidMount() {
    this._fetchUserGiveAwayData();
  }

  measureView(event) {
    this.setState({
      userSectionWidthOffset: event.nativeEvent.layout.width,
    });
  }

  navigationBar = () => {
    return (
      <View style={styles.navigation}>
        <View style={{width: '60%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('GiveAwayShowScreen', {
                hello: this.props.navigation.navigate,
                giveaway: 1,
              })
            }
            style={{flex: 1, alignItems: 'center'}}>
            <Icon name="home" size={30} color="#1E1E1E" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="credit-card" size={30} color="#1E1E1E" />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="comments" size={30} color="#1E1E1E" />
          </View>
        </View>
      </View>
    );
  };

  /**
   * Fetches the user's giveaway list
   */
  _fetchUserGiveAwayData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`http://${IP_ADDRESS}:4000/api/users/${userId}/giveaways`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            userGiveAwayData: responseJson.data.userGiveAways,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View onLayout={event => this.measureView(event)}>
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
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  // offset the text by the width of the userSection
                  marginLeft: this.state.userSectionWidthOffset * -1,
                }}>
                HOME
              </Text>
            </View>
          )}
        </View>
        {this.navigationBar()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

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

const commentTextSVG = require('../../assets/comment_text.svg');
const creditCardSVG = require('../../assets/credit_card.svg');
const homeSVG = require('../../assets/home_vs.svg');
const ninja = require('../../assets/Ninja.png');

import UserSection from '../components/userSection.js';

export default class BetaHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
    };
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

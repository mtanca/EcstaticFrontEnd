import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import Swiper from 'react-native-swiper'
import Dimensions from 'Dimensions';

import LoginScreen from '../LoginScreen';
import RegistrationScreen from '../RegistrationScreen';
import IntroOnBoardScreenTemplate from './template.js'

const styles = StyleSheet.create({
  wrapper: {},
  slides: {
    flex: 1,
    alignItems: 'center',
  },
  signOrLogin: {
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  }
})

const ecstaticLogo = require('../../assets/logo-mark.png')
const ecstaticFontBlack = require('../../assets/logo-font-black.png')

const ecstaticWinners = require('../../assets/winners.png')
const ecstaticPrizes = require('../../assets/prizes.png')
const ecstaticPeople = require('../../assets/people-map.png')

class IntroOnBoardScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    const dotsScalorForScreen = window.height > 592 && window.width > 384 ? window.height * 0.75 : window.height * 0.81
    const loginMarginScalorForScreen = window.height > 592 && window.width > 384 ? 75 : 0

    return(
      <View>
        <View style={{marginLeft: window.width / 4.5, marginTop: (0.1 * window.height), flexDirection:'row', flexWrap:'wrap'}}>
          <Image
              source={ecstaticLogo}
              style={{width: 25, height: 25}}
            />
          <Image
              source={ecstaticFontBlack}
              style={{marginLeft: 10, height: 25}}
            />
        </View>
        <View style={{ position: 'absolute' }}>
          <Swiper
          showsButtons={false}
          loop={false}
          showsPagination={true}
          activeDotColor="#3FF1BF"
          height={dotsScalorForScreen}
          width={window.width}
          >
          <IntroOnBoardScreenTemplate
            navigation={navigate}
            style={styles.slides}
            image={ecstaticWinners}
            mainText="Win exclusive experiences to meet your favorite stars"
            subText="Want to have the opportunity to meet your favorite stars? Support them by buying a pack and this could be you like our other fans!"
          />
          <IntroOnBoardScreenTemplate
            navigation={navigate}
            style={styles.slides}
            image={ecstaticPrizes}
            mainText="Beyond exclusive experiences, everyone’s still a winner"
            subText="When you purchase a pack, everyone is guaranteed to win prizes ranging from common stickers to exclusive items signed by the individual."
          />
            <IntroOnBoardScreenTemplate
              navigation={navigate}
              style={styles.slides}
              image={ecstaticPeople}
              mainText="Join the fun with fans all across the world"
              subText="Connect with fans everywhere in a wide range of ways. You can chat with other fans, exchange prizes in the aftermarket, explore media content, and more."
            />
        </Swiper>

          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => navigate("RegistrationScreen", {navigation: navigate.navigate})}
              title="Sign Up"
              color="#3FF1BF"
            />
          </View>
          <View style={styles.signOrLogin}>
            <Text style= {{color: "#798498", textAlign: 'center', marginTop: loginMarginScalorForScreen}}> Already have an account?</Text>
            <Text
              onPress={() => navigate("LoginScreen", {navigation: navigate.navigate})}
              style={{fontWeight: 'bold'}}
            > Log In
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreen

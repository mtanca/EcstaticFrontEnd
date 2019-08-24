import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import Swiper from 'react-native-swiper'
import Dimensions from 'Dimensions';

import LoginScreen from '../LoginScreen';
import RegistrationScreen from '../RegistrationScreen';
import IntroOnBoardScreenOne from './one.js'
import IntroOnBoardScreenTwo from './two.js'
import IntroOnBoardScreenThree from './three.js'

const styles = StyleSheet.create({
  wrapper: {},
  slides: {
    flex: 1,
    alignItems: 'center',
  },
  signOrLogin: {
    marginTop: 20,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const ecstaticLogo = require('../../assets/logo-mark.png')
const ecstaticFontBlack = require('../../assets/logo-font-black.png')

class IntroOnBoardScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    return(
      <View>
        <View style={{marginLeft: window.width / 4.5, marginTop: 60, flexDirection:'row', flexWrap:'wrap'}}>
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
          height={window.height - 140}
          width={window.width}
          >
            <IntroOnBoardScreenOne navigation={navigate} style={styles.slides}/>
            <IntroOnBoardScreenTwo navigation={navigate} style={styles.slides}/>
            <IntroOnBoardScreenThree navigation={navigate} style={styles.slides}/>
        </Swiper>

          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => navigate("RegistrationScreen", {navigation: navigate.navigate})}
              title="Sign Up"
              color="#3FF1BF"
            />
          </View>
          <View style={styles.signOrLogin}>
            <Text style= {{color: "#798498", textAlign: 'center'}}> Already have an account?</Text>
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

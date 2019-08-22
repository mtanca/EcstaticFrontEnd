import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import Swiper from 'react-native-swiper'

import Dimensions from 'Dimensions';


import LoginScreen from '../LoginScreen';
import RegistrationScreen from '../RegistrationScreen';
import IntroOnBoardScreenOne from './one.js'

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

class IntroOnBoardScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  getWidth() {
    return Dimensions.get('window').width;
  }

  render() {
    // const {navigate} = this.props.navigation;
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    return(

      <View style={{ position: 'absolute' }}>
        <Swiper
        showsButtons={false}
        loop={false}
        showsPagination={true}
        activeDotColor="#3FF1BF"
        height={window.height - 175}
        width={window.width}
        >
          <IntroOnBoardScreenOne navigation={navigate} style={styles.slide1}/>
          <View style={styles.slide2}>
            <Text>Hello Swiper</Text>
          </View>
          <View style={styles.slide3}>
          <Text>Hello Swiper</Text>
          </View>
        </Swiper>

        <View style={{alignItems: 'center'}}>
          <Button
            onPress={() => navigate("LoginScreen", {navigation: navigate.navigate})}
            title="Sign Up"
            color="#3FF1BF"
          />
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreen

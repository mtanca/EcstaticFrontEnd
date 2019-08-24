import React from "react";
import {View, Text} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import MainScreen from '../MainScreen';
import LoginScreen from '../LoginScreen'
import SplashScreen from '../SplashScreen'

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this._signOut = this._signOut.bind(this)
  }

  _signOut = (navigate) => {
    AsyncStorage.removeItem('@isLoggedIn')
    AsyncStorage.removeItem('@userId')

    this.props.navigation.navigate("SplashScreen", {navigation: this.props.navigation.navigate})
  }

  render() {
    const {navigate} = this.props.navigation;

    return(
      <View>
        <Text onPress={() => this._signOut()}>
          THIS IS THE HOME PAGE! PRESS HERE TO SIGN OUT
        </Text>
      </View>
    )
  }
}

export default HomeScreen

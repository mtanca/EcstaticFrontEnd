import React from "react";
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import SplashScreen from './src/screens/SplashScreen';
import IntroOnBoardScreen from './src/screens/IntroOnBoardScreen';
import IntroOnBoardScreenOne from './src/screens/IntroOnBoardScreen/one.js';


import {View} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen, navigationOptions: {header: null, headerLeft: null}},
  MainScreen: {screen: MainScreen, navigationOptions: {header: null, headerLeft: null}},
  IntroOnBoardScreen: {screen: IntroOnBoardScreen, navigationOptions: {header: null, headerLeft: null}},
  IntroOnBoardScreenOne: {screen: IntroOnBoardScreenOne, navigationOptions: {header: null, headerLeft: null}},

  LoginScreen: {screen: LoginScreen},
  RegistrationScreen: {screen: RegistrationScreen},
});

 export default createAppContainer(AppNavigator);

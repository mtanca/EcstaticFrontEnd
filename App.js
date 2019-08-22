import React from "react";
import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';


import {View} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";

const AppNavigator = createStackNavigator({
  MainScreen: {screen: MainScreen},
  LoginScreen: {screen: LoginScreen}
});

 export default createAppContainer(AppNavigator);

import React from 'react';

import MainScreen from './src/screens/MainScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreenOne from './src/screens/RegistrationScreen';
import RegistrationScreenTwo from './src/screens/RegistrationScreen/two.js';
import SplashScreen from './src/screens/SplashScreen';
import IntroOnBoardScreen from './src/screens/IntroOnBoardScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import GiveAwayShowScreen from './src/screens/GiveAwayShowScreen';
import BetaHomeScreen from './src/screens/BetaHomeScreen';
import UserPaymentsScreen from './src/screens/UserPaymentsScreen';
import UserPaymentHistoryScreen from './src/screens/UserPaymentsScreen/paymentHistory.js';
import CreditCardForm from './src/screens/components/ccForm.js';
import UserProfileScreen from './src/screens/UserProfileScreen';
import EditDefaultCardScreen from './src/screens/UserPaymentsScreen/editDefaultCard.js';

import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

console.disableYellowBox = true;

const AppNavigator = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  GiveAwayShowScreen: {
    screen: GiveAwayShowScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  IntroOnBoardScreen: {
    screen: IntroOnBoardScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {headerStyle: {backgroundColor: '#fff', elevation: 0}},
  },
  RegistrationScreenOne: {
    screen: RegistrationScreenOne,
    navigationOptions: {headerStyle: {backgroundColor: '#fff', elevation: 0}},
  },
  RegistrationScreenTwo: {
    screen: RegistrationScreenTwo,
    navigationOptions: {headerStyle: {backgroundColor: '#fff', elevation: 0}},
  },
  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen,
    navigationOptions: {headerStyle: {backgroundColor: '#fff', elevation: 0}},
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
      headerStyle: {backgroundColor: '#fff', elevation: 0},
    },
  },
  BetaHomeScreen: {
    screen: BetaHomeScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  UserPaymentsScreen: {
    screen: UserPaymentsScreen,
    navigationOptions: {header: null, headerLeft: null},
  },
  UserPaymentHistoryScreen: {
    screen: UserPaymentHistoryScreen,
    navigationOptions: {
      title: 'Payment History',
      headerTitleStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  },
  CreditCardForm: {
    screen: CreditCardForm,
    navigationOptions: {
      title: 'Add New Card',
      headerTitleStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  },
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: {
      title: 'Profile',
      headerTitleStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  },
  EditDefaultCardScreen: {
    screen: EditDefaultCardScreen,
    navigationOptions: {
      title: 'Default Payment',
      headerTitleStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
    },
  },
});

export default createAppContainer(AppNavigator);

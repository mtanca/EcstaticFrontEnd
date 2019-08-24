import React from "react";

import AsyncStorage from '@react-native-community/async-storage';
import {View, Text, Button, StyleSheet} from "react-native";
import IntroOnBoardScreen from '../IntroOnBoardScreen';
import HomeScreen from '../HomeScreen'

class MainScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      canRender: false
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn')
      if(isLoggedIn !== null && isLoggedIn === "true") {
        this.setState({
          isLoggedIn: true,
          canRender: true
        })
      } else {
        this.setState({
          isLoggedIn: false,
          canRender: true
        })
      }
    } catch(e) {
      // error reading value
    }
  }

  render() {
    const navigate = this.props.navigation;

    if(this.state.isLoggedIn && this.state.canRender){
      return(
        <View>
          {
            this.state.canRender === true &&
            <HomeScreen navigation={navigate}/>
          }
        </View>
      )
    } else {
      return(
        <View>
          {
            this.state.canRender === true &&
            <IntroOnBoardScreen navigation={navigate}/>
          }
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer:{
    marginTop: 100,
  },
  buttons: {
    marginTop: 30,
  },
})

export default MainScreen;

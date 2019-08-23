import React from "react";

import {View, Text, Button, AsyncStorage, Image, StyleSheet} from "react-native";

const ecstaticLogo = require('../../assets/logo-mark.png')
const ecstaticFont = require('../../assets/logo-font.png')
import MainScreen from '../MainScreen';



class SplashScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasTimedOut: false
    }
  }

  navigationOptions: {
    title: 'MyScreen',
    headerLeft: null
  }

  render() {
    const {navigate} = this.props.navigation;
    setTimeout(function(){ navigate("MainScreen", {navigation: navigate}); }, 2000)

    return(
      <View style={styles.container}>
        <Image
          source={ecstaticLogo}
          style={{height: 100, width: 100}}
        />
        <Image
          style={{marginTop: 30}}
          source={ecstaticFont}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#1e1e1e',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
})

export default SplashScreen

import React from "react";

import {View, Text, Button, AsyncStorage, StyleSheet} from "react-native";
import IntroOnBoardScreen from '../IntroOnBoardScreen';

class MainScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      canRender: false
    }

    this._retrieveData = this._retrieveData.bind(this)
    this._retrieveData()
  }

  static navigationOptions: {
    title: 'hello',
    headerLeft: null
  }

  _retrieveData = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn !== null && isLoggedIn === "true") {
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
    } catch (error) {
      // Error retrieving data
    }
  }


  render() {
    const navigate = this.props.navigation;

    if(this.state.isLoggedIn === true) {
      return (
        <View>
          <Text> hello world </Text>
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

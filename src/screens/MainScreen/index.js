import React from "react";
import LoginScreen from '../LoginScreen';

import {View, Text, AsyncStorage} from "react-native";

class MainScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      canRender: false
    }

    this._retrieveData = this._retrieveData.bind(this)
  }

  static navigationOptions = {
    title: '',
  };

  componentWillMount() {
    this._retrieveData()
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
    const {navigate} = this.props.navigation;

    if(this.state.isLoggedIn === true) {
      return (
        <View>
          {
            this.state.canRender === true && <Text> Hello </Text>
          }
        </View>
      )
    } else {
      return(
        <View>
        {
          this.state.canRender === true &&
          <LoginScreen navigation={navigate}/>
        }
        </View>
      )
    }
  }
}

export default MainScreen;

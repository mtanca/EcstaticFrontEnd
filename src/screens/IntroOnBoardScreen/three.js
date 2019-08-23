import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";

const ecstaticPeople = require('../../assets/people-map.png')

class IntroOnBoardScreenThree extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {navigate} = this.props.navigation;
    return(
      <View style={this.props.style}>
        <View style={{marginTop: 130}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',  textAlign: 'center', fontFamily: 'FiraSans'}}>
            Join the fun with fans all across the {"\n"}
            world
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style= {{color: "#798498", textAlign: 'center'}}>
            Connect with fans everywhere in a wide range of ways. {"\n"}
            You can chat with other fans, exchange prizes in the {"\n"}
            aftermarket, explore media content, and more.
          </Text>
        </View>

        <View style={{marginTop: 40}}>
        <Image
          source={ecstaticPeople}
        />
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreenThree

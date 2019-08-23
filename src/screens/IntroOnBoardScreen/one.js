import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";

const ecstaticWinners = require('../../assets/winners.png')

class IntroOnBoardScreenOne extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {navigate} = this.props.navigation;
    return(
      <View style={this.props.style}>
        <View style={{marginTop: 130}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',  textAlign: 'center', fontFamily: 'FiraSans'}}>
            Win exclusive experiences to meet your favorite stars
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style= {{color: "#798498", textAlign: 'center'}}>
            Want to have the opportunity to meet your favorite {"\n"}
            stars? Support them by buying a pack and this could be {"\n"}
            you like our other fans!
          </Text>
        </View>

        <View style={{marginTop: 40}}>
        <Image
          source={ecstaticWinners}
        />
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreenOne

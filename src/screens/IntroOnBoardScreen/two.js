import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image} from "react-native";

const ecstaticPrizes = require('../../assets/prizes.png')


class IntroOnBoardScreenTwo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const {navigate} = this.props.navigation;
    return(
      <View style={this.props.style}>
        <View style={{marginTop: 130}}>
          <Text style={{fontSize: 20, fontWeight: 'bold',  textAlign: 'center', fontFamily: 'FiraSans'}}>
            Beyond exclusive experiences, everyone’s still a winner
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style= {{color: "#798498", textAlign: 'center'}}>
            When you purchase a pack, everyone is guaranteed to win {"\n"}
            prizes ranging from common stickers to exclusive  {"\n"}
            items signed by the individual.
          </Text>
        </View>

        <View style={{marginTop: 40}}>
        <Image
          source={ecstaticPrizes}
        />
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreenTwo

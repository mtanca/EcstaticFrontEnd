import React from "react";
import {View, Text, ScrollView, Button, StyleSheet, Image, Dimensions} from "react-native";

class IntroOnBoardScreenTemplate extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const window = Dimensions.get('window');
    const {navigate} = this.props.navigation;

    return(
      <View style={this.props.style}>
        <View style={{marginTop: (window.height * 0.20)}}>
        <Text style={{width: (window.width * 0.95), fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: 'FiraSans'}}>
            {this.props.mainText}
          </Text>
        </View>
        <View style={{marginTop: 10, width: (window.width * 0.95)}}>
          <Text style= {{color: "#798498", textAlign: 'center'}}>
            {this.props.subText}
          </Text>
        </View>

        <View style={{marginTop: 25}}>
        <Image
          source={this.props.image}
        />
        </View>
      </View>
    )
  }
}

export default IntroOnBoardScreenTemplate

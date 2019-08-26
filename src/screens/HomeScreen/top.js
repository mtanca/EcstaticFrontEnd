import React from "react";
import {View, Text, ScrollView, Image, StyleSheet} from "react-native";
const userFiller = require('../../assets/user-filler.png')

class HomeScreenTop extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{marginLeft: 5, marginTop: '5%', borderRadius: 60, marginBottom: '5%'}}>
        <Image
          source={userFiller}
          style={{height: 50, width: 50}}
        />
      </View>
    )
  }
}

export default HomeScreenTop

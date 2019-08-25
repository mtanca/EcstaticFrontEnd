import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')

class GiveAwayShowScreen extends React.Component {
  constructor(props){
    super(props)
  }

  getImage = (fileName) => {
    if(fileName === "madison-beer.png") {
      return madisonBeers
    } else if(fileName === "Blackpink.png") {
      return blackPink
    } else if(fileName === "Khalid.png") {
      return khalid
    } else if(fileName === "Ninja.png") {
      return ninja
    } else {
      return madisonBeers
    }
  }

  render() {
    let giveaway = this.props.navigation.state.params.giveaway

    return (
      <View style={{flex: 1}}>
        <Image
          source={this.getImage(giveaway.image.file_name)}
          style={{width: '100%'}}
        />
        <Text style={{fontWeight: 'bold', marginTop: '5%', marginLeft: 5, fontSize: 20}}>{giveaway.name} </Text>

        <View style={{flex: 1, flexDirection:'row', marginLeft: 5,}}>
          <Text>{giveaway.state.packs_available} out of {giveaway.capacity} sold</Text>
          <View style={{flex: 1, justifyContent: 'flex-end', flexDirection:'row'}}>
            <Text >Starts in </Text>
            <Text style={{marginRight: 15}}>1 hour</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default GiveAwayShowScreen;

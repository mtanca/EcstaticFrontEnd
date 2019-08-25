import React from "react";
import {View, Text, ScrollView, Image, StyleSheet, TouchableHighlight} from "react-native";

import GiveAwayShowScreen from '../GiveAwayShowScreen'

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')
const time = require('../../assets/time.png')

class HomeScreenNew extends React.Component {
  constructor(props) {
    super(props)

    this._navigate = this._navigate.bind(this)
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

  _navigate = (giveaway) => {
    this.props.navigation.navigate("GiveAwayShowScreen", {hello: this.props.navigation.navigate, giveaway: giveaway})
  }

  render() {
    const {navigate} = this.props.navigation;

    return(
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          this.props.hasData &&
           this.props.data.giveaways.map((giveaway) => (
              <View
                style={{flex: 1, marginLeft: 5}}  key={giveaway.id}
              >
              <TouchableHighlight onPress={() => this._navigate(giveaway)}>
                <Image
                  source={this.getImage(giveaway.image.file_name)}
                />
              </TouchableHighlight>

                <View style={{flex: 1, flexDirection:'row'}}>
                  <Text style={{fontWeight: 'bold', marginLeft: 5}}>{giveaway.name} </Text>
                  <Text>{giveaway.category}</Text>
                  <View style={{flex: 1, justifyContent: 'flex-end', flexDirection:'row'}}>
                    <Image
                      source={time}
                      style={{marginTop: 5, marginRight: 5}}
                    />
                    <Text >Starts in </Text>
                    <Text style={{marginRight: 15}}>1 hour</Text>
                  </View>
                </View>
              </View>
           ))
         }
      </ScrollView>
    )
  }
}

export default HomeScreenNew

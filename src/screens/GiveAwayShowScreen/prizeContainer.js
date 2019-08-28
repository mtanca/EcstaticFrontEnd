import React from "react";
import {View, Text, ScrollView, Image, FlatList} from "react-native";

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')

const heals = require('../../assets/Heals.png')
const omg = require('../../assets/OMG.png')
const rocketOn = require('../../assets/RocketOn.png')
const dab = require('../../assets/Dab.png')
const floss = require('../../assets/Floss.png')


class PrizeContainer extends React.Component {
  constructor(props){
    super(props)
  }

  getPrizeImage = (fileName) => {
    if(fileName === "Rocket On.png") {
      return rocketOn
    } else if(fileName === "Heals.png") {
      return heals
    } else if(fileName === "Dab.png") {
      return dab
    } else if(fileName === "Floss.png") {
      return floss
    } else {
      return omg
    }
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

  renderPrizeGrid(prize){
    const imageScalor = window.height > 592 && window.width > 384 ? 65 : 75

    return (
      <View>
        <View style={{marginRight: '5%', borderColor:'rgba(0, 0, 0, 0.050)', borderWidth: 1, borderRadius: 15}}>
          <Image
            source={this.getPrizeImage(prize.image.file_name)}
            style={{width: imageScalor, height: imageScalor}}
          />
        </View>
        <View style={{marginTop: 5, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15}}>
          <Text style={{justifyContent: 'flex-start'}}>{prize.name}</Text>
        </View>
      </View>
    );
  }

  render() {

    return(
      <View style={{marginLeft: 5, marginTop: '5%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Prizes</Text>
        <View style={{marginTop: 15}}>
          <FlatList
            numColumns={4}
            data={this.props.giveaway.prizes}
            renderItem={(prize) => this.renderPrizeGrid(prize.item)}
          />
        </View>
      </View>
    )
  }
}

export default PrizeContainer

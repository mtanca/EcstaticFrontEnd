import React from "react";
import {View, Text, Image, StyleSheet, ScrollView, Button, Dimensions} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import PrizeContainer from './prizeContainer.js'
import GiveAwayInfo from './info.js'

const moment = require('moment');

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')

const time = require('../../assets/time.png')

class GiveAwayStatistics extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    const giveaway = this.props.giveaway
    let statusSoldPercent = Math.floor(giveaway.state.packs_available / giveaway.capacity)

    return(
      <View>
        <View style={{flexDirection:'row', marginLeft: 5}}>
        <Text>{giveaway.capacity - giveaway.state.packs_available} out of {giveaway.capacity} sold</Text>
        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection:'row'}}>
          <Image
            source={time}
            style={{marginTop: 5, marginRight: 5}}
          />
          <Text >Starts in </Text>
          <Text style={{marginRight: 15, color: "#39f3bb"}}>{moment.unix(giveaway.start_time).fromNow(true)}</Text>
        </View>
        </View>

        <View style={{marginLeft: 5, marginTop: 5, height: 8, width: '95%', flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{height: '100%', width: statusSoldPercent + "%", backgroundColor: "#39f3bb"}}>
        </View>
        <View style={{height: '100%', width: 100 - statusSoldPercent + "%", backgroundColor: 'rgba(0, 0, 0, 0.050)'}}>
        </View>
        </View>
      </View>
    )
  }
}

export default GiveAwayStatistics

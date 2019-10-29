import React from 'react';
import {View, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import GiveAwayInfo from './info.js';

const moment = require('moment');

const ninja = require('../../assets/Ninja.png');
const madisonBeers = require('../../assets/madison-beer.png');
const blackPink = require('../../assets/Blackpink.png');
const khalid = require('../../assets/Khalid.png');

const time = require('../../assets/time.png');

class GiveAwayStatistics extends React.Component {
  constructor(props) {
    super(props);
  }

  renderGiveAwayTime = giveaway => {
    const packs = giveaway.state.packs_available || giveaway.capacity;
    const packsRemaining = giveaway.capacity - packs;
    const currentTime = moment().unix();

    let timeAvailableText = null;
    let timeRemaining = null;

    if (giveaway.start_time < currentTime) {
      timeAvailableText = 'Ends in';
      timeRemaining = giveaway.end_time;
    } else {
      timeAvailableText = 'Starts in';
      timeRemaining = giveaway.startTime;
    }

    let packDisplayTextBold =
      packsRemaining === giveaway.capacity ? `SOLD OUT` : packsRemaining;

    let packDisplayTextEnding =
      packsRemaining === giveaway.capacity
        ? `${giveaway.capacity}`
        : `${giveaway.capacity} sold`;

    return (
      <View style={{marginTop: 5, flexDirection: 'row'}}>
        <Text style={{fontSize: 15}}>
          <Text style={{color: '#39f3bb', fontWeight: 'bold'}}>
            {packDisplayTextBold}
          </Text>
          <Text style={{color: '#798498'}}> of {packDisplayTextEnding}</Text>
        </Text>
        <View
          style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <Image source={time} style={{marginTop: 5, marginRight: 5}} />
          <Text style={{fontSize: 15}}>{timeAvailableText} </Text>
          <Text style={{fontSize: 15, marginRight: 15, color: '#39f3bb'}}>
            {moment.unix(timeRemaining).fromNow(true)}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const giveaway = this.props.giveaway;
    const packsAvailable = giveaway.state.packs_available || giveaway.capacity;

    let statusSoldPercent =
      100 - Math.floor((packsAvailable / giveaway.capacity) * 100);

    return (
      <View>
        {this.renderGiveAwayTime(giveaway)}

        <View
          style={{
            marginTop: 10,
            height: 8,
            width: '95%',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              height: '100%',
              width: statusSoldPercent + '%',
              backgroundColor: '#39f3bb',
            }}
          />
          <View
            style={{
              height: '100%',
              width: 100 - statusSoldPercent + '%',
              backgroundColor: 'rgba(0, 0, 0, 0.050)',
            }}
          />
        </View>
      </View>
    );
  }
}

export default GiveAwayStatistics;

import React from 'react';
import {View, Text, ScrollView} from 'react-native';

const moment = require('moment');

export default class GiveAwayInfo extends React.Component {
  constructor(props) {
    super(props);

    this.getDate = this.getDate.bind(this);
  }

  getDate(startTime) {
    return moment.unix(startTime).format('ll');
  }

  render() {
    return (
      <View style={{marginLeft: 5}}>
        <Text style={{marginTop: '5%', fontWeight: 'bold', fontSize: 25}}>
          Info
        </Text>

        <Text style={{color: '#798498', marginTop: 10, fontSize: 15}}>
          {this.props.giveaway.description}
          <Text
            style={{color: '#39f3bb'}}
            onPress={() => this.props.toggleTOSModalFunc()}>
            {' '}
            Terms and conditions
          </Text>
        </Text>

        <View style={{marginRight: '5%', marginTop: 5}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
            <Text style={{flex: 1, justifyContent: 'flex-start', fontSize: 15}}>
              Release Date
            </Text>
            <Text style={{fontSize: 15}}>
              {this.getDate(this.props.giveaway.start_time)}
            </Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
            <Text style={{flex: 1, justifyContent: 'flex-start', fontSize: 15}}>
              Edition
            </Text>
            <Text style={{fontSize: 15}}>{this.props.giveaway.edition}</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
            <Text style={{flex: 1, justifyContent: 'flex-start', fontSize: 15}}>
              Pack Odds
            </Text>
            <Text
              onPress={() => this.props.toggleProbabilityModalFunc()}
              style={{fontSize: 15, fontWeight: 'bold', color: '#39f3bb'}}>
              View Odds
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

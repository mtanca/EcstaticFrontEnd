import React from "react";
import {View, Text, ScrollView, Image, FlatList, StyleSheet} from "react-native";

const moment = require('moment');

class GiveAwayInfo extends React.Component {
  constructor(props) {
    super(props)

    this.getDate = this.getDate.bind(this)
  }

  getDate(startTime) {
    return moment.unix(startTime).format('ll');
  }

  render() {
    return(
      <View style={{marginLeft: 5}}>
        <Text style={{marginTop: '5%', fontWeight: 'bold', fontSize: 20}}>Info</Text>

        <Text style= {{color: "#798498", marginTop: 5}}>
          {this.props.giveaway.description}
        </Text>


        <View style={{marginRight: '5%', marginTop: 5}}>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
            <Text style={{flex: 1, justifyContent: 'flex-start'}}>Release Date</Text>
            <Text>{this.getDate(this.props.giveaway.start_time)}</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
            <Text style={{flex: 1, justifyContent: 'flex-start'}}>Edition</Text>
            <Text>{this.props.giveaway.edition}</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
            <Text style={{flex: 1, justifyContent: 'flex-start'}}>Pack Odds</Text>
            <Text style={{fontWeight: 'bold', color: "#39f3bb"}}>View Odds</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default GiveAwayInfo

import React from "react";
import {View, Text, Image, StyleSheet, ScrollView, Button, Dimensions} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

import PrizeContainer from './prizeContainer.js'
import GiveAwayInfo from './info.js'
import GiveAwayStatistics from './statistics.js'
import UserSection from '../components/userSection.js'

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')

/**
 * The main container for a specific giveaway.
*/
class GiveAwayShowScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasData: false,
      data: null
    }
  }

  componentDidMount() {
    // It's possible for the giveawayId to be passed via the navigation props from login screen.
    // This is done to avoid a race condition between when we save the giveawayId in AsyncStorage after
    // a successful loggin and when we need to use the giveawayId for fetch the GiveAway data
    // from the server.
    defaultGiveAwayId = this.props.navigation.state.params.giveawayId || null

    this._fetchData(defaultGiveAwayId)
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

  _fetchData = async (defaultGiveAwayId) => {
    try {
      let giveawayId = await AsyncStorage.getItem('@giveawayId')

      if(giveawayId === null) {
        giveawayId = defaultGiveAwayId
      }

      fetch("http://192.168.1.14:4000/api/giveaways/" + giveawayId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            hasData: true,
            data: responseJson.data
          })
        })
    } catch(e) {

    }
  }

  _signOut = (navigate) => {
    AsyncStorage.removeItem('@isLoggedIn')
    AsyncStorage.removeItem('@userId')
    AsyncStorage.removeItem('@giveawayId')

    this.props.navigation.navigate("SplashScreen", {navigation: this.props.navigation.navigate})
  }

  render() {
    const window = Dimensions.get('window');

    return (
      <ScrollView>
      {
        this.state.hasData &&
        <UserSection hasData={this.state.hasData} data={this.state.data} />
      }
      {
        this.state.hasData &&
        <Image
          source={this.getImage(this.state.data.giveaway.image.file_name)}
          style={{width: '100%'}}
        />
      }
      {
        this.state.hasData &&
        <Text style={{fontWeight: 'bold', marginTop: '5%', marginLeft: 5, fontSize: 20}}>{this.state.data.giveaway.name}</Text>
      }
      {
        this.state.hasData &&
        <GiveAwayStatistics giveaway={this.state.data.giveaway} />
      }
      {
        this.state.hasData &&
        <PrizeContainer giveaway={this.state.data.giveaway} />
      }
      {
        this.state.hasData &&
        <GiveAwayInfo giveaway={this.state.data.giveaway} />
      }
      {
        this.state.hasData &&
        <View style={{marginTop: 30, marginBottom: '5%', width: window.width - 60, marginLeft: 60 / 2}}>
          <Button
            title="Buy Pack"
            color="#39f3bb"
            accessibilityLabel="Click here to purchase a pack"
          />
        </View>
      }

      <Text style={{marginTop: 20,textAlign: 'center'}} onPress={() => this._signOut()}>
        PRESS HERE TO SIGN OUT
      </Text>

      </ScrollView>
    )
  }
}

export default GiveAwayShowScreen;

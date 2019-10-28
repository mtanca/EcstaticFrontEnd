import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

const commentTextSVG = require('../../assets/comment_text.svg');
const creditCardSVG = require('../../assets/credit_card.svg');
const homeSVG = require('../../assets/home_vs.svg');

const ninja = require('../../assets/Ninja.png');
const madisonBeers = require('../../assets/madison-beer.png');
const blackPink = require('../../assets/Blackpink.png');
const khalid = require('../../assets/Khalid.png');

const ninjaTee = require('../../assets/shirt-prize.png');
const omgPrize = require('../../assets/omg-prize.png');
const privateQA = require('../../assets/private-qa-prize.png');
const coinsPrize = require('../../assets/treasure-prize.png');

const moment = require('moment');
const time = require('../../assets/time.png');

import UserSection from '../components/userSection.js';

import PrizeContainer from '../components/prizeContainer';

import {IP_ADDRESS} from '../../constants/constants.js';

export default class BetaHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userGiveAwayData: null,
      userPrizeData: null,
    };
  }

  componentDidMount() {
    this._fetchUserGiveAwayData();
    this._fetchUserPrizeData();
  }

  measureView(event) {
    this.setState({
      userSectionWidthOffset: event.nativeEvent.layout.width,
    });
  }

  renderGiveAwayStats = giveaway => {
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
        <Text>
          <Text style={{fontWeight: 'bold'}}>{giveaway.name}</Text>
          <Text> {giveaway.category}</Text>
        </Text>
        <View
          style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}}>
          <Image source={time} style={{marginTop: 5, marginRight: 5}} />
          <Text>{timeAvailableText} </Text>
          <Text style={{marginRight: 15, color: '#39f3bb'}}>
            {moment.unix(timeRemaining).fromNow(true)}
          </Text>
        </View>
      </View>
    );
  };

  renderNavigationBar = () => {
    return (
      <View style={styles.navigation}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('GiveAwayShowScreen', {
                navigation: this.props.navigation.navigate,
                // FIX ME!!!
                giveaway: 1,
              })
            }
            style={{flex: 1, alignItems: 'center'}}>
            <Icon name="home" size={30} color="#1E1E1E" />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('UserPaymentsScreen', {
                  navigation: this.props.navigation.navigate,
                  userId: 1,
                })
              }
              style={{flex: 1, alignItems: 'center'}}>
              <Icon name="credit-card" size={30} color="#1E1E1E" />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Icon name="comments" size={30} color="#1E1E1E" />
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            height: 5,
            width: '45%',
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 10,
          }}
        />
      </View>
    );
  };

  getImage = fileName => {
    if (fileName === 'madison-beer.png') {
      return madisonBeers;
    } else if (fileName === 'Blackpink.png') {
      return blackPink;
    } else if (fileName === 'Khalid.png') {
      return khalid;
    } else if (fileName === 'Ninja.png') {
      return ninja;
    } else {
      return madisonBeers;
    }
  };

  /**
   * Fetches the user's giveaway list
   */
  _fetchUserGiveAwayData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`http://${IP_ADDRESS}:4000/api/users/${userId}/giveaways`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data.userGiveAways);
          this.setState({
            userGiveAwayData: responseJson.data.userGiveAways,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _fetchUserPrizeData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`http://${IP_ADDRESS}:4000/api/users/${userId}/prizes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data.userPrizes.map);
          this.setState({
            userPrizeData: responseJson.data.userPrizes.map(
              userPrize => userPrize.prize,
            ),
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View
          style={styles.userInfo}
          onLayout={event => this.measureView(event)}>
          <UserSection hasData={null} data={null} />
        </View>
        {this.state.userSectionWidthOffset && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                // offset the text by the width of the userSection
                marginLeft: this.state.userSectionWidthOffset * -1,
              }}>
              HOME
            </Text>
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this._renderHeader()}

        <View style={{marginTop: '5%', marginLeft: 10}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}> Experiences </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#798498',
            }}>
            {' '}
            Check out this exclusive experience
          </Text>
        </View>

        {this.state.userGiveAwayData &&
          this.state.userGiveAwayData.map((userGiveAway, key) => (
            <ScrollView style={styles.giveawayInfoContainer}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  key={key}
                  source={this.getImage(userGiveAway.image.file_name)}
                  style={{width: '95%', marginTop: 10, borderRadius: 10}}
                />
              </View>
              <View style={{marginLeft: 5}}>
                {this.renderGiveAwayStats(userGiveAway)}
                <View style={{marginTop: '5%'}}>
                  {this.state.userPrizeData && (
                    <PrizeContainer
                      title="Prizes Won"
                      prizes={this.state.userPrizeData}
                      toggleModalFunc={() => console.log('hello!')}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          ))}

        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          {this.renderNavigationBar()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingBottom: 10,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  giveawayInfoContainer: {
    marginLeft: 10,
  },
  userInfo: {
    marginLeft: 10,
  },
  navigation: {
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    justifyContent: 'flex-end',
  },
});

import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';

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
import UserNavigationBar from '../components/userNavigationBar';

import CategoryTitle from '../components/categoryTitle.js';

import {IP_ADDRESS} from '../../constants/constants.js';

export default class BetaHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userGiveAwayData: null,
      userPrizeData: null,
      isPrizeDescriptionModalVisible: false,
      isProfileModalVisible: false,
      userPrizes: null,
      profileModalMarginLeft: new Animated.Value(-400),
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

  // A callback function which gets executed in the PrizeContainer. This function toggles
  // the visiblity of the modal and determines the prize to display in the show modal.
  handleTogglePrizeModal = prize => {
    this.setState({
      isPrizeDescriptionModalVisible: !this.state
        .isPrizeDescriptionModalVisible,
      currentDisplayShowModalPrize: prize,
    });
  };

  // This function toggles
  // the visiblity of the modal and determines the display of the user's profile.
  handleToggleProfileModal = () => {
    const slideDirection = !this.state.isProfileModalVisible
      ? this.slideLeft
      : this.slideRight;

    slideDirection();

    this.setState({
      isProfileModalVisible: !this.state.isProfileModalVisible,
    });
  };

  getPrizePhoto = fileName => {
    if (fileName === 'Rocket On.png') {
      return rocketOn;
    } else if (fileName === 'Heals.png') {
      return heals;
    } else if (fileName === 'Dab.png') {
      return dab;
    } else if (fileName === 'Floss.png') {
      return floss;
    } else if (fileName === 'omg-prize.png') {
      return omgPrize;
    } else if (fileName === 'shirt-prize.png') {
      return ninjaTee;
    } else if (fileName === 'private-qa-prize.png') {
      return privateQA;
    } else {
      return coinsPrize;
    }
  };

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
      <View style={{marginTop: 5, flexDirection: 'row', flexWrap: 'wrap'}}>
        <View style={{alignItems: 'center', paddingTop: 5, paddingBottom: 5}}>
          <Text style={{fontSize: 15}}>
            <Text style={{fontWeight: 'bold'}}>{giveaway.name}</Text>
          </Text>
        </View>
        <CategoryTitle category={giveaway.category} />
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={time}
            style={{
              marginRight: 5,
              alignSelf: 'center',
            }}
          />
          <Text style={{fontSize: 15}}>{timeAvailableText} </Text>
          <Text style={{fontSize: 15, marginRight: 15, color: '#39f3bb'}}>
            {moment.unix(timeRemaining).fromNow(true)}
          </Text>
        </View>
      </View>
    );
  };

  getImage = fileName => {
    const nameImageMapper = {
      'madison-beer.png': madisonBeers,
      'Blackpink.png': blackPink,
      'Khalid.png': khalid,
      'Ninja.png': ninja,
    };

    const image = nameImageMapper[fileName];
    if (image) {
      return image;
    } else {
      return madisonBeers;
    }
  };

  _signOut = navigate => {
    AsyncStorage.removeItem('@isLoggedIn');
    AsyncStorage.removeItem('@userId');
    AsyncStorage.removeItem('@giveawayId');

    this.props.navigation.navigate('SplashScreen', {
      navigation: this.props.navigation.navigate,
    });
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
          console.log(responseJson.data.userPrizes);

          const prizeMapping = responseJson.data.userPrizes;

          this.setState({
            userPrizes: prizeMapping,
            userPrizeData: Object.keys(prizeMapping).map(
              // The PrizeContainer only needs a single prize from this map to display
              prizeName => prizeMapping[prizeName][0].prize,
            ),
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _userPrizeOwn = () => {
    const prizeMapping = this.state.userPrizes;

    const amountOwned =
      prizeMapping[this.state.currentDisplayShowModalPrize.name].length;

    if (amountOwned < 1) {
      return 'Not owned';
    } else {
      return `Owned x${amountOwned}`;
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
                fontSize: 25,
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

  renderPrizeShowModal = () => {
    const window = Dimensions.get('window');

    if (!this.state.isPrizeDescriptionModalVisible) return null;
    return (
      <Modal
        style={{flex: 1, height: 250}}
        isVisible={this.state.isPrizeDescriptionModalVisible}
        onRequestClose={() => this.handleTogglePrizeModal(null)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 80}}>
            <Text style={{color: 'white', fontSize: 30}}>
              {this.state.currentDisplayShowModalPrize.name}
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>
              {this._userPrizeOwn()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPressOut={() => this.handleTogglePrizeModal(null)}
          style={{
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <Image
            source={this.getPrizePhoto(
              this.state.currentDisplayShowModalPrize.image.file_name,
            )}
          />
        </TouchableOpacity>
      </Modal>
    );
  };

  _navigateToGiveAwayShow = giveawayId => {
    this.props.navigation.navigate('GiveAwayShowScreen', {
      navigation: this.props.navigation.navigate,
      giveaway: giveawayId,
    });
  };

  _renderProfileHeader = () => {
    return (
      <View
        style={{
          paddingBottom: 20,
          borderWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
          borderRightColor: 'white',
          borderLeftColor: 'white',
          borderTopColor: 'white',
        }}>
        <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 30}}>
          <UserSection hasData={null} data={null} />
          <Text style={{marginTop: 15, marginLeft: 15}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {' '}
              Rachel {'\n'}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontWeight: 'bold',
                color: '#39f3bb',
              }}>
              View Profile
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  _renderProfileOptions = () => {
    return (
      <View style={{marginLeft: 30}}>
        <View style={styles.profileSetting}>
          <Icon name="home" size={25} color="black" />
          <Text style={{marginLeft: 10, fontSize: 20}}>Home</Text>
        </View>
        <View style={styles.profileSetting}>
          <Icon name="credit-card" size={25} color="black" />
          <Text style={{marginLeft: 10, fontSize: 20}}>Payment</Text>
        </View>
        <View style={styles.profileSetting}>
          <Icon name="comments" size={25} color="black" />
          <Text style={{marginLeft: 10, fontSize: 20}}>FAQs</Text>
        </View>
        <View style={styles.profileSetting}>
          <Icon name="bell" size={25} color="black" />
          <Text style={{marginLeft: 10, fontSize: 20}}>Notifications</Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <Icon name="sign-out" size={25} color="black" />
          <Text style={{marginLeft: 10, fontSize: 20}}>Log Out</Text>
        </View>
      </View>
    );
  };

  // This function is a shitty hack I am doing because my UI skills suck.
  // We use a modal to render the blur view and display the user's profile.
  _renderProfileModal = () => {
    const window = Dimensions.get('window');

    if (!this.state.isProfileModalVisible) return null;
    return (
      <Modal
        style={{flex: 1, height: window.height}}
        isVisible={this.state.isProfileModalVisible}
        onRequestClose={() => this.handleToggleProfileModal(null)}>
        <Animated.View
          style={{
            transform: [{translateX: this.state.profileModalMarginLeft}],
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '80%',
              height: window.height,
            }}>
            {this._renderProfileHeader()}
            {this._renderProfileOptions()}
          </View>
        </Animated.View>

        <TouchableOpacity
          onPressOut={() => this.handleToggleProfileModal(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: '70%',
            height: window.height,
            width: window.width,
          }}
        />
      </Modal>
    );
  };

  slideLeft = () => {
    Animated.spring(this.state.profileModalMarginLeft, {
      toValue: -30,
      delay: 250,
    }).start();
  };

  slideRight = () => {
    Animated.spring(this.state.profileModalMarginLeft, {
      toValue: -400,
      delay: 0,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.handleToggleProfileModal()}>
          {this._renderHeader()}
        </TouchableOpacity>
        {this._renderProfileModal()}
        {this.state.isPrizeDescriptionModalVisible &&
          this.renderPrizeShowModal()}
        {this.state.userGiveAwayData &&
          this.state.userGiveAwayData.map((userGiveAway, key) => (
            <ScrollView style={styles.giveawayInfoContainer}>
              <View style={{marginTop: '5%'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                  {' '}
                  Experiences
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#798498',
                  }}>
                  {' '}
                  Check out this exclusive experience
                </Text>
              </View>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this._navigateToGiveAwayShow(userGiveAway.id)}
                style={{justifyContent: 'center'}}>
                <Image
                  key={key}
                  source={this.getImage(userGiveAway.main_image.file_name)}
                  style={{width: '95%', marginTop: 10, borderRadius: 10}}
                />
              </TouchableHighlight>
              <View style={{marginLeft: 5}}>
                {this.renderGiveAwayStats(userGiveAway)}
                <View style={{marginTop: '5%'}}>
                  {this.state.userPrizeData && (
                    <PrizeContainer
                      title="Prizes Won"
                      prizes={this.state.userPrizeData}
                      toggleModalFunc={this.handleTogglePrizeModal.bind(this)}
                    />
                  )}
                </View>
              </View>
            </ScrollView>
          ))}

        <Text
          style={{marginTop: 20, textAlign: 'center'}}
          onPress={() => this._signOut()}>
          PRESS HERE TO SIGN OUT
        </Text>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          <UserNavigationBar navigation={this.props.navigation} />
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
    marginTop: '5%',
    flexDirection: 'row',
    borderWidth: 1,
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
  profileSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});

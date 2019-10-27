import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';

import GiveAwayInfo from './info.js';
import GiveAwayStatistics from './statistics.js';

import PrizeContainer from '../components/prizeContainer.js';
import UserSection from '../components/userSection.js';
import EcstaticButton from '../components/ecstaticButton.js';

import {IP_ADDRESS} from '../../constants/constants.js';

const ninja = require('../../assets/Ninja.png');
const madisonBeers = require('../../assets/madison-beer.png');
const blackPink = require('../../assets/Blackpink.png');
const khalid = require('../../assets/Khalid.png');

const ninjaTee = require('../../assets/shirt-prize.png');
const omgPrize = require('../../assets/omg-prize.png');
const privateQA = require('../../assets/private-qa-prize.png');
const coinsPrize = require('../../assets/treasure-prize.png');

const moment = require('moment');

/**
 * The main container for a specific giveaway.
 */
export default class GiveAwayShowScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
      data: null,
      purchaseData: null,
      buttonText: `Buy Pack`,
      userId: null,
      giveawayId: null,
      giveawayStarted: true,
      buttonConfirmationFunc: () =>
        this.setState({
          buttonText: 'Confirm',
          buttonConfirmationFunc: () => this.handleSubmit(),
        }),
      purchaseHasErrors: false,
      purchaseErrors: null,
      probabilityData: null,
      isPrizeModalVisible: false,
      isProbabilityModalVisible: false,
      isTOCModalVisible: false,
      isPrizeDescriptionModalVisible: false,
      currentDisplayPrize: null,
      currentDisplayShowModalPrize: null,
      backButtonScrollPosition: 0,
    };
  }

  componentDidMount() {
    // It's possible for the giveawayId to be passed via the navigation props from login screen.
    // This is done to avoid a race condition between when we save the giveawayId in AsyncStorage after
    // a successful loggin and when we need to use the giveawayId for fetch the GiveAway data
    // from the server.
    defaultGiveAwayId = this.props.navigation.state.params.giveawayId || null;

    this._fetchGiveAwayProbabilitiesData(defaultGiveAwayId);
    this._fetchData(defaultGiveAwayId);
    this._getUserAndGiveAwayInfo();
    this.handleGiveAwayDisable();
  }

  handleGiveAwayDisable = () => {
    if (this.state.hasData === true) {
      if (this.state.data.giveaway.start_time <= moment.now()) {
        this.setState({
          giveawayStarted: false,
        });
        // Exit out of function.
        return;
      }
    }
    setInterval(() => this.handleGiveAwayDisable(), 1000);
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

  getPrizePhotoByName = name => {
    if (name.includes('Rocket')) {
      return rocketOn;
    } else if (name.includes('Heals')) {
      return heals;
    } else if (name.includes('Dab')) {
      return dab;
    } else if (name.includes('Floss')) {
      return floss;
    } else if (name.includes('OMG')) {
      return omgPrize;
    } else if (name.includes('Shirt')) {
      return ninjaTee;
    } else if (name.includes('Private')) {
      return privateQA;
    } else {
      return coinsPrize;
    }
  };

  /**
   * Fetches the prize probability data for the 'view odds' modal.
   */
  _fetchGiveAwayProbabilitiesData = async defaultGiveAwayId => {
    try {
      let giveawayId = await AsyncStorage.getItem('@giveawayId');

      if (giveawayId === null) {
        giveawayId = defaultGiveAwayId;
      }

      fetch(`http://${IP_ADDRESS}:4000/api/giveaways/${giveawayId}/prizes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            probabilityData: responseJson.data.give_away_prizes,
          });
        });
    } catch (e) {}
  };

  // Changes the name and the # of prizes owned by the user for each prize in the show prize modal
  togglePrize = () => {
    if (this.state.data.purchaseData && this.state.purchaseData.length === 1) {
      this.setState({
        currentDisplayPrize: this.state.purchaseData[0],
      });
      return;
    }
    let currentDisplayPrize = this.state.currentDisplayPrize;
    let currentIndex = this.state.purchaseData.findIndex(
      element => element === currentDisplayPrize,
    );

    // Currently we only support giving away a max of 2 items. If the currentIndex is 0, change to 1 and
    // visa verse
    let newPrizeIndex = currentIndex === 0 ? 1 : 0;
  };

  // A callback function which gets executed in the PrizeContainer. This function toggles
  // the visiblity of the modal and determines the prize to display in the show modal.
  handleTogglePrizeModal = prize => {
    this.setState({
      isPrizeDescriptionModalVisible: !this.state
        .isPrizeDescriptionModalVisible,
      currentDisplayShowModalPrize: prize,
    });
  };

  _togglePrizeModal = () =>
    this.setState({isPrizeModalVisible: !this.state.isPrizeModalVisible});

  _toggleProbabilityModal = () =>
    this.setState({
      isProbabilityModalVisible: !this.state.isProbabilityModalVisible,
    });

  _toggleTOCModal = () =>
    this.setState({
      isProbabilityModalVisible: !this.state.isProbabilityModalVisible,
    });

  renderPrizeView = () => {
    const window = Dimensions.get('window');

    return (
      <Modal style={{flex: 1}} isVisible={this.state.isPrizeModalVisible}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 26}}>
              {this.state.currentDisplayPrize &&
                this.state.currentDisplayPrize.item}
            </Text>
            <Text style={{color: 'white', fontSize: 14}}>Not Owned</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => this._togglePrizeModal()}>
            <Icon name="times-circle" size={70} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
          snapToAlignment={'center'}
          pagingEnabled={true}
          snapToAlignment={'center'}
          onMomentumScrollBegin={() => this.togglePrize()}>
          {this.state.purchaseData.map((prize, key) => (
            <Image key={key} source={this.getPrizePhotoByName(prize.item)} />
          ))}
        </ScrollView>
        {this.state.purchaseData.length === 2 && (
          <Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
            Swipe left or right to see other prizes
          </Text>
        )}
      </Modal>
    );
  };

  renderBlurModal = () => {
    const window = Dimensions.get('window');
    let probabilities = {
      Common: '100%',
      Uncommon: '10%',
      Rare: '5%',
      'Super Rare': '1%',
      'Ultra Rate': '.5%',
      Exclusive: '.1%',
    };

    if (!this.state.isProbabilityModalVisible) return null;
    return (
      <Modal
        style={{flex: 1, height: 400}}
        isVisible={this.state.isProbabilityModalVisible}
        onRequestClose={() => this._toggleProbabilityModal()}>
        <TouchableOpacity
          onPressOut={() => this._toggleProbabilityModal()}
          style={{justifyContent: 'center', height: '100%', width: '100%'}}>
          <View
            style={{height: 250, backgroundColor: 'white', borderRadius: 20}}>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>
                Pack Odds
              </Text>
              <View style={{marginTop: 10}}>
                {Object.keys(probabilities).map(rarity => (
                  <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <Text>{rarity}</Text>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                      }}>
                      <Text>{probabilities[rarity]}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 26}}>
              {this.state.currentDisplayShowModalPrize.name}
            </Text>
            <Text style={{color: 'white', fontSize: 14}}>Not Owned</Text>
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

  /**
   * Retrieves and sets variables in async storage in components state.
   */
  _getUserAndGiveAwayInfo = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      let giveawayId = await AsyncStorage.getItem('@giveawayId');

      this.setState({
        userId: userId,
        giveawayId: giveawayId,
      });
    } catch (e) {}
  };

  /**
   * The primary function for handling pack buying. This function returns the prize won
   * by the user.
   */
  handleSubmit = () => {
    fetch(
      `http://${IP_ADDRESS}:4000/api/giveaways/` +
        this.state.data.giveaway.id +
        '/purchase',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: this.state.userId,
          giveaway_id: this.state.data.giveaway.id + '',
        }),
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.data.errors === null) {
          this.setState({
            hasData: true,
            purchaseData: responseJson.data.purchase_result,
            currentDisplayPrize: responseJson.data.purchase_result[0],
          });
          this._togglePrizeModal();
        } else {
          this.setState({
            purchaseHasErrors: true,
            purchaseErrors: null,
            purchaseData: null,
          });
        }
      });
    this.setState({
      buttonText: `Buy Pack`,
      buttonConfirmationFunc: () =>
        this.setState({
          buttonText: 'Confirm',
          buttonConfirmationFunc: () => this.handleSubmit(),
        }),
    });
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

  _fetchData = async defaultGiveAwayId => {
    try {
      let giveawayId = await AsyncStorage.getItem('@giveawayId');

      if (giveawayId === null) {
        giveawayId = defaultGiveAwayId;
      }

      fetch(`http://${IP_ADDRESS}:4000/api/giveaways/` + giveawayId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            hasData: true,
            data: responseJson.data,
          });
        })
        .catch(response => {
          console.log('Retrying connection...');
          setInterval(() => this._fetchData(defaultGiveAwayId), 1000);
        });
    } catch (e) {
      console.log('Retrying connection...');
      setInterval(() => this._fetchData(defaultGiveAwayId), 1000);
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

  updateBackButtonLoaction = e => {
    const window = Dimensions.get('window');
    let y = e.nativeEvent.contentOffset.y;

    this.setState({
      backButtonScrollPosition: y,
    });
  };

  _navigateToBetaHomeScreen = () => {
    this.props.navigation.navigate('BetaHomeScreen', {
      navigation: this.props.navigation.navigate,
    });
  };

  render() {
    const window = Dimensions.get('window');

    return (
      <ScrollView onScroll={event => this.updateBackButtonLoaction(event)}>
        {this.state.hasData && (
          <View style={styles.header}>
            <View style={{marginLeft: 10}}>
              <UserSection
                hasData={this.state.hasData}
                data={this.state.data}
              />
            </View>
          </View>
        )}
        {this.state.hasData && (
          <View>
            <View style={{marginLeft: 10}}>
              <Image
                source={this.getImage(this.state.data.giveaway.image.file_name)}
                style={{width: '95%', marginTop: 10, borderRadius: 10}}
              />
            </View>

            {/* Back button to beta home screen... */}
            <TouchableOpacity
              style={{
                marginTop: 50,
                marginLeft: 25,
                borderRadius: 100,
                height: 40,
                width: 40,
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                zIndex: 5,
                position: 'absolute',
                top: this.state.backButtonScrollPosition,
              }}
              onPress={() => this._navigateToBetaHomeScreen()}>
              <Icon
                style={{marginTop: '25%', marginLeft: '25%'}}
                name="arrow-left"
                size={20}
                color="#1E1E1E"
              />
            </TouchableOpacity>
          </View>
        )}
        {this.renderBlurModal()}
        {this.state.purchaseData && this.renderPrizeView()}
        {this.state.isPrizeDescriptionModalVisible &&
          this.state.currentDisplayShowModalPrize &&
          this.renderPrizeShowModal()}
        {this.state.hasData && (
          <View style={styles.contentContainer}>
            <Text
              style={{
                fontWeight: 'bold',
                marginTop: '5%',
                fontSize: 20,
              }}>
              {this.state.data.giveaway.name}
            </Text>
            <GiveAwayStatistics giveaway={this.state.data.giveaway} />
            <View style={{marginTop: '5%'}}>
              <PrizeContainer
                title="Prizes"
                prizes={this.state.data.giveaway.prizes}
                toggleModalFunc={this.handleTogglePrizeModal.bind(this)}
              />
            </View>
            <View
              style={{
                marginTop: '5%',
                height: 1,
                width: '95%',
                backgroundColor: 'rgba(0, 0, 0, 0.050)',
              }}
            />
            <GiveAwayInfo
              toggleProbabilityModalFunc={this._toggleProbabilityModal.bind(
                this,
              )}
              toggleTOSModalFunc={this._toggleTOCModal.bind(this)}
              giveaway={this.state.data.giveaway}
            />
          </View>
        )}
        {this.state.hasData && (
          <View
            style={{
              marginTop: 30,
              marginBottom: '5%',
              width: window.width - 60,
              marginLeft: 60 / 2,
            }}>
            <EcstaticButton
              buttonMarginTopScalor={0}
              buttonColor={'#39f3bb'}
              isDisabled={this.state.giveawayStarted}
              buttonText={
                this.state.buttonText + ` ($${this.state.data.cost_per_pack})`
              }
              navigationScreen={'GiveAwayShowScreen'}
              navigation={this.props.navigation}
              onPressFunc={() => this.state.buttonConfirmationFunc()}
            />
          </View>
        )}

        <Text
          style={{marginTop: 20, textAlign: 'center'}}
          onPress={() => this._signOut()}>
          PRESS HERE TO SIGN OUT
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingBottom: 10,
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderTopColor: 'white',
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  contentContainer: {
    marginLeft: 10,
  },
});

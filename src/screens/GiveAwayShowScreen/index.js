import React from "react";
import {View, Text, Image, StyleSheet, ScrollView, Button, Dimensions, TouchableOpacity} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import Modal from "react-native-modal";

import PrizeContainer from './prizeContainer.js'
import GiveAwayInfo from './info.js'
import GiveAwayStatistics from './statistics.js'
import UserSection from '../components/userSection.js'
import EcstaticButton from '../components/ecstaticButton.js'

const ninja = require('../../assets/Ninja.png')
const madisonBeers = require('../../assets/madison-beer.png')
const blackPink = require('../../assets/Blackpink.png')
const khalid = require('../../assets/Khalid.png')

const omgPrize = require('../../assets/omg-prize.png')
const shirtPrize = require('../../assets/shirt-prize.png')

const moment = require('moment');

/**
 * The main container for a specific giveaway.
*/
class GiveAwayShowScreen extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      hasData: false,
      data: null,
      purchaseData: null,
      buttonText: `Buy Pack`,
      userId: null,
      giveawayId: null,
      giveawayStarted: true,
      buttonConfirmationFunc: () => this.setState({buttonText: 'Confirm', buttonConfirmationFunc: () => this.handleSubmit()}),
      purchaseHasErrors: false,
      purchaseErrors: null,
      probabilityData: null,
      isPrizeModalVisible: false,
      isProbabilityModalVisible: false,
      isPrizeDescriptionModalVisible: false,
      currentDisplayPrize: null,
      currentDisplayShowModalPrize: null

    }
  }

  componentDidMount() {
    // It's possible for the giveawayId to be passed via the navigation props from login screen.
    // This is done to avoid a race condition between when we save the giveawayId in AsyncStorage after
    // a successful loggin and when we need to use the giveawayId for fetch the GiveAway data
    // from the server.
    defaultGiveAwayId = this.props.navigation.state.params.giveawayId || null

    this._fetchGiveAwayProbabilitiesData(defaultGiveAwayId)
    this._fetchData(defaultGiveAwayId)
    this._getUserAndGiveAwayInfo()
    this.handleGiveAwayDisable()
  }

  handleGiveAwayDisable = () => {
    if(this.state.hasData === true) {
      if(this.state.data.giveaway.start_time <= moment.now()) {
        this.setState({
          giveawayStarted: false
        })
        // Exit out of function.
        return
      }
    }
    setInterval(() => this.handleGiveAwayDisable(), 3000);
  }

  getPrizePhoto = (prize) => {
    if(prize.item !== "shirts"){
      return shirtPrize
    } else {
      return omgPrize
    }
  }

  /**
   * Fetches the prize probability data for the 'view odds' modal.
  */
  _fetchGiveAwayProbabilitiesData = async (defaultGiveAwayId) => {
    try {
      let giveawayId = await AsyncStorage.getItem('@giveawayId')

      if(giveawayId === null) {
        giveawayId = defaultGiveAwayId
      }

      fetch(`http://192.168.1.14:4000/api/giveaways/${giveawayId}/prizes`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            probabilityData: responseJson.data.give_away_prizes
          })
        })
    } catch(e) {

    }
  }

  // Changes the name and the # of prizes owned by the user for each prize in the show prize modal
  togglePrize = () => {
    let currentDisplayPrize = this.state.currentDisplayPrize
    let currentIndex = this.state.purchaseData.findIndex((element) =>
      element === currentDisplayPrize
    )

    // Currently we only support giving away a max of 2 items. If the currentIndex is 0, change to 1 and
    // visa verse
    let newPrizeIndex = currentIndex === 0 ? 1 : 0

    this.setState({
      currentDisplayPrize: this.state.purchaseData[newPrizeIndex]
    })
  }

  // A callback function which gets executed in the PrizeContainer. This function toggles
  // the visiblity of the modal and determines the prize to display in the show modal.
  handleTogglePrizeModal = (prize) => {
    this.setState({
      isPrizeDescriptionModalVisible: !this.state.isPrizeDescriptionModalVisible,
      currentDisplayShowModalPrize: prize
    });
  }

  _togglePrizeModal = () =>
  this.setState({isPrizeModalVisible: !this.state.isPrizeModalVisible});

  _toggleProbabilityModal = () =>
  this.setState({isProbabilityModalVisible: !this.state.isProbabilityModalVisible});

  renderPrizeView = () => {
    const window = Dimensions.get('window');

    return(
      <Modal style={{flex: 1, height: 250}} isVisible={this.state.isPrizeModalVisible}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: "center" }}>
          <Text style={{color: 'white', fontSize: 26}}>
            {this.state.currentDisplayPrize.item}
          </Text>
          <Text style={{color: 'white', fontSize: 14}}>
            Not Owned
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '30%'}}>
      <TouchableOpacity onPress={() => this._togglePrizeModal()}>
        <Icon name="times-circle" size={70} color="white"/>
      </TouchableOpacity>
      </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
          pagingEnabled={true}
          snapToAlignment={'center'}
          onMomentumScrollBegin={() => this.togglePrize()}
        >
        {
          this.state.purchaseData.map((prize) =>
          <Image
            source={this.getPrizePhoto(prize)}
          />
          )
        }
        </ScrollView>
        {
          this.state.purchaseData.length === 2 &&
          <Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>Swipe left or right to see other prizes</Text>
        }
      </Modal>
    )
  }

  renderBlurModal = () =>  {
    const window = Dimensions.get('window');
    let probabilities = {
      "Common": "100%",
      "Uncommon": "10%",
      "Rare": "5%",
      "Super Rare": "1%",
      "Ultra Rate": ".5%",
      "Exclusive": ".1%"
    }

    if (!this.state.isProbabilityModalVisible)
      return null
    return(
        <Modal
          style={{flex: 1, height: 400}}
          isVisible={this.state.isProbabilityModalVisible}
          onRequestClose={() => this._toggleProbabilityModal()}
          >
          <TouchableOpacity
            onPressOut={() =>this._toggleProbabilityModal()}
            style={{ justifyContent: 'center', height: '100%', width: "100%"}}
          >
            <View style={{height: 250, backgroundColor: 'white', borderRadius: 20}}>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <Text style={{marginTop: 20, fontWeight: 'bold', fontSize: 20}}>Pack Odds</Text>
                <View style={{marginTop: 10}}>
                {
                  Object.keys(probabilities).map((rarity) =>
                  <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <Text>{rarity}</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end', flexDirection:'row'}}>
                      <Text>{probabilities[rarity]}</Text>
                    </View>
                  </View>
                  )
                }
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
    )
  }

  renderPrizeShowModal = () =>  {
    const window = Dimensions.get('window');

    if (!this.state.isPrizeDescriptionModalVisible)
      return null
    return(
        <Modal
          style={{flex: 1, height: 250}}
          isVisible={this.state.isPrizeDescriptionModalVisible}
          onRequestClose={() => this.handleTogglePrizeModal(null)}
        >
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: "center" }}>
              <Text style={{color: 'white', fontSize: 26}}>
                {this.state.currentDisplayShowModalPrize.name}
              </Text>
              <Text style={{color: 'white', fontSize: 14}}>
                Not Owned
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPressOut={() =>this.handleTogglePrizeModal(null)}
            style={{ justifyContent: 'center', height: '100%', width: "100%"}}
          >

          <Image
            source={this.getPrizePhoto(this.state.currentDisplayShowModalPrize.name)}
          />

          </TouchableOpacity>
        </Modal>
    )
  }

  /**
   * Retrieves and sets variables in async storage in components state.
  */
  _getUserAndGiveAwayInfo = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId')
      let giveawayId = await AsyncStorage.getItem('@giveawayId')

      this.setState({
        userId: userId,
        giveawayId: giveawayId,
      })
    } catch(e) {
    }
  }

  /**
   * The primary function for handling pack buying. This function returns the prize won
   * by the user.
  */
  handleSubmit = () => {
    fetch("http://192.168.1.14:4000/api/giveaways/" + this.state.data.giveaway.id + "/purchase", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.userId,
        giveaway_id: this.state.data.giveaway.id + "",
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.data.errors === null) {
          this.setState({
            hasData: true,
            purchaseData: responseJson.data.purchase_result,
            currentDisplayPrize: responseJson.data.purchase_result[0]
          })
          this._togglePrizeModal()
        } else {
          this.setState({
            purchaseHasErrors: true,
            purchaseErrors: null,
            purchaseData: null
          })
        }
      })
    this.setState({
      buttonText: `Buy Pack`,
      buttonConfirmationFunc: () => this.setState({buttonText: 'Confirm', buttonConfirmationFunc: () => this.handleSubmit()})
    })
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
        this.renderBlurModal()
      }
      {
        this.state.purchaseData &&
        this.renderPrizeView()
      }
      {
        this.state.isPrizeDescriptionModalVisible &&
        this.state.currentDisplayShowModalPrize &&
        this.renderPrizeShowModal()
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
        <PrizeContainer giveaway={this.state.data.giveaway} toggleModalFunc={this.handleTogglePrizeModal.bind(this)} />
      }
      {
        this.state.hasData &&
        <GiveAwayInfo toggleModalFunc={this._toggleProbabilityModal.bind(this)} giveaway={this.state.data.giveaway} />
      }
      {
        this.state.hasData &&
        <View style={{marginTop: 30, marginBottom: '5%', width: window.width - 60, marginLeft: 60 / 2}}>
          <EcstaticButton
            buttonMarginTopScalor={0}
            buttonColor={"#39f3bb"}
            isDisabled={this.state.giveawayStarted}
            buttonText={this.state.buttonText + ` ($${this.state.data.cost_per_pack})`}
            navigationScreen={"GiveAwayShowScreen"}
            navigation={this.props.navigation}
            onPressFunc={() => this.state.buttonConfirmationFunc()}
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

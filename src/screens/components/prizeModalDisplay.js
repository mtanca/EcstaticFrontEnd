import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modal';

const heals = require('../../assets/Heals.png');
const omg = require('../../assets/OMG.png');
const rocketOn = require('../../assets/RocketOn.png');
const dab = require('../../assets/Dab.png');
const floss = require('../../assets/Floss.png');

const ninjaTee = require('../../assets/shirt-prize.png');
const omgPrize = require('../../assets/omg-prize.png');
const privateQA = require('../../assets/private-qa-prize.png');
const coinsPrize = require('../../assets/treasure-prize.png');

export default class PrizeModalDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  getPrizeImage = fileName => {
    const nameImageMapper = {
      'Rocket On.png': rocketOn,
      'Heals.png': heals,
      'Dab.png': dab,
      'Floss.png': floss,
      'omg-prize.png': omgPrize,
      'shirt-prize.png': ninjaTee,
      'private-qa-prize.png': privateQA,
    };

    const image = nameImageMapper[fileName];

    if (image) {
      return image;
    } else {
      return coinsPrize;
    }
  };

  _userPrizeOwn = () => {
    const prizeMapping = this.props.userPrizes;

    const amountOwned = prizeMapping[this.props.displayPrize.name];

    if (amountOwned) {
      return `Own x${amountOwned.length}`;
    } else {
      return 'Not owned';
    }
  };

  render() {
    return (
      <Modal
        style={{flex: 1, height: 250}}
        isVisible={this.props.isVisible}
        onRequestClose={() => this.props.toggleModalFunc(null)}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 80}}>
            <Text style={{color: 'white', fontSize: 30}}>
              {this.props.displayPrize.name}
            </Text>
            <Text style={{color: 'white', fontSize: 15}}>
              {this._userPrizeOwn()}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPressOut={() => this.props.toggleModalFunc(null)}
          style={{
            justifyContent: 'center',
            flexGrow: 1,
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}>
          <Image
            source={this.getPrizeImage(this.props.displayPrize.image.file_name)}
          />
        </TouchableOpacity>
      </Modal>
    );
  }
}

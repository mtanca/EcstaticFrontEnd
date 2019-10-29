import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ninja = require('../../assets/Ninja.png');
const madisonBeers = require('../../assets/madison-beer.png');
const blackPink = require('../../assets/Blackpink.png');
const khalid = require('../../assets/Khalid.png');

const heals = require('../../assets/Heals.png');
const omg = require('../../assets/OMG.png');
const rocketOn = require('../../assets/RocketOn.png');
const dab = require('../../assets/Dab.png');
const floss = require('../../assets/Floss.png');

const ninjaTee = require('../../assets/shirt-prize.png');
const omgPrize = require('../../assets/omg-prize.png');
const privateQA = require('../../assets/private-qa-prize.png');
const coinsPrize = require('../../assets/treasure-prize.png');

/*
The PrizeContainer component used to display prizes on the GiveAwayShowScreen and BetaHomeScreen.
*/
class PrizeContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  getPrizeImage = fileName => {
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

  renderPrizeGrid(prize) {
    const imageScalor = window.height > 592 && window.width > 384 ? 60 : 70;

    return (
      <View style={{width: '23%'}}>
        <TouchableOpacity
          style={{
            borderColor: 'rgba(0, 0, 0, 0.050)',
            borderWidth: 1,
            paddingLeft: 5,
            paddingRight: 5,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.props.toggleModalFunc(prize)}>
          <Image
            source={this.getPrizeImage(prize.image.file_name)}
            style={{width: imageScalor, height: imageScalor}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginTop: 5,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <Text numberOfLines={1} style={{justifyContent: 'flex-start'}}>
            {prize.name}
          </Text>
        </View>
      </View>
    );
  }

  // We add this function so we can perform a conditional based on the prizes to display.
  // If there are no prizes, display text stating so, if there are, display them
  _renderPrizes = () => {
    if (this.props.prizes.length === 0) {
      return <Text> None to display </Text>;
    } else {
      return (
        <FlatList
          numColumns={4}
          data={this.props.prizes}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={prize => this.renderPrizeGrid(prize.item)}
        />
      );
    }
  };

  render() {
    return (
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>
          {this.props.title}
        </Text>
        <View
          style={{
            marginTop: 15,
            width: '95%',
          }}>
          {this._renderPrizes()}
        </View>
      </View>
    );
  }
}

export default PrizeContainer;

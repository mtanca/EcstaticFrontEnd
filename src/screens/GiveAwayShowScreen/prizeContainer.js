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
    const imageScalor = window.height > 592 && window.width > 384 ? 65 : 75;

    return (
      <View>
        <TouchableOpacity
          style={{
            marginRight: '5%',
            borderColor: 'rgba(0, 0, 0, 0.050)',
            borderWidth: 1,
            borderRadius: 15,
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
            marginBottom: 15,
          }}>
          <Text style={{justifyContent: 'flex-start'}}>{prize.name}</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{marginLeft: 5, marginTop: '5%'}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Prizes</Text>
        <View style={{marginTop: 15}}>
          <FlatList
            numColumns={4}
            data={this.props.giveaway.prizes}
            renderItem={prize => this.renderPrizeGrid(prize.item)}
          />
        </View>
      </View>
    );
  }
}

export default PrizeContainer;

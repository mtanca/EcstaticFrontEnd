import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import MainScreen from '../MainScreen';
import LoginScreen from '../LoginScreen';
import SplashScreen from '../SplashScreen';
import UserSection from '../components/userSection.js';
import HomeScreenNew from './new.js';

import {IP_ADDRESS} from '../../constants/constants.js';

const ninja = require('../../assets/Ninja.png');
const madisonBeers = require('../../assets/madison-beer.png');
const blackPink = require('../../assets/Blackpink.png');
const khalid = require('../../assets/Khalid.png');
const time = require('../../assets/time.png');
const userFiller = require('../../assets/user-filler.png');

/*
  The main screen the user will see when logging into the app.

  NOTE- The Home screen will not be used for the beta.
*/
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
      data: null,
    };

    this._signOut = this._signOut.bind(this);
    this._fetchData = this._fetchData.bind(this);
    this.getImage = this.getImage.bind(this);
    this.renderActiveGiveAwaysGrid = this.renderActiveGiveAwaysGrid.bind(this);
    this.renderActiveGiveAways = this.renderActiveGiveAways.bind(this);
  }

  renderActiveGiveAwaysGrid(giveaway) {
    let imageScalor = null;

    if (window.height > 748 && window.width > 384) {
      imageScalor = 175;
    } else if (window.height > 592 && window.width > 384) {
      imageScalor = 175;
    } else {
      imageScalor = 185;
    }

    return (
      <View style={styles.gridItem}>
        <View>
          <Image
            source={this.getImage(giveaway.image.file_name)}
            style={{width: imageScalor, borderRadius: 15}}
          />
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={{flex: 1, justifyContent: 'flex-start'}}>
            {giveaway.user.first_name}
          </Text>
          <Text style={{marginBottom: '5%'}}>{giveaway.category}</Text>
        </View>
      </View>
    );
  }

  renderActiveGiveAways() {
    let giveaways = this.state.data.giveaways;

    return (
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          numColumns={2}
          data={this.state.data.giveaways}
          renderItem={giveaway => this.renderActiveGiveAwaysGrid(giveaway.item)}
        />
      </ScrollView>
    );
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('@userId');

      fetch(`http://${IP_ADDRESS}:4000/api/giveaways?id=` + userId, {
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
        });
    } catch (e) {}
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

  _signOut = navigate => {
    AsyncStorage.removeItem('@isLoggedIn');
    AsyncStorage.removeItem('@userId');

    this.props.navigation.navigate('SplashScreen', {
      navigation: this.props.navigation.navigate,
    });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView>
        <UserSection hasData={this.state.hasData} data={this.state.data} />
        <ScrollView>
          <View style={{marginTop: '5%'}}>
            <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 20}}>
              New
            </Text>
            <Text style={{marginLeft: 15, color: '#798498'}}>
              This week’s new releases
            </Text>
          </View>
          {this.state.hasData && (
            <HomeScreenNew
              hasData={this.state.hasData}
              data={this.state.data}
              navigation={this.props.navigation}
            />
          )}
          <View style={{marginTop: '5%', flex: 1, flexDirection: 'row'}}>
            <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 20}}>
              Ongoing
            </Text>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  marginRight: 15,
                  color: '#39f3bb',
                  fontWeight: 'bold',
                  fontSize: 15,
                  textAlignVertical: 'center',
                }}>
                See all
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 15}}>
            <Text style={{color: '#798498'}}>
              Discover all these incredible experiences
            </Text>
          </View>

          {this.state.hasData && (
            <ScrollView>{this.renderActiveGiveAways()}</ScrollView>
          )}
          <Text
            style={{marginTop: 20, textAlign: 'center'}}
            onPress={() => this._signOut()}>
            PRESS HERE TO SIGN OUT
          </Text>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    justifyContent: 'center',
  },
  gridItem: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItemImage: {
    width: 100,
    height: 100,
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 50,
  },
  gridItemText: {
    marginTop: 5,
    textAlign: 'center',
  },
});

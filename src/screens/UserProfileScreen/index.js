import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {IP_ADDRESS} from '../../constants/constants.js';

import LottieView from 'lottie-react-native';

import UserSection from '../components/userSection.js';

import Icon from 'react-native-vector-icons/FontAwesome';

const moment = require('moment');

export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
    };
  }

  componentDidMount() {
    this._fetchUserData();
  }

  _fetchUserData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`http://${IP_ADDRESS}:4000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson.data.user);

          const user = responseJson.data.user;

          this.setState({
            userData: user,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _renderLoading = () => {
    return (
      <View style={{justifyContent: 'center'}}>
        <LottieView
          style={{
            height: 50,
            width: 50,
          }}
          source={require('../../assets/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  };

  _renderProfileHeader = () => {
    if (this.state.userData === null) {
      return this._renderLoading();
    } else if (this.state.userData === false) {
      return (
        <View>
          <Text>Information Unavailable</Text>
        </View>
      );
    }

    return (
      <View
        style={{
          marginLeft: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <UserSection onPressFunc={() => null} hasData={null} data={null} />
          <View
            style={{flexDirection: 'column', marginTop: 10, marginLeft: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {this.state.userData.first_name} {this.state.userData.last_name}
            </Text>
            <Text
              style={{
                marginTop: 3,
                fontSize: 15,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              Joined{' '}
              {moment(this.state.userData.inserted_at).format('MMMM YYYY')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _renderEditOption = (title, userInfo) => {
    console.log('USER INFO: ' + userInfo);
    const value = userInfo === undefined ? '+ Add' : userInfo;

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.05)',
            borderTopColor: 'rgba(0, 0, 0, 0.05)',
            borderLeftColor: 'white',
            borderRightColor: 'white',
          }}>
          <View style={{flex: 1, justifyContent: 'center', marginLeft: 20}}>
            <Icon name="credit-card" size={20} color="black" />
          </View>
          <TouchableOpacity
            style={{
              flex: 8,
              flexDirection: 'column',
              paddingTop: 5,
              paddingBottom: 5,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{title}</Text>
            <Text
              style={{
                marginTop: 2,
                fontSize: 12,
                fontWeight: 'bold',
                color: 'grey',
              }}>
              {value}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderEditOptions = () => {
    if (this.state.userData === null) {
      return this._renderLoading();
    } else if (this.state.userData === false) {
      return (
        <View>
          <Text>Information Unavailable</Text>
        </View>
      );
    }

    const options = {
      Username: this.state.userData.username,
      Email: this.state.userData.email,
      Phone: this.state.userData.phone,
      'Shipping Address': this.state.userData.shipping_address,
      Age: this.state.userData.age,
      Password: '●●●●●●●●',
    };

    return Object.keys(options).map(key =>
      this._renderEditOption(key, options[key]),
    );
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        {this._renderProfileHeader()}
        <View style={{marginLeft: 20, marginTop: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 25}}>Account Info</Text>
        </View>
        {this._renderEditOptions()}
      </View>
    );
  }
}

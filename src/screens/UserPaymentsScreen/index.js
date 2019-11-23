import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import Modal from 'react-native-modal';

import LottieView from 'lottie-react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import UserSection from '../components/userSection.js';

import UserPaymentHistoryScreen from './paymentHistory.js';
import CreditCardForm from '../components/ccForm.js';
import UserNavigationBar from '../components/userNavigationBar';

import {IP_ADDRESS} from '../../constants/constants.js';

import AsyncStorage from '@react-native-community/async-storage';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const visaLogo = require('../../assets/visa-logo.png');
const amexLogo = require('../../assets/amex.png');
const discoverLogo = require('../../assets/discover.png');
const dinersClubLogo = require('../../assets/dinersClub.png');
const jcbLogo = require('../../assets/jcb.png');

export default class UserPaymentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
      userPaymentData: null,
      userDefaultPaymentData: null,
      isProfileModalVisible: false,
      profileModalMarginLeft: new Animated.Value(-400),
    };
  }

  componentDidMount() {
    this._fetchUserPaymentData();
    this._fetchUserFirstName();
  }

  _fetchUserPaymentData = async () => {
    try {
      let userId = await AsyncStorage.getItem('@userId');
      fetch(`https://${IP_ADDRESS}/api/users/${userId}/payments`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          const defaultCard = responseJson.data.defaultCard;

          console.log(responseJson.data.cards);
          this.setState({
            userPaymentData: responseJson.data.cards,
            userDefaultPaymentData: defaultCard === [] ? false : defaultCard,
          });
        });
    } catch (e) {
      console.log('ERROR....' + e);
    }
  };

  _fetchUserFirstName = async () => {
    try {
      let userFirstName = await AsyncStorage.getItem('@userFirstName');
      this.setState({
        userFirstName: userFirstName,
      });
    } catch (e) {
      this.setState({
        userFirstName: 'Not Available',
      });
    }
  };

  _renderHeader = () => {
    return (
      <View style={styles.header}>
        <View
          style={styles.userInfo}
          onLayout={event => this.measureView(event)}>
          <UserSection
            onPressFunc={() => this.handleToggleProfileModal(null)}
            hasData={null}
            data={null}
          />
        </View>
        {this.state.userSectionWidthOffset && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              adjustsFontSizeToFit={true}
              allowFontScaling={true}
              style={{
                fontWeight: 'bold',
                fontSize: 40,
                // offset the text by the width of the userSection
                marginLeft: this.state.userSectionWidthOffset * -1,
              }}>
              Payment
            </Text>
          </View>
        )}
      </View>
    );
  };

  measureView(event) {
    this.setState({
      userSectionWidthOffset: event.nativeEvent.layout.width,
    });
  }

  _renderNoDefaultPayment = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('UserPaymentHistoryScreen', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          marginTop: 10,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon
          style={{marginLeft: 10}}
          name="credit-card"
          size={20}
          color="black"
        />
        <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold'}}>
          No card on default
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginLeft: '5%',
          }}
        />
      </TouchableOpacity>
    );
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

  _renderDefaultCard = () => {
    const defaultCard = this.state.userDefaultPaymentData;
    const navigationScreen = 'CreditCardForm';

    if (defaultCard === null) {
      return this._renderLoading();
    } else if (defaultCard === false) {
      return this._renderNoDefaultPayment();
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('EditDefaultCardScreen', {
              navigation: this.props.navigation.navigate,
            })
          }
          style={{
            marginTop: 10,
            paddingTop: 12,
            paddingBottom: 12,
            alignItems: 'center',
            height: 50,
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.05)',
            borderLeftColor: 'white',
            borderRightColor: 'white',
            borderBottomColor: 'rgba(0, 0, 0, 0.05)',
          }}>
          {this._renderCardBrand(defaultCard.brand)}
          <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold'}}>
            {defaultCard.brand} {defaultCard.last4}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row-reverse',
              marginLeft: '5%',
            }}>
            <Icon
              style={{marginLeft: 10}}
              name="chevron-right"
              size={20}
              color="#798498"
            />
          </View>
        </TouchableOpacity>
      );
    }
  };

  _renderCardBrand = brand => {
    const brandsLogoMapper = {
      Visa: visaLogo,
      'American Express': amexLogo,
      Discover: discoverLogo,
    };

    const logo = brandsLogoMapper[brand];

    if (logo) {
      return (
        <Image source={logo} style={{marginLeft: 10, resizeMode: 'contain'}} />
      );
    } else {
      return (
        <Icon
          style={{marginLeft: 10}}
          name="shopping-bag"
          size={20}
          color="black"
        />
      );
    }
  };

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }

  // Make into component
  _renderPaymentInformation = (navigationScreen, paymentMethod) => {
    return (
      <GestureRecognizer onSwipeLeft={this.onSwipeLeft}>
        <View
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            alignItems: 'center',
            height: 50,
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderWidth: 1,
            borderTopColor: 'rgba(0, 0, 0, 0.05)',
            borderLeftColor: 'white',
            borderRightColor: 'white',
            borderBottomColor: 'rgba(0, 0, 0, 0.05)',
          }}>
          {this._renderCardBrand(paymentMethod.brand)}
          <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 15}}>
            {paymentMethod.brand} {paymentMethod.last4}
          </Text>
        </View>
      </GestureRecognizer>
    );
  };

  _renderUserPaymentMethods = () => {
    const navigationScreen = 'CreditCardForm';
    const paymentMethods = this.state.userPaymentData;

    if (paymentMethods === null) {
      return this._renderLoading();
    }
    return (
      <View>
        {paymentMethods &&
          paymentMethods.map(paymentMethod =>
            this._renderPaymentInformation(navigationScreen, paymentMethod),
          )}
        {this._renderAddCard()}
      </View>
    );
  };

  _renderAddCard = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('CreditCardForm', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon style={{marginLeft: 15}} name="plus" size={20} color="#0076ff" />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 15,
            color: '#0076ff',
            fontWeight: 'bold',
          }}>
          Add Card
        </Text>
      </TouchableOpacity>
    );
  };

  _renderUserPaymentHistory = () => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('UserPaymentHistoryScreen', {
            navigation: this.props.navigation.navigate,
          })
        }
        style={{
          marginTop: 10,
          paddingTop: 12,
          paddingBottom: 12,
          alignItems: 'center',
          height: 50,
          flexDirection: 'row',
          flexWrap: 'wrap',
          borderWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.05)',
          borderLeftColor: 'white',
          borderRightColor: 'white',
          borderBottomColor: 'rgba(0, 0, 0, 0.05)',
        }}>
        <Icon
          style={{marginLeft: 10}}
          name="shopping-bag"
          size={20}
          color="black"
        />
        <Text style={{marginLeft: 20, fontSize: 15, fontWeight: 'bold'}}>
          Payment History
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
            marginLeft: '5%',
          }}>
          <Icon
            style={{marginLeft: 10}}
            name="chevron-right"
            size={20}
            color="#798498"
          />
        </View>
      </TouchableOpacity>
    );
  };

  _renderPaymentDefaultHeader = () => {
    return (
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          marginBottom: 10,
        }}>
        <Text
          adjustsFontSizeToFit={true}
          allowFontScaling={true}
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Payment Default
        </Text>
      </View>
    );
  };

  _renderPaymentMethodsHeader = () => {
    return (
      <View
        style={{
          marginTop: 15,
          marginLeft: 10,
          marginBottom: 10,
        }}>
        <Text
          adjustsFontSizeToFit={true}
          allowFontScaling={true}
          style={{fontSize: 20, fontWeight: 'bold'}}>
          Payment Methods
        </Text>
      </View>
    );
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
          <UserSection onPressFunc={() => null} hasData={null} data={null} />
          <View style={{flexDirection: 'column', marginLeft: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {this.state.userFirstName}
            </Text>
            <Text
              onPress={() => this._navigateToUserProfile()}
              style={{
                marginTop: 3,
                fontSize: 15,
                fontWeight: 'bold',
                color: '#39f3bb',
              }}>
              View Profile
            </Text>
          </View>
        </View>
      </View>
    );
  };

  _renderProfileOptions = () => {
    return (
      <View style={{marginLeft: 30}}>
        <View style={styles.profileSetting}>
          <View style={{flex: 1}}>
            <Icon name="home" size={25} color="black" />
          </View>
          <View style={{flex: 8}}>
            <Text
              onPress={() => this._navigateToBetaHomeScreen()}
              style={{marginLeft: 10, fontSize: 20}}>
              Home
            </Text>
          </View>
        </View>
        <View style={styles.profileSetting}>
          <View style={{flex: 1}}>
            <Icon name="credit-card" size={25} color="black" />
          </View>
          <View style={{flex: 8}}>
            <Text
              onPress={() => this.handleToggleProfileModal(null)}
              style={{marginLeft: 10, fontSize: 20}}>
              Payment
            </Text>
          </View>
        </View>
        <View style={styles.profileSetting}>
          <View style={{flex: 1}}>
            <Icon name="comments" size={25} color="black" />
          </View>
          <View style={{flex: 8}}>
            <Text style={{marginLeft: 10, fontSize: 20}}>FAQs</Text>
          </View>
        </View>
        <View style={styles.profileSetting}>
          <View style={{flex: 1}}>
            <Icon name="bell" size={25} color="black" />
          </View>
          <View style={{flex: 8}}>
            <Text style={{marginLeft: 10, fontSize: 20}}>Notifications</Text>
          </View>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
          <View style={{flex: 1}}>
            <Icon name="sign-out" size={25} color="black" />
          </View>
          <View style={{flex: 8}}>
            <Text
              onPress={() => this._signOut()}
              style={{marginLeft: 10, fontSize: 20}}>
              Log Out
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // This function toggles the visiblity of the modal and determines the display of the user's profile.
  handleToggleProfileModal = () => {
    const slideDirection = !this.state.isProfileModalVisible
      ? this.slideLeft
      : this.slideRight;

    slideDirection();

    this.setState({
      isProfileModalVisible: !this.state.isProfileModalVisible,
    });
  };

  _navigateToUserProfile = () => {
    this.slideRight();
    this.handleToggleProfileModal(null);
    this.props.navigation.navigate('UserProfileScreen');
  };

  _navigateToBetaHomeScreen = () => {
    this.slideRight();
    this.handleToggleProfileModal(null);
    this.props.navigation.navigate('BetaHomeScreen');
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
        {this._renderHeader()}

        {this._renderProfileModal()}

        {this._renderPaymentDefaultHeader()}

        {this._renderDefaultCard()}

        {this._renderPaymentMethodsHeader()}

        {this._renderUserPaymentMethods()}

        <View style={{marginTop: '5%'}}>
          {this._renderUserPaymentHistory()}
        </View>

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
  userInfo: {
    marginLeft: 10,
  },
  profileSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
});

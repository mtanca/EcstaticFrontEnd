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

export default class UserNavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.navigation}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('BetaHomeScreen', {
                navigation: this.props.navigation.navigate,
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
  }
}

const styles = StyleSheet.create({
  navigation: {
    alignItems: 'center',
    marginBottom: 10,
    height: 60,
    width: '100%',
    borderWidth: 1,
    paddingTop: 30,
    borderTopColor: 'rgba(0, 0, 0, 0.05)',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    justifyContent: 'flex-end',
  },
});

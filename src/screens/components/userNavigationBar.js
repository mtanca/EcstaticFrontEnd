import React from 'react';

import {
  Image,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// THIS COMPONENT HAS NOT BEEN ADDED. REMOVE THIS COMMENT AFTER BEING ADDED
export default class UserNavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.navigation}>
        <View style={{width: '70%', flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('GiveAwayShowScreen', {
                navigation: this.props.navigation.navigate,
                // FIX ME!!!
                giveaway: 1,
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

import React from 'react';

import {Image, ScrollView, View, Text} from 'react-native';

import UserSection from '../components/userSection.js';

export default class BetaHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSectionWidthOffset: null,
    };
  }

  measureView(event) {
    this.setState({
      userSectionWidthOffset: event.nativeEvent.layout.width,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View onLayout={event => this.measureView(event)}>
            <UserSection hasData={null} data={null} />
          </View>
          {this.state.userSectionWidthOffset && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  // offset the text by the width of the userSection
                  marginLeft: this.state.userSectionWidthOffset * -1,
                }}>
                HOME
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

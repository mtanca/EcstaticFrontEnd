import React from "react";
import {View, Text, ScrollView, Image, StyleSheet} from "react-native";
const userFiller = require('../../assets/user-filler.png')

class HomeScreenTop extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View style={{flex: 1, borderColor:'rgba(0, 0, 0, 0.050)', justifyContent: 'center', borderBottomWidth: 2, width: '100%', flexDirection:'row'}}>
        <View style={{marginLeft: 5, flex: 1, flexDirection:'row', height: '100%', width: '5%'}}>
          <View style={{marginTop: '2%', width: '35%', borderRadius: 60}}>
            <Image
              source={userFiller}
              style= {{width: '100%', height: '100%'}}
            />
          </View>
        </View>

        <Text style={{flex: 1, textAlign: 'center', fontSize: 30, frontWeight: 'bold'}}> Store </Text>

        <View style={{flex: 1, flexDirection:'row', width: '20%', justifyContent: 'flex-end', marginRight: '10%'}}>
          <View style={{backgroundColor: '#f2f4f7', height: '100%', width: '80%', borderRadius: 10}}>
            {
              this.props.hasData &&
              <Text style={{textAlign: 'center'}}> {this.props.data.current_user.last_known_currency_balance} </Text>
            }
          </View>
        </View>
      </View>
    )
  }
}

export default HomeScreenTop

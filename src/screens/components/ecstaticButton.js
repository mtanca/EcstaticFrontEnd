import React from "react";
import {View, Text, TouchableOpacity} from "react-native";

class EcstaticButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {navigate} = this.props.navigation;

    return(
      <View>
        <TouchableOpacity
          style={{
            marginTop: this.props.buttonMarginTopScalor,
            backgroundColor: this.props.buttonColor,
            borderRadius: 5,
            height: 40,
            width: '95%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          disabled={this.props.isDisabled}
          onPress={this.props.onPressFunc}
        >
          <Text style={{color: 'white', frontWeight: 'bold'}}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default EcstaticButton
